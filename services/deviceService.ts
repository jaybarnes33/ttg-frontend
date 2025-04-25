import { getUniqueId } from 'react-native-device-info';
import axios from 'axios';

const API_URL = process.env.API_URL || 'https://your-api-url.com';

interface DeviceProfile {
  device_id: string;
  premium: boolean;
  demo_mode: boolean;
  subscription_expires_on?: string;
}

export const deviceService = {
  async registerDevice(): Promise<DeviceProfile> {
    try {
      const deviceId = await getUniqueId();
      const response = await axios.post(`${API_URL}/register-device`, {
        device_id: deviceId,
      });
      return response.data;
    } catch (error) {
      console.error('Error registering device:', error);
      throw error;
    }
  },

  async getDeviceProfile(): Promise<DeviceProfile> {
    try {
      const deviceId = await getUniqueId();
      const response = await axios.get(`${API_URL}/device-profile/${deviceId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting device profile:', error);
      throw error;
    }
  },
};
