import AsyncStorage from '@react-native-async-storage/async-storage';

import { notificationsService } from './notifications';

import { Location } from '~/types/global';

export type Alert = {
  id: string;
  location: Location;

  threshold: {
    maxWindSpeed: number;
    maxWaveHeight: number;
    tide: number;
    tideTime: {
      start: number | null; // e.g., '06:00'
      end: number | null; // e.g., '09:00'
    };
  };
  active: boolean;
  createdAt: string;
  notificationId?: string;
};

const ALERTS_STORAGE_KEY = '@ttg_local';

export const alertStorage = {
  async getAlerts(): Promise<Alert[]> {
    try {
      const data = await AsyncStorage.getItem(ALERTS_STORAGE_KEY);
      return data
        ? JSON.parse(data).sort(
            (a: Alert, b: Alert) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
        : [];
    } catch (error) {
      console.error('Error loading alerts:', error);
      return [];
    }
  },

  async saveAlert(alert: Omit<Alert, 'id' | 'createdAt' | 'notificationId'>): Promise<Alert> {
    try {
      const alerts = await this.getAlerts();
      const newAlert: Alert = {
        ...alert,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };

      await AsyncStorage.setItem(ALERTS_STORAGE_KEY, JSON.stringify([...alerts, newAlert]));
      const location = alert.location.NAME || `${alert.location.CITY}, ${alert.location.ST}`;
      if (alert.active) {
        const notificationId = await notificationsService.scheduleLocalNotification(
          `New Alert: ${location}`,
          `Max Wind Speed: ${alert.threshold.maxWindSpeed}\nMax Wave Height: ${alert.threshold.maxWaveHeight}\nTide: ${alert.threshold.tide}${alert.threshold.tideTime ? ` - ${alert.threshold.tideTime}` : ''}`,
          newAlert
        );
        newAlert.notificationId = notificationId;
        await AsyncStorage.setItem(ALERTS_STORAGE_KEY, JSON.stringify([...alerts, newAlert]));
      }

      return newAlert;
    } catch (error) {
      console.error('Error saving alert:', error);
      throw error;
    }
  },

  async updateAlert(alert: Alert): Promise<void> {
    try {
      const alerts = await this.getAlerts();
      const existingAlert = alerts.find((a) => a.id === alert.id);

      // Cancel existing notification if it exists
      if (existingAlert?.notificationId) {
        await notificationsService.cancelNotification(existingAlert.notificationId);
      }

      const updatedAlerts = alerts.map((a) => (a.id === alert.id ? alert : a));
      await AsyncStorage.setItem(ALERTS_STORAGE_KEY, JSON.stringify(updatedAlerts));

      const location = alert.location.NAME || `${alert.location.CITY}, ${alert.location.ST}`;
      if (alert.active) {
        const notificationId = await notificationsService.scheduleLocalNotification(
          `Updated Alert: ${location}`,
          ` \nMax Wind Speed: ${alert.threshold.maxWindSpeed}\nMax Wave Height: ${alert.threshold.maxWaveHeight}\nTide: ${alert.threshold.tide}`,
          alert
        );
        alert.notificationId = notificationId;
        await AsyncStorage.setItem(ALERTS_STORAGE_KEY, JSON.stringify(updatedAlerts));
      }
    } catch (error) {
      console.error('Error updating alert:', error);
      throw error;
    }
  },

  async deleteAlert(id: string): Promise<void> {
    try {
      const alerts = await this.getAlerts();
      const alertToDelete = alerts.find((a) => a.id === id);

      // Cancel notification if it exists
      if (alertToDelete?.notificationId) {
        await notificationsService.cancelNotification(alertToDelete.notificationId);
      }

      const filteredAlerts = alerts.filter((alert) => alert.id !== id);

      await AsyncStorage.setItem(ALERTS_STORAGE_KEY, JSON.stringify(filteredAlerts));
    } catch (error) {
      console.error('Error deleting alert:', error);
      throw error;
    }
  },
};
