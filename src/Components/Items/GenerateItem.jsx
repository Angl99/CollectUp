import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Box, Typography, Grid, Avatar, CssBaseline, Select, MenuItem, FormControl, InputLabel, Modal } from '@mui/material';
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
    const [itemCode, setItemCode] = useState("");
    const [itemType, setItemType] = useState("");
    const [condition, setCondition] = useState("");
    const [userDescription, setUserDescription] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [generatedItems, setGeneratedItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [scannedBarcode, setScannedBarcode] = useState(null);
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    useEffect(() => {
        if (scannedBarcode) {
            setItemCode(scannedBarcode);
            handleCloseModal();
        }
    }, [scannedBarcode]);

    useEffect(() => {
        if (itemCode.length === 13) {
            if (itemCode.startsWith('0')) {
                setItemType("UPC-A (GTIN-12)");
            } else {
                setItemType("EAN-13 (ISBN/ GTIN-13)");
            }
        } else if (itemCode.length === 12) {
            setItemType("UPC-A (GTIN-12)");
        } else {
            setItemType("");
        }
    }, [itemCode]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        switch(name) {
            case "item-code":
                setItemCode(value);
                break;
            case "condition":
                setCondition(value);
                break;
            case "user-description":
                setUserDescription(value);
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
            // First, search in the internal database
            let product;
            try {
                product  = await getProductByCode(itemCode);
            } catch (error) {
                console.log("error");
            }
            if (product) {
                const newItem = await createItem(
                    user.uid, 
                    product.ean, 
                    imgUrl, 
                    condition, 
                    userDescription
                );
                newItem.data = product;
                newItem.condition = condition;
                newItem.userDescription = userDescription;
                newItem.imgUrl = imgUrl;
                console.log("Existing product: ", newItem);    
                setGeneratedItems(prevItems => [...prevItems, newItem]);
            } else {
                // If not found internally, search the external API
                const externalData = await searchExternalApi(itemCode);
                // console.log(externalData);
                if (externalData && externalData.items && externalData.items.length > 0) {
                    product = externalData.items[0];
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

                        const newItem = await createItem(user.uid, newProduct.ean, imgUrl, condition, userDescription);
                        newItem.data = newProduct;
                        newItem.condition = condition;
                        newItem.userDescription = userDescription;
                        newItem.imgUrl = imgUrl;
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
                    setError("No product found for the given code");
                }
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
                                            id="item-code"
                                            label="Item Code"
                                            name="item-code"
                                            value={itemCode}
                                            onChange={handleInputChange}
                                            placeholder="Enter Code"
                                        />
                                        <Typography variant="body1" sx={{ mx: 1 }}>or</Typography>
                                        <Button variant="contained" onClick={handleOpenModal}>
                                            Scan Code
                                        </Button>
                                    </Box>
                                    {itemType && <Typography variant="caption" display="block" gutterBottom>Detected Code Type: {itemType}</Typography>}
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
                                            <MenuItem value="Acceptable">Acceptable</MenuItem>
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
                                    <ItemDisplay key={index} generatedItem={{
                                        data: item,
                                        condition: item.condition,
                                        userDescription: item.userDescription,
                                        imgUrl: item.imgUrl,
                                        highest_recorded_price: item.highest_recorded_price
                                    }} />
                                ))}
                                <Button
                                    onClick={handleShowcaseSubmit}
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2, bgcolor: 'secondary.main' }}
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
