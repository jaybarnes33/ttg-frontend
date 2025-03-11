import AsyncStorage from '@react-native-async-storage/async-storage';

export type Alert = {
  id: string;
  location: string;
  activity: string;
  threshold: {
    maxWindSpeed: number;
    maxWaveHeight: number;
    tide: number;
  };
  active: boolean;
  createdAt: string;
};

const ALERTS_STORAGE_KEY = '@sailor_alerts';

export const alertStorage = {
  async getAlerts(): Promise<Alert[]> {
    try {
      const data = await AsyncStorage.getItem(ALERTS_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading alerts:', error);
      return [];
    }
  },

  async saveAlert(alert: Omit<Alert, 'id' | 'createdAt'>): Promise<Alert> {
    try {
      const alerts = await this.getAlerts();
      const newAlert: Alert = {
        ...alert,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };

      await AsyncStorage.setItem(ALERTS_STORAGE_KEY, JSON.stringify([...alerts, newAlert]));

      return newAlert;
    } catch (error) {
      console.error('Error saving alert:', error);
      throw error;
    }
  },

  async updateAlert(alert: Alert): Promise<void> {
    try {
      const alerts = await this.getAlerts();
      const updatedAlerts = alerts.map((a) => (a.id === alert.id ? alert : a));

      await AsyncStorage.setItem(ALERTS_STORAGE_KEY, JSON.stringify(updatedAlerts));
    } catch (error) {
      console.error('Error updating alert:', error);
      throw error;
    }
  },

  async deleteAlert(id: string): Promise<void> {
    try {
      const alerts = await this.getAlerts();
      const filteredAlerts = alerts.filter((alert) => alert.id !== id);

      await AsyncStorage.setItem(ALERTS_STORAGE_KEY, JSON.stringify(filteredAlerts));
    } catch (error) {
      console.error('Error deleting alert:', error);
      throw error;
    }
  },
};
