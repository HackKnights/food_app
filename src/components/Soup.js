import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { blue, green, pink, purple, yellow } from '@mui/material/colors'; // Import MUI colors

import firebaseConfig from './firebaseConfig';

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const Soup = () => {
    const [ingredients, setIngredients] = useState({});
    const availableIngredients = [
        { name: 'Egg', type: 'checkbox', color: blue[100] }, // Add color property
        { name: 'Beef Broth', type: 'checkbox', color: green[100] },
        { name: 'Chicken Broth', type: 'checkbox', color: pink[100] },
        { name: 'Vegetables', type: 'checkbox', color: purple[100] },
        { name: 'Sriracha', type: 'checkbox', color: yellow[100] },
        { name: 'Mushrooms', type: 'select', color: blue[100] }, // Change type to 'select'
    ];
    const quantities = ['Don\'t put it', 'Low', 'Medium', 'High'];

    const handleIngredientChange = (event) => {
        const { name, value, type, checked } = event.target;

        if (type === 'select') {
            setIngredients({
                ...ingredients,
                [name]: value
            });
        } else if (type === 'checkbox') {
            setIngredients({
                ...ingredients,
                [name]: checked ? 'Yes' : 'No'
            });
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const docRef = await db.collection('orders').add({
                SoupIngredients: ingredients,
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
            <h1>Customize Your Soup</h1>
            
                {availableIngredients.map((ingredient, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4}>
                        <Card variant="outlined" style={{ backgroundColor: ingredient.color }}> {/* Add backgroundColor */}
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
                <h2>Your Soup</h2>
                {Object.entries(ingredients).map(([ingredient, quantity], index) => (
                    <p key={index}>{ingredient}: {quantity}</p>
                ))}
                <Button variant="contained" onClick={handleFormSubmit}>Place Order</Button>
            </div>
        </div>
    );
};

export default Soup;
