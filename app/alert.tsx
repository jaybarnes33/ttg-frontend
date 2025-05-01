import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Alert, Animated } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

import { getTide } from './alerts';

import Screen from '~/components/Layout/Screen';
import { Feather } from '@expo/vector-icons';
import Silent from '~/components/icons/Silent';
import Sun from '~/components/icons/Sun';
import Swells from '~/components/icons/Swells';
import Tide from '~/components/icons/Tide';
import Wind from '~/components/icons/Wind';
import StarRating from '~/components/StarRating';
import { Alert as AlertType, alertStorage } from '~/services/alertStorage';

const AlertScreen = () => {
  const { alertData } = useLocalSearchParams();
  const parsed = JSON.parse(alertData as string) as AlertType;

  const router = useRouter();
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const [isDemo, setIsDemo] = useState(false);
  const [isSilent, setIsSilent] = useState(false);
  const [windRating] = useState(() => Math.floor(Math.random() * 5) + 1);
  const [swellRating] = useState(() => Math.floor(Math.random() * 5) + 1);

  const handleClose = () => {
    router.push('/');
  };

  useEffect(() => {
    setIsDemo(true);
    const pulse = Animated.sequence([
      Animated.timing(pulseAnim, {
        toValue: 1.2,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(pulseAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]);

    Animated.loop(pulse).start();
  }, []);

  const bottom = [
    {
      icon: <Silent />,
      text: 'Silent Alert',
      onPress: () => setIsSilent(!isSilent),
    },

    { icon: '', text: 'Demo Mode' },

    {
      icon: <Feather name="x" size={50} color="red" />,
      text: 'Close Alert',
      onPress: handleClose,
    },
  ];

  return (
    <Screen hideArrows>
      <View
        style={{
          marginHorizontal: scale(16),
          marginVertical: verticalScale(8),
          paddingVertical: scale(8),
          paddingHorizontal: scale(16),
          gap: verticalScale(5),
        }}
        className="flex-1 border bg-[#E6A91A]">
        <View>
          <Text
            style={{ fontSize: moderateScale(27) }}
            className="text-center font-bold uppercase text-white">
            Location
          </Text>
          <Text
            style={{ fontSize: moderateScale(parsed.location.length > 10 ? 25 : 40) }}
            className="text-center font-bold uppercase">
            {parsed.location}
          </Text>
        </View>

        <View>
          <Text
            style={{ fontSize: moderateScale(27) }}
            className="text-center font-bold uppercase text-white">
            Status
          </Text>
          <Text style={{ fontSize: moderateScale(24) }} className="text-center font-bold uppercase">
            Time to go: 48hrs
          </Text>
          <Text style={{ fontSize: moderateScale(24) }} className="text-center font-bold uppercase">
            Monday, June 4 - 6
          </Text>
        </View>

        <View style={{ marginTop: verticalScale(16), gap: verticalScale(1) }}>
          <Text
            style={{ fontSize: moderateScale(27) }}
            className="text-center font-bold uppercase text-white">
            conditions
          </Text>

          <View className="flex-row items-center justify-between">
            <Text style={{ fontSize: moderateScale(18) }} className="font-bold uppercase">
              MAX WIND - {parsed.threshold.maxWindSpeed}MPH
            </Text>
            <Wind wind={parsed.threshold.maxWindSpeed} />
          </View>
          <View>
            <StarRating rating={windRating} size={24} />
          </View>

          <View className="flex-row items-center justify-between">
            <Text style={{ fontSize: moderateScale(18) }} className="font-bold uppercase">
              Swells - {parsed.threshold.maxWaveHeight} FEET
            </Text>
            <Swells />
          </View>
          <View>
            <StarRating rating={swellRating} size={24} />
          </View>

          <View className="flex-row items-center justify-between">
            <Text style={{ fontSize: moderateScale(18) }} className="font-bold uppercase">
              Tide - {getTide(parsed.threshold.tide ?? 0)} - 1PM
            </Text>
            <Tide tide={parsed.threshold.tide ?? 0} />
          </View>
        </View>
        <View>
          <Text
            style={{ fontSize: moderateScale(27) }}
            className="text-center font-bold uppercase text-white">
            Forecast
          </Text>
          <TouchableOpacity
            className="items-center"
            onPress={() => Alert.alert('Forecast', 'forecast here')}>
            <Text className="text-center  ">Click for detailed forecast</Text>
          </TouchableOpacity>
          <View className="flex-row items-center justify-between gap-x-4">
            <Text style={{ fontSize: moderateScale(18) }} className="flex-1 font-bold uppercase">
              Clear
            </Text>

            <Text style={{ fontSize: moderateScale(18) }} className="font-bold uppercase">
              80%
            </Text>
            <Sun />
          </View>
        </View>
      </View>

      <View
        style={{ paddingHorizontal: scale(16) }}
        className="flex-row items-center justify-between">
        <TouchableOpacity
          style={{ gap: verticalScale(4) }}
          className="flex-col items-center"
          onPress={bottom[0].onPress}>
          {bottom[0].icon}
          <Text style={{ fontSize: moderateScale(14) }} className="text-center font-bold uppercase">
            {bottom[0].text}
          </Text>
        </TouchableOpacity>
        {isDemo && (
          <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
            <TouchableOpacity className="flex-col items-center" onPress={bottom[1].onPress}>
              {bottom[1].text.split(' ').map((word) => (
                <Text
                  style={{ fontSize: moderateScale(18) }}
                  key={word}
                  className="text-center font-extrabold uppercase text-red-500">
                  {word}
                </Text>
              ))}
            </TouchableOpacity>
          </Animated.View>
        )}
        <TouchableOpacity
          style={{ gap: verticalScale(4) }}
          className="flex-col items-center"
          onPress={bottom[2].onPress}>
          {bottom[2].icon}
          <Text style={{ fontSize: moderateScale(14) }} className="text-center font-bold uppercase">
            {bottom[2].text}
          </Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
};

export default AlertScreen;
