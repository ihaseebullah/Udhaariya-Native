const admin = require('firebase-admin');
const serviceAccount = require('./udhaariya-firebase-adminsdk-fbsvc-3fa5ac16f6.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});
async function sendNotification(token, title, body) {
    const message = {
        notification: {
            title: title,
            body: body,
        },
        token: token,
    };

    try {
        const response = await admin.messaging().send({
            token: token, data: {
                notifee: JSON.stringify({
                    body: 'This message was sent via FCM!',
                    android: {
                        channelId: 'default',
                        actions: [
                            {
                                title: 'Mark as Read',
                                pressAction: {
                                    id: 'read',
                                },
                            },
                        ],
                    },
                }),
            }
        });
        console.log('Notification sent:', response);
    } catch (error) {
        console.error('Error sending notification:', error);
    }
}



module.exports = { admin, sendNotification }