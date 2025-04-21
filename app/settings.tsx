import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'nativewind';
import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';

import { BackButton } from '~/components/BackButton';
import Surfer from '~/components/icons/Surfer';
import Screen from '~/components/Layout/Screen';

const Settings = () => {
  const router = useRouter();
  const [isPremium, setIsPremium] = useState(false);

  const settingsSections = [
    {
      title: 'Premium Signup',
      action: () => router.push('/premium-signup'),
    },
    {
      title: 'Alert Sound',
      action: () => {}, // Add alert sound settings
    },
    {
      title: 'Alert Duration',
      action: () => {}, // Add alert duration settings
    },
    {
      title: 'Alert Frequency',
      action: () => {}, // Add alert frequency settings
    },
  ];

  return (
    <Screen>
      <View className="my-8 gap-y-4">
        {settingsSections.map((section, index) => (
          <TouchableOpacity
            key={section.title}
            onPress={section.action}
            className="flex-row items-center justify-between rounded-lg border border-gray-300 p-4">
            <Text className="text-[20px] font-medium uppercase">{section.title}</Text>
            <MaterialIcons name="chevron-right" size={24} color="black" />
          </TouchableOpacity>
        ))}
      </View>
      <View className="mt-auto items-center">
        <Surfer />
      </View>
    </Screen>
  );
};

export default Settings;
