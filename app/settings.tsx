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

  const settingsSections = [
    {
      title: 'Premium Signup',
    },

    {
      title: 'Alert Sound',
    },
    {
      title: 'Alert Duration',
    },
    {
      title: 'Alert Frequency',
    },
  ];

  return (
    <Screen>
      <View className="my-8 gap-y-4">
        {settingsSections.map((section, index) => (
          <View key={section.title}>
            <Text className=" text-center text-[30px]  font-medium uppercase">{section.title}</Text>
          </View>
        ))}
      </View>
      <View className="mt-auto scale-105 items-center">
        <Surfer />
      </View>
    </Screen>
  );
};

export default Settings;
