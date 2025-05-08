import { useNavigation } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';

import Screen from '~/components/Layout/Screen';
import Surfer from '~/components/icons/Surfer';

const Settings = () => {
  const navigation = useNavigation();
  const settingsSections = [
    {
      title: 'Premium Signup',
      action: () => Alert.alert('Get Premium', 'Coming Soon'),
    },
    {
      title: 'Alert Duration',
      action: () => Alert.alert('Alert Duration', 'Coming Soon'),
    },
    {
      title: 'Alert Frequency',
      action: () => Alert.alert('Alert Frequency', 'Coming Soon'),
    },
    {
      title: 'Recent / Past Alerts',
      action: () => Alert.alert('Recent Alerts', 'Coming Soon'),
    },
    // {
    //   title: 'Go Back',
    //   action: () => navigation.goBack(),
    // },
  ];

  return (
    <Screen hideArrows>
      <View className="my-8 gap-y-4 px-4">
        {/* <Text className="text-center  text-xl font-bold uppercase">Settings</Text> */}
        {settingsSections.map((section, index) => (
          <TouchableOpacity
            key={section.title}
            onPress={section.action}
            className="flex-row items-center justify-center rounded-lg  p-4">
            <Text className="text-2xl font-bold uppercase">{section.title}</Text>
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
