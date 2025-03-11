import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Logo from '~/components/Logo';
import Settings from '~/components/icons/Settings';

const Help = () => {
  const router = useRouter();
  return (
    <SafeAreaView className="relative flex-1 items-center  bg-white px-6">
      <View className="flex-row items-center justify-between">
        <Text className="w-1/3 text-3xl font-bold uppercase">How to use</Text>
        <Logo />
        <Text className="w-1/3 text-3xl font-bold uppercase">Time to go</Text>
      </View>
      <View className="flex-1 py-3">
        <Text className="text-lg leading-relaxed">
          Welcome to TTG! This application helps you find the perfect time to visit any location or
          enjoy specific activities based on comprehensive historical data.
        </Text>

        <Text className="mt-4 text-lg leading-relaxed">
          Using 10 years of historical information, we analyze weather patterns, wave conditions,
          wind data, and forecasts from multiple reliable sources. Our algorithm processes this data
          to provide you with the most favorable times for your planned activities.
        </Text>

        <Text className="mt-4 text-lg leading-relaxed">
          For example, if you're planning to go kayak fishing in Marathon, Florida in July, our app
          will analyze historical conditions and recommend the optimal dates and times. This ensures
          you can make the most of your vacation while enjoying your favorite activities in ideal
          conditions.
        </Text>
      </View>

      <View className="absolute bottom-10 items-center">
        <TouchableOpacity onPress={() => router.navigate('/settings')}>
          <Settings />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Help;
