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
      title: 'Get Premium',
      action: () => router.push('/premium'),
    },
  ];

  return (
    <Screen>
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
