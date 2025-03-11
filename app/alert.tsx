import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';

import { getTide } from './alerts';

import Screen from '~/components/Layout/Screen';
import Delete from '~/components/icons/Delete';
import EditAlert from '~/components/icons/EditAlert';
import Silent from '~/components/icons/Silent';
import Sun from '~/components/icons/Sun';
import Swells from '~/components/icons/Swells';
import Tide from '~/components/icons/Tide';
import Wind from '~/components/icons/Wind';
import { Alert as AlertType, alertStorage } from '~/services/alertStorage';

const AlertScreen = () => {
  const { alertData } = useLocalSearchParams();
  const parsed = JSON.parse(alertData as string) as AlertType;

  const router = useRouter();

  const [isSilent, setIsSilent] = useState(false);

  const confirmDelete = () => {
    Alert.alert(
      'Delete Alert',
      'Are you sure you want to delete this alert?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: handleDelete,
        },
      ],
      { cancelable: true }
    );
  };

  const bottom = [
    {
      icon: <Silent />,
      text: 'Silent Alert',
      onPress: () => setIsSilent(!isSilent),
    },
    {
      icon: <EditAlert />,
      text: 'Edit Alert',
      onPress: () => setIsSilent(!isSilent),
    },
    {
      icon: <Delete />,
      text: 'Delete Alert',
      onPress: confirmDelete,
    },
  ];

  const handleDelete = async () => {
    await alertStorage.deleteAlert(parsed.id);
    router.back();
  };

  return (
    <Screen>
      <View className="m-4 flex-1 gap-y-4 border bg-[#E6A91A] px-4 py-4">
        <View>
          <Text className="text-center text-[30px] font-extrabold uppercase text-white">
            Location
          </Text>
          <Text className="text-center text-5xl font-bold uppercase">{parsed.location}</Text>
        </View>
        <View>
          <Text className="text-center text-[30px] font-extrabold uppercase text-white">
            Status
          </Text>
          <Text className="text-center text-3xl font-bold uppercase ">Time to go: 48hrs</Text>
          <Text className="text-center text-3xl font-bold uppercase ">Monday, June 4 - 6</Text>
        </View>
        <View className="mt-4 gap-y-2">
          <Text className="text-center text-[40px] font-extrabold uppercase text-white">
            Forecast conditions
          </Text>
          <View className="flex-row items-center justify-between ">
            <Text className="text-2xl font-bold uppercase">Clear</Text>
            <Sun />
          </View>
          <View className="flex-row items-center justify-between ">
            <Text className="text-2xl font-bold uppercase">
              MAX WIND - {parsed.threshold.maxWindSpeed}
            </Text>
            <Wind />
          </View>
          <View className="flex-row items-center justify-between ">
            <Text className="text-2xl font-bold uppercase">
              Swells - {parsed.threshold.maxWaveHeight}
            </Text>
            <Swells />
          </View>
          <View className="flex-row items-center justify-between ">
            <Text className="text-2xl font-bold uppercase">
              Tide - {getTide(parsed.threshold.tide ?? 0)} - 1PM
            </Text>
            <Tide />
          </View>
        </View>
      </View>
      <View className="flex-row items-center justify-between px-4">
        {bottom.map((item) => (
          <TouchableOpacity
            key={item.text}
            className="flex-col items-center gap-x-2 gap-y-1"
            onPress={item.onPress}>
            {item.icon}
            <Text className="text-center font-bold uppercase">{item.text}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </Screen>
  );
};

export default AlertScreen;
