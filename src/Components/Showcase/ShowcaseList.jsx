import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { index } from "../../helpers/showcaseHelpers";

export default function ShowcaseList() {
    const [showcases, setShowcases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { userId } = useParams();

    useEffect(() => {
        const fetchShowcases = async () => {
            try {
                const allShowcases = await index();
                const userShowcases = allShowcases.filter(showcase => showcase.uid === userId);
                setShowcases(userShowcases);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch showcases');
                setLoading(false);
            }
        };

        fetchShowcases();
    }, [userId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    if (showcases.length === 0) return <div>No showcases found for this user.</div>;

    return (
        <div>
            <h2>User Showcases</h2>
            {showcases.map((showcase) => (
                <div key={showcase.id}>
                    <h3>{showcase.name}</h3>
                    {/* You can add more details about each showcase here */}
                </div>
            ))}
        </div>
    );
}
