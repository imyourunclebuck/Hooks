#!/bin/zsh
# Install the email_timelapse script system-wide
cp /Users/martech/Hooks/email_timelapse.py ~/email_timelapse
chmod +x ~/email_timelapse
sudo mv ~/email_timelapse /usr/local/bin/email_timelapse

echo "✅ Installed as /usr/local/bin/email_timelapse, run with 'email_timelapse'"
