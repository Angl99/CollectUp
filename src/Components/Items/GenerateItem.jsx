import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Radio, FormControlLabel, FormLabel, RadioGroup, Button, Container, Box, Typography, Grid, Avatar, CssBaseline, Select, MenuItem, FormControl, InputLabel, Modal } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ItemDisplay from "./ItemDisplay";
import { searchExternalApi, createItem } from "../../helpers/itemHelper";
import { useAuth } from "../../helpers/AuthContext";
import productHelper from "../../helpers/productHelpers";
import { addItemsToFirstShowcase, getShowcasesByUserUid } from "../../helpers/showcaseHelpers";
import BarcodeScanner from "../BarcodeScanner/BarcodeScanner";


const theme = createTheme({
    palette: {
        primary: {
            main: '#3498db',
        },
        secondary: {
            main: '#95a5a6',
        },
        accent: {
            main: '#623c8c',
        },
        text: {
            primary: '#34495e',
        },
        background: {
            default: '#f0f3f5',
        },
    },
});

export default function GenerateItem() {
    const { getProductByCode, createProduct } = productHelper;
    const navigate = useNavigate();
    const { user } = useAuth();
    const [searchQuery, setSearchQuery] = useState("");
    const [searchType, setSearchType] = useState("");
    const [condition, setCondition] = useState("");
    const [userDescription, setUserDescription] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [price, setPrice] = useState("");
    const [forSale, setForSale] = useState(false);
    const [generatedItems, setGeneratedItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [scannedBarcode, setScannedBarcode] = useState(null);
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    useEffect(() => {
        if (scannedBarcode) {
            setSearchQuery(scannedBarcode);
            handleCloseModal();
        }
    }, [scannedBarcode]);

    useEffect(() => {
        const sanitizedQuery = searchQuery.replace(/-/g, '');
    
        if (/^\d+$/.test(sanitizedQuery)) {
            if (sanitizedQuery.length === 13) {
                if (sanitizedQuery.startsWith('0')) {
                    setSearchType("UPC-A (GTIN-12)");
                } else {
                    setSearchType("EAN-13 (ISBN/ GTIN-13)");
                }
            } else if (sanitizedQuery.length === 12) {
                setSearchType("UPC-A (GTIN-12)");
            } else {
                setSearchType("Code");
            }
        } else {
            setSearchType("Keyword");
        }
        setSearchQuery(sanitizedQuery);
    }, [searchQuery]);
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        switch(name) {
            case "search-query":
                setSearchQuery(value);
                break;
            case "condition":
                setCondition(value);
                break;
            case "user-description":
                setUserDescription(value);
                break;
            case "price":
                setPrice(value);
                break;
            case "forSale":
                setForSale(value);
                break;
            default:
                break;
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImgUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        if (!user) {
            setError("You must be logged in to generate an item.");
            setIsLoading(false);
            return;
        }
      
        try {
            // Search the external API
            const externalData = await searchExternalApi(searchQuery);
            if (externalData && externalData.length > 0) {
                const product = externalData[0];
                // Create the product in our internal database
                try {
                    const cleanedData = {
                        upc: product.upc,
                        isbn: product.isbn,
                        ean: product.ean,
                        data: product,
                    }
                    const newProduct = await createProduct(cleanedData);
                    console.log("New product created!!");

                    const newItem = await createItem(user.uid, newProduct.ean, imgUrl, condition, userDescription, price, forSale);
                    newItem.data = newProduct;
                    newItem.condition = condition;
                    newItem.userDescription = userDescription;
                    newItem.imgUrl = imgUrl;
                    newItem.price = price;
                    newItem.forSale = forSale;
                    console.log("New item created!!");
                    console.log("Newly created prod: ", newItem);
                    
                    // Add the new item to the first showcase
                    await addItemsToFirstShowcase(
                        user.uid, [{
                        productEan: newItem.data.ean,
                        condition: newItem.condition,
                        userDescription: newItem.userDescription,
                        imgUrl: newItem.imgUrl
                    }]);
                    
                    setGeneratedItems(prevItems => [...prevItems, newItem]);
                } catch (error) {
                    console.log("failed to create prod");
                    setError("Failed to create product");
                }
            } else {
                setError("No product found for the given search query");
            }
        } catch (error) {
            console.error("Error during item generation:", error);
            setError("An error occurred while generating the item");
        } finally {
            setIsLoading(false);
            setItemCode("");
            setCondition("");
            setUserDescription("");
            setImgUrl("");
        }
    };

    const handleShowcaseSubmit = async () => {
        setIsLoading(true);
        setError(null);
        try {
            if (!user) {
                throw new Error("You must be logged in to add items to the showcase.");
            }
            
            // Prepare items for adding to showcase
            const itemsToAdd = generatedItems.map(item => ({
                productEan: item.data.ean,
                condition: item.condition,
                userDescription: item.userDescription,
                imgUrl: item.imgUrl,
                type: "Item",
                id: item.id
            }));
            
            // Add items to the showcase
            await addItemsToFirstShowcase(user.uid, itemsToAdd);
            const showcases = await getShowcasesByUserUid(user.uid);
            
            // Navigate to the showcase display
            navigate(`/showcases/${showcases[0].id}`);
        } catch (error) {
            console.error("Error adding items to showcase:", error);
            setError("Failed to add items to showcase. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteItem = (indexToDelete) => {
        setGeneratedItems(prevItems => prevItems.filter((_, index) => index !== indexToDelete));
    };

    return (
        <Box sx={{
            background: 'linear-gradient(-45deg, #3498db, #623c8c, #95a5a6, #34495e)',
            backgroundSize: '400% 400%',
            animation: 'gradient 10s ease infinite',
            minHeight: '100vh',
            minWidth: '100vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            '@keyframes gradient': {
                '0%': {
                    backgroundPosition: '0% 50%',
                },
                '50%': {
                    backgroundPosition: '100% 50%',
                },
                '100%': {
                    backgroundPosition: '0% 50%',
                },
            },
        }}>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="sm">
                    <CssBaseline />
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            backgroundColor: 'rgba(240, 243, 245, 0.8)',
                            padding: 3,
                            borderRadius: 2,
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                            <AddCircleOutlineIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5" color="text.primary">
                            Build Your Showcase
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Box display="flex" alignItems="center">
                                        <TextField
                                            fullWidth
                                            id="search-query"
                                            label="Search Query"
                                            name="search-query"
                                            value={searchQuery}
                                            onChange={handleInputChange}
                                            placeholder="Enter Code or Keyword"
                                        />
                                        <Typography variant="body1" sx={{ mx: 1 }}>or</Typography>
                                        <Button variant="contained" onClick={handleOpenModal}>
                                            Scan
                                        </Button>
                                    </Box>
                                    {searchType && <Typography variant="caption" display="block" gutterBottom>Detected Search Type: {searchType}</Typography>}
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel id="condition-label">Condition</InputLabel>
                                        <Select
                                            labelId="condition-label"
                                            id="condition"
                                            name="condition"
                                            value={condition}
                                            onChange={handleInputChange}
                                            label="Condition"
                                        >
                                            <MenuItem value="">Select Condition</MenuItem>
                                            <MenuItem value="New">New</MenuItem>
                                            <MenuItem value="New-BoxOpen">New-Box Open</MenuItem>
                                            <MenuItem value="Good">Good</MenuItem>
                                            <MenuItem value="Used">Used</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="user-description"
                                        label="Description"
                                        name="user-description"
                                        value={userDescription}
                                        onChange={handleInputChange}
                                        placeholder="Enter Description"
                                        multiline
                                        rows={3}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        type="number"
                                        fullWidth
                                        id="price"
                                        label="price"
                                        name="price"
                                        value={price}
                                        onChange={handleInputChange}
                                        placeholder="Enter price"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl component="fieldset" margin="normal">
                                        <FormLabel component="legend">For Sale</FormLabel>
                                        <RadioGroup
                                        row
                                        name="forSale"
                                        value={forSale}
                                        onChange={handleInputChange}
                                        >
                                        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                        <FormControlLabel value="no" control={<Radio />} label="No" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <input
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        id="image-upload"
                                        type="file"
                                        onChange={handleImageUpload}
                                    />
                                    <label htmlFor="image-upload">
                                        <Button variant="outlined" component="span" fullWidth>
                                            Upload Image
                                        </Button>
                                    </label>
                                    {imgUrl && (
                                        <Box mt={2} display="flex" justifyContent="center">
                                            <img src={imgUrl} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                                        </Box>
                                    )}
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, bgcolor: 'primary.main' }}
                                disabled={isLoading}
                            >
                                {isLoading ? "Generating..." : "Generate"}
                            </Button>
                        </Box>
                        {error && <Typography color="error">{error}</Typography>}
                        {isLoading ? (
                            <Typography>Loading...</Typography>
                        ) : generatedItems.length > 0 ? (
                            <>
                                <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>Generated Items:</Typography>
                                {generatedItems.map((item, index) => (
                                    <Box key={index} sx={{ mb: 3 }}>
                                        <ItemDisplay generatedItem={{
                                            data: item,
                                            condition: item.condition,
                                            userDescription: item.userDescription,
                                            imgUrl: item.imgUrl,
                                            price: item.price,
                                            forSale: item.forSale
                                        }} />
                                        <Button 
                                            variant="contained" 
                                            fullWidth
                                            onClick={() => handleDeleteItem(index)}
                                            sx={{ 
                                                mt: 1, 
                                                bgcolor: 'secondary.main',
                                            }}
                                        >
                                            Delete Item
                                        </Button>
                                    </Box>
                                ))}
                                <Button
                                    onClick={handleShowcaseSubmit}
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2, bgcolor: 'primary.main' }}
                                >
                                    Submit to Showcase
                                </Button>
                            </>
                        ) : (
                            <Typography sx={{ mt: 2 }}>
                                No items generated yet.
                                <br />
                                Enter a code and click "Generate" to create an item.
                            </Typography>
                        )}
                    </Box>
                </Container>
                <Modal
                open={isModalOpen}
                onClose={handleCloseModal}
                aria-labelledby="barcode-scanner-modal"
                aria-describedby="modal-to-scan-barcode"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <Typography id="barcode-scanner-modal" variant="h6" component="h2">
                        Scan Barcode
                    </Typography>
                    <BarcodeScanner setScannedBarcode={setScannedBarcode} />
                    <Button onClick={handleCloseModal}>Close</Button>
                </Box>
            </Modal>
            </ThemeProvider>
        </Box>
    );
}
