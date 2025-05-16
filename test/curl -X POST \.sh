curl -X POST \
  -H "Content-Type: application/json" \
  -H "X-Webhook-Signature: your_signature_here" \
  -d '{"event": "test", "data": "Hello Webhook!"}' \
  http://localhost:3000/webhook