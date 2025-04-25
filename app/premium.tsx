import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BackButton } from '~/components/BackButton';

import Screen from '~/components/Layout/Screen';
import { inAppPurchasesService } from '~/services/inAppPurchases';

const Index = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    checkPremiumStatus();
  }, []);

  const checkPremiumStatus = async () => {
    try {
      await inAppPurchasesService.initialize();
      const premiumStatus = await inAppPurchasesService.isPremium();
      setIsPremium(premiumStatus);
    } catch (error) {
      console.error('Error checking premium status:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async () => {
    try {
      setLoading(true);
      const success = await inAppPurchasesService.purchasePremium();
      if (success) {
        Alert.alert('Success', 'Thank you for purchasing premium!');
        setIsPremium(true);
        router.push('/');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to complete purchase. Please try again.');
      console.error('Error purchasing:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen hideArrows>
      <SafeAreaView className="flex-1 px-4">
        {loading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : isPremium ? (
          <View className="flex-1 items-center justify-center">
            <Text className="text-center text-2xl font-bold">You already have premium!</Text>
            <TouchableOpacity
              className="mt-4 rounded-lg bg-gray-200 p-4"
              onPress={() => router.push('/')}>
              <Text className="text-center text-lg">Continue to App</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <View className="mb-8">
              <Text className="text-center text-3xl font-bold">Get Premium</Text>
              <Text className="mt-4 text-center text-lg">
                Never miss a good day to be outside again.
              </Text>
            </View>

            <View className="flex-1 gap-y-4">
              <TouchableOpacity
                className="rounded-lg border border-gray-300 bg-white p-4"
                onPress={handlePurchase}>
                <Text className="text-xl font-semibold">Premium Access</Text>
                <Text className="text-lg">One-time purchase</Text>
                <Text className="mt-2 text-lg font-bold">$7.99</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => router.back()}
              className="absolute bottom-4 left-4 right-4 rounded-lg bg-black p-3">
              <Text className="text-center text-lg text-white">Back</Text>
            </TouchableOpacity>
          </>
        )}
      </SafeAreaView>
    </Screen>
  );
};

export default Index;
