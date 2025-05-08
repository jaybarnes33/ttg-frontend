import '../global.css';

import { Icon } from '@roninoss/icons';
import 'expo-dev-client';
import { Link, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef } from 'react';
import { Pressable, View } from 'react-native';
import * as Notifications from 'expo-notifications';

import { ThemeToggle } from '~/components/ThemeToggle';
import { cn } from '~/lib/cn';
import { useColorScheme, useInitialAndroidBarSync } from '~/lib/useColorScheme';
import { notificationsService } from '~/services/notifications';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { withIAPContext } from 'react-native-iap';
import { Provider } from 'react-native-paper';
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export default withIAPContext(function RootLayout() {
  useInitialAndroidBarSync();
  const notificationListener = useRef<Notifications.Subscription>();

  useEffect(() => {
    const initializeNotifications = async () => {
      try {
        await notificationsService.registerForPushNotificationsAsync();
      } catch (error) {
        console.error('Failed to initialize notifications:', error);
      }
    };

    initializeNotifications();

    // Listen for incoming notifications while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      console.log('Received notification:', notification);
    });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(notificationListener.current);
      }
      notificationsService.cleanup();
    };
  }, []);

  return (
    <GestureHandlerRootView>
      <Provider>
        <View className="z-999 flex-1">
          <StatusBar translucent />

          <Stack screenOptions={{ ...SCREEN_OPTIONS, navigationBarHidden: true }}>
            <Stack.Screen name="index" options={INDEX_OPTIONS} />
            <Stack.Screen name="modal" options={MODAL_OPTIONS} />
          </Stack>
        </View>
      </Provider>
    </GestureHandlerRootView>
  );
});

const SCREEN_OPTIONS = {
  animation: 'ios_from_right',
  headerShown: false,

  // for android
} as const;

const INDEX_OPTIONS = {
  headerLargeTitle: true,
  title: 'NativeWindUI',
  headerRight: () => <SettingsIcon />,
} as const;

function SettingsIcon() {
  const { colors } = useColorScheme();
  return (
    <Link href="/modal" asChild>
      <Pressable className="opacity-80">
        {({ pressed }) => (
          <View className={cn(pressed ? 'opacity-50' : 'opacity-90')}>
            <Icon name="cog-outline" color={colors.foreground} />
          </View>
        )}
      </Pressable>
    </Link>
  );
}

const MODAL_OPTIONS = {
  presentation: 'modal',
  animation: 'fade_from_bottom', // for android
  title: 'Settings',
  headerRight: () => <ThemeToggle />,
} as const;
