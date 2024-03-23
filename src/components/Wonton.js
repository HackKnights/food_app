import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { green, pink, yellow, blue } from '@mui/material/colors'; // Import MUI colors

import firebaseConfig from './firebaseConfig';

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const Wonton = () => {
    const [ingredients, setIngredients] = useState({});
    const availableIngredients = [
        { name: 'Yellow Chives', type: 'checkbox', color: yellow[100] }, // Add color property
        { name: 'Shrimp', type: 'checkbox', color: blue[100] },
        { name: 'Pork', type: 'checkbox', color: pink[100] },
        { name: 'Fish', type: 'checkbox', color: green[100] },
    ];

    const handleIngredientChange = (event) => {
        const { name, checked } = event.target;
        setIngredients({
            ...ingredients,
            [name]: checked ? 'Yes' : 'No'
        });
    };

    const handleFormSubmit = async () => {
        try {
            const docRef = await db.collection('orders').add({
                orderType: 'Wonton',
                ingredients,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
            alert(`Your order has been placed! Order ID: ${docRef.id}`);
        } catch (error) {
            console.error('Error adding document: ', error);
            alert('An error occurred while placing your order. Please try again later.');
        }
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Customize Your Wonton</h1>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {availableIngredients.map((ingredient, index) => (
                    <Card key={index} style={{ width: '70%', marginBottom: '10px', backgroundColor: ingredient.color }}> {/* Add backgroundColor */}
                        <CardContent>
                            <Typography variant="body1">{ingredient.name}</Typography>
                            <input
                                type="checkbox"
                                name={ingredient.name}
                                onChange={handleIngredientChange}
                            />
                        </CardContent>
                    </Card>
                ))}
                <h2>Your Wonton</h2>
                {Object.entries(ingredients).map(([ingredient, quantity], index) => (
                    <p key={index}>{ingredient}: {quantity}</p>
                ))}
                <Button variant="contained" onClick={handleFormSubmit}>Place Order</Button>
            </div>
        </div>
    );
};

export default Wonton;
