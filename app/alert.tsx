import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

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
  const handleEdit = () => {
    router.push({
      pathname: '/alerts',
      params: { id: parsed.id },
    });
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
      onPress: handleEdit,
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
      <View
        style={{
          marginHorizontal: scale(16),
          marginVertical: verticalScale(8),
          paddingVertical: scale(8),
          paddingHorizontal: scale(16),
          gap: verticalScale(10),
        }}
        className="flex-1 border bg-[#E6A91A]">
        <View>
          <Text
            style={{ fontSize: moderateScale(30) }}
            className="text-center font-extrabold uppercase text-white">
            Location
          </Text>
          <Text style={{ fontSize: moderateScale(48) }} className="text-center font-bold uppercase">
            {parsed.location}
          </Text>
        </View>

        <View>
          <Text
            style={{ fontSize: moderateScale(30) }}
            className="text-center font-extrabold uppercase text-white">
            Status
          </Text>
          <Text style={{ fontSize: moderateScale(24) }} className="text-center font-bold uppercase">
            Time to go: 48hrs
          </Text>
          <Text style={{ fontSize: moderateScale(24) }} className="text-center font-bold uppercase">
            Monday, June 4 - 6
          </Text>
        </View>

        <View style={{ marginTop: verticalScale(16), gap: verticalScale(4) }}>
          <Text
            style={{ fontSize: moderateScale(35) }}
            className="text-center font-extrabold uppercase text-white">
            Forecast conditions
          </Text>

          <View className="flex-row items-center justify-between">
            <Text style={{ fontSize: moderateScale(20) }} className="font-bold uppercase">
              Clear
            </Text>
            <Sun />
          </View>

          <View className="flex-row items-center justify-between">
            <Text style={{ fontSize: moderateScale(20) }} className="font-bold uppercase">
              MAX WIND - {parsed.threshold.maxWindSpeed}
            </Text>
            <Wind />
          </View>

          <View className="flex-row items-center justify-between">
            <Text style={{ fontSize: moderateScale(20) }} className="font-bold uppercase">
              Swells - {parsed.threshold.maxWaveHeight}
            </Text>
            <Swells />
          </View>

          <View className="flex-row items-center justify-between">
            <Text style={{ fontSize: moderateScale(20) }} className="font-bold uppercase">
              Tide - {getTide(parsed.threshold.tide ?? 0)} - 1PM
            </Text>
            <Tide />
          </View>
        </View>
      </View>

      <View
        style={{ paddingHorizontal: scale(16) }}
        className="flex-row items-center justify-between">
        {bottom.map((item) => (
          <TouchableOpacity
            key={item.text}
            style={{ gap: verticalScale(4) }}
            className="flex-col items-center"
            onPress={item.onPress}>
            {item.icon}
            <Text
              style={{ fontSize: moderateScale(14) }}
              className="text-center font-bold uppercase">
              {item.text}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </Screen>
  );
};

export default AlertScreen;
