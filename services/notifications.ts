import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { router } from 'expo-router';
import { Platform } from 'react-native';

// Configure how notifications should be handled when the app is in the foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

let notificationResponseSubscription: Notifications.Subscription | null = null;

export const notificationsService = {
  async registerForPushNotificationsAsync() {
    let token;

    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        throw new Error('Failed to get push token for push notification!');
      }

      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId: '9e45f1a8-1481-4948-aca1-3613c99625ee', // Your Expo project ID from app.json
        })
      ).data;

      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          sound: 'ring.mp3',
        });
      }

      // Set up notification response handler
      notificationResponseSubscription = Notifications.addNotificationResponseReceivedListener(
        (response) => {
          const data = response.notification.request.content.data;
          if (data.alertId) {
            router.push({
              pathname: '/alert',
              params: { alertData: JSON.stringify(data.alert) },
            });
          }
        }
      );

      return token;
    }

    throw new Error('Must use physical device for Push Notifications');
  },

  async scheduleLocalNotification(
    title: string,
    body: string,
    alert: any,
    trigger?: Notifications.NotificationTriggerInput
  ) {
    return await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        sound: 'ring.mp3',
        data: {
          alertId: alert.id,
          alert,
        },
      },
      trigger: { channelId: 'default' },
    });
  },

  async cancelAllNotifications() {
    await Notifications.cancelAllScheduledNotificationsAsync();
  },

  async cancelNotification(notificationId: string) {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
  },

  cleanup() {
    if (notificationResponseSubscription) {
      Notifications.removeNotificationSubscription(notificationResponseSubscription);
      notificationResponseSubscription = null;
    }
  },
};
