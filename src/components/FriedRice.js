import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { green, blue, orange, purple } from '@mui/material/colors'; // Import MUI colors

import firebaseConfig from './firebaseConfig';

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const FriedRice = () => {
    const [ingredients, setIngredients] = useState({});
    const availableIngredients = [
        { name: 'Chicken', type: 'checkbox', color: green[100] },
        { name: 'Shrimp', type: 'checkbox', color: blue[100] },
        { name: 'Egg', type: 'checkbox', color: orange[100] },
        { name: 'Vegetables', type: 'checkbox', color: purple[100] },
        { name: 'Tofu', type: 'select', color: green[100] }, // Change type to 'select'
    ];
    const quantities = ['Don\'t put it', 'Low', 'Medium', 'High'];

    const handleIngredientChange = (event) => {
        const { name, value, type, checked } = event.target;

        if (type === 'select' && name === 'Tofu') {
            setIngredients({
                ...ingredients,
                [name]: value
            });
        } else if (type === 'checkbox') {
            setIngredients({
                ...ingredients,
                [name]: checked ? 'Yes' : 'No'
            });
        } else {
            setIngredients({
                ...ingredients,
                [name]: value
            });
        }
    };

    const handleFormSubmit = async () => {
        try {
            const docRef = await db.collection('orders').add({
                friedRiceIngredients: ingredients,
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
            <h1>Customize Your Fried Rice</h1>
           
                {availableIngredients.map((ingredient, index) => (
                    <Grid item key={index}>
                        <Card variant="outlined" style={{ backgroundColor: ingredient.color }}>
                            <CardContent>
                                <Typography variant="h6" component="h2">
                                    {ingredient.name}
                                </Typography>
                                {ingredient.type === 'checkbox' ? (
                                    <input
                                        type="checkbox"
                                        name={ingredient.name}
                                        onChange={handleIngredientChange}
                                    />
                                ) : (
                                    <select name={ingredient.name} onChange={handleIngredientChange}>
                                        {quantities.map((quantity, index) => (
                                            <option key={index} value={quantity}>{quantity}</option>
                                        ))}
                                    </select>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
           
            <div style={{ marginTop: '20px' }}>
                <h2>Your Fried Rice</h2>
                {Object.entries(ingredients).map(([ingredient, quantity], index) => (
                    <p key={index}>{ingredient}: {quantity}</p>
                ))}
                <Button variant="contained" onClick={handleFormSubmit}>Place Order</Button>
            </div>
        </div>
    );
};

export default FriedRice;
