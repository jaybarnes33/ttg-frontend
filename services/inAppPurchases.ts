import axios from 'axios';
import { Platform } from 'react-native';
import { getUniqueId } from 'react-native-device-info';
import * as InAppPurchases from 'react-native-iap';
const API_URL = process.env.API_URL || 'https://your-api-url.com';

// Product ID for the annual subscription
const SUBSCRIPTION_PRODUCT_ID = Platform.select({
  ios: 'com.ttg.premium.yearly',
  android: 'com.ttg.premium.yearly',
}) as string;

export const inAppPurchasesService = {
  async initialize() {
    try {
      await InAppPurchases.initConnection();
      console.log('In-app purchases initialized');
    } catch (error) {
      console.error('Failed to initialize in-app purchases:', error);
      throw error;
    }
  },

  async purchasePremium() {
    try {
      // Get the device ID
      const deviceId = await getUniqueId();

      // Get available products
      const products = await InAppPurchases.getProducts({ skus: [SUBSCRIPTION_PRODUCT_ID] });

      if (products.length === 0) {
        throw new Error('Premium subscription not available');
      }

      // Purchase the subscription
      const purchase = await InAppPurchases.requestPurchase({
        skus: [SUBSCRIPTION_PRODUCT_ID],
      });

      // Verify the purchase with our backend
      const response = await axios.post(`${API_URL}/verify-subscription`, {
        device_id: deviceId,
        platform: Platform.OS,
        receipt: (purchase as InAppPurchases.ProductPurchase).transactionReceipt,
      });

      if (response.data.success) {
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error purchasing premium:', error);
      throw error;
    }
  },

  async isPremium(): Promise<boolean> {
    try {
      const deviceId = await getUniqueId();
      const response = await axios.get(`${API_URL}/device-profile/${deviceId}`);
      return response.data.premium ?? false;
    } catch (error) {
      console.error('Error checking premium status:', error);
      return false;
    }
  },

  async restorePurchases() {
    try {
      const deviceId = await getUniqueId();
      const purchases = await InAppPurchases.getAvailablePurchases();

      // Find the premium subscription purchase
      const premiumPurchase = purchases.find(
        (purchase) => purchase.productId === SUBSCRIPTION_PRODUCT_ID
      );

      if (premiumPurchase) {
        // Verify the purchase with our backend
        const response = await axios.post(`${API_URL}/verify-subscription`, {
          device_id: deviceId,
          platform: Platform.OS,
          receipt: premiumPurchase.transactionReceipt,
        });

        return response.data.success;
      }
      return false;
    } catch (error) {
      console.error('Error restoring purchases:', error);
      throw error;
    }
  },
};
