import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

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

  return (
    <div>
      <h1>All Orders</h1>
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            <strong>Order ID:</strong> {order.id}<br />
            <strong>Ingredients:</strong> {JSON.stringify(order)}<br />
            <strong>Timestamp:</strong> {order.timestamp ? order.timestamp.toDate().toLocaleString() : 'N/A'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;
