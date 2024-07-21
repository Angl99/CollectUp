import React, { useState, useEffect } from 'react';
import { getById, updateById } from '../../helpers/userHelpers';
import ShowcaseList from '../Showcase/ShowcaseList';

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedProfile, setEditedProfile] = useState({});

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profileData = await getById(1); // Hardcoded ID for now
                setProfile(profileData);
                setEditedProfile(profileData);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchProfile();
    }, []);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        try {
            await updateById(profile.id, editedProfile);
            setProfile(editedProfile);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const handleCancel = () => {
        setEditedProfile(profile);
        setIsEditing(false);
    };

    const handleChange = (e) => {
        setEditedProfile({ ...editedProfile, [e.target.name]: e.target.value });
    };

    if (!profile) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Profile</h1>
            {isEditing ? (
                <div>
                    <input
                        type="text"
                        name="name"
                        value={editedProfile.name || ''}
                        onChange={handleChange}
                    />
                    <input
                        type="email"
                        name="email"
                        value={editedProfile.email || ''}
                        onChange={handleChange}
                    />
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                </div>
            ) : (
                <div>
                    <p>Name: {profile.name}</p>
                    <p>Email: {profile.email}</p>
                    <button onClick={handleEdit}>Edit</button>
                </div>
            )}
            <ShowcaseList userId={profile.id} />
        </div>
    );
};

export default Profile;
