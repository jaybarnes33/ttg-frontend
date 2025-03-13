import clsx from 'clsx';
import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity, BackHandler, Platform } from 'react-native';
// import RNExitApp from 'react-native-exit-app';

import Screen from '~/components/Layout/Screen';
import { Alerts } from '~/components/icons/Alerts';
import Boating from '~/components/icons/Boating';
import Globe from '~/components/icons/Globe';
import Settings from '~/components/icons/Settings';

const Home = () => {
  const router = useRouter();
  const actions = [
    {
      label: 'Add Alerts',
      icon: <Globe size={85} color="#5000FF" />,
      onPress: () => {
        router.navigate('/alert-form');
      },
    },
    {
      label: 'View Alerts',
      icon: <Alerts size={80} />,
      onPress: () => {
        router.navigate('/alerts');
      },
    },
  ];

  const handleExitApp = () => {
    if (Platform.OS === 'ios') {
      // RNExitApp.exitApp();
    } else {
      BackHandler.exitApp();
    }
  };
  return (
    <Screen>
      <View className="flex-1 ">
        {actions.map((action, index) => (
          <View key={index} className={clsx(['mb-4  rounded-xl p-4 '])}>
            <View className=" items-center">
              <Text className="text-[36px] font-bold uppercase">{action.label}</Text>
              <TouchableOpacity onPress={action.onPress}>{action.icon}</TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
      <View className="flex-1 items-center">
        <Boating />
      </View>
      <View className="flex-row items-center justify-between px-6">
        <TouchableOpacity onPress={() => router.navigate('/settings')}>
          <Settings size={48} />
        </TouchableOpacity>
        <TouchableOpacity
          className="h-12 w-12 items-center justify-center rounded-full border-[0.2px] border-black bg-teal-500"
          onPress={() => router.navigate('/help')}>
          <Text className="text-base font-bold uppercase text-white">Help</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleExitApp}>
          <Text className="text-2xl font-bold uppercase ">Quit</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
};

export default Home;
