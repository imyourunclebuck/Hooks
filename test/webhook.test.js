const axios = require('axios');
const crypto = require('crypto');

const webhookUrl = 'http://localhost:3000/webhook';
const webhookSecret = process.env.WEBHOOK_SECRET;

async function testWebhook(event, data) {
    const payload = {
        event: event,
        data: data,
        timestamp: new Date().toISOString()
    };

    const signature = crypto
        .createHmac('sha256', webhookSecret)
        .update(JSON.stringify(payload))
        .digest('hex');

    try {
        const response = await axios.post(webhookUrl, payload, {
            headers: {
                'Content-Type': 'application/json',
                'X-Webhook-Signature': signature
            }
        });
        console.log(`Test for event ${event} successful:`, response.data);
    } catch (error) {
        console.error(`Test for event ${event} failed:`, error.response?.data || error.message);
    }
}

async function runTests() {
    await testWebhook('create_user', { username: 'testuser', email: 'testuser@example.com' });
    await testWebhook('update_status', { userId: 1, status: 'active' });
    await testWebhook('unknown_event', { someData: 'test' });
}

runTests();

testWebhook();