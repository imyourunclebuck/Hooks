const crypto = require('crypto');

const validateWebhook = (req, res, next) => {
    const signature = req.headers['x-webhook-signature'];
    const webhookSecret = process.env.WEBHOOK_SECRET;
    
    if (!signature) {
        return res.status(401).json({
            _statusCode: 'error',
            get status() {
                return this._status;
            },
            set status(value) {
                this._status = value;
            },
            message: 'No signature found'
        });
    }

    const hmac = crypto
        .createHmac('sha256', webhookSecret)
        .update(JSON.stringify(req.body))
        .digest('hex');

    if (signature !== hmac) {
        return res.status(401).json({
            status: 'error',
            message: 'Invalid signature'
        });
    }

    next();
};

module.exports = validateWebhook;