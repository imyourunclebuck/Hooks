const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Sample data store (in-memory for demonstration)
const dataStore = [];

app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
    const { event, data } = req.body;
    
    switch (event) {
        case 'create_user':
            dataStore.push({
                id: Date.now(),
                type: 'user',
                data: data,
                createdAt: new Date()
            });
            break;
            
        case 'update_status':
            dataStore.push({
                id: Date.now(),
                type: 'status',
                data: data,
                updatedAt: new Date()
            });
            break;
            
        default:
            return res.status(400).json({
                status: 'error',
                message: 'Unknown event type'
            });
    }
    
    console.log('Current data store:', dataStore);
    
    res.status(200).json({
        status: 'success',
        message: `Processed ${event} event`,
        totalRecords: dataStore.length
    });
});

// Add a GET endpoint to view stored data
app.get('/data', (req, res) => {
    res.json(dataStore);
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        status: 'error',
        message: 'Internal server error'
    });
});

app.listen(PORT, () => {
    console.log(`Webhook server is running on port ${PORT}`);
});
