import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const snapshot = await firebase.firestore().collection('orders').get();
        const ordersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setOrders(ordersData);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const getOrderType = (order) => {
    if (order.friedRiceIngredients) {
      return 'Fried Rice';
    } else if (order.SoupIngredients) {
      return 'Soup';
    } else if (order.WontonIngredients) {
      return 'Wonton';
    } else {
      return 'Unknown';
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>All Orders😋</h1>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {orders.map(order => (
          <Card key={order.id} style={{ backgroundColor: '#FCE4EC', margin: '10px', width: '70%' }}>
            <CardContent>
              <Typography variant="h5" component="h2">
                Order ID: {order.id}
              </Typography>
              <Typography variant="h6" component="h3">
                Order Type: {getOrderType(order)}
              </Typography>
              {Object.entries(order.FriedRiceIngredients || order.SoupIngredients || order.WontonIngredients || {}).map(([ingredient, quantity]) => (
                <Typography key={ingredient} variant="body2" component="p">
                  {ingredient}: {quantity}
                </Typography>
              ))}
              <Typography color="textSecondary">
                Timestamp: {order.timestamp ? order.timestamp.toDate().toLocaleString() : 'N/A'}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Orders;
