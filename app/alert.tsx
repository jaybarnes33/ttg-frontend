import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Alert, Animated } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { Audio } from 'expo-av';

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
import clsx from 'clsx';
import { getTime } from '~/utils/time';

const AlertScreen = () => {
  const { alertData } = useLocalSearchParams();
  const parsed = JSON.parse(alertData as string) as AlertType;

  const router = useRouter();
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const soundRef = useRef<Audio.Sound | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isStoppingRef = useRef(false);

  const [isDemo, setIsDemo] = useState(false);
  const [isSilent, setIsSilent] = useState(false);
  const [windRating] = useState(() => Math.floor(Math.random() * 5) + 1);
  const [swellRating] = useState(() => Math.floor(Math.random() * 5) + 1);

  console.log({ parsed });
  const setupAudio = async () => {
    try {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });
    } catch (error) {
      console.error('Error setting up audio:', error);
    }
  };

  const playAlertSound = async () => {
    if (isSilent || isStoppingRef.current) return; // Don't play if silenced or stopping

    try {
      console.log('playing sound');
      const { sound } = await Audio.Sound.createAsync(require('../assets/sounds/ring.mp3'), {
        shouldPlay: true,
      });

      // Clean up previous sound if it exists
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
      }

      soundRef.current = sound;
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  const stopSound = async () => {
    console.log('stopping sound');
    isStoppingRef.current = true;

    try {
      if (soundRef.current) {
        await soundRef.current.stopAsync();
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    } catch (error) {
      console.error('Error stopping sound:', error);
    } finally {
      isStoppingRef.current = false;
    }
  };

  // Single effect to handle all sound management
  useEffect(() => {
    console.log('Setting up sound management, silent:', isSilent);

    // Initial setup
    setupAudio();

    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Stop any existing sound
    stopSound();

    // Only set up interval if not silent
    if (!isSilent) {
      // Small delay before starting new sound
      setTimeout(() => {
        if (!isSilent) {
          // Double check we're still not silent
          playAlertSound();
          intervalRef.current = setInterval(playAlertSound, 5000);
        }
      }, 100);
    }

    // Cleanup
    return () => {
      console.log('Cleaning up sound management');
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      stopSound();
    };
  }, [isSilent]); // Only re-run when silence state changes

  const handleClose = () => {
    stopSound();
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

    // Cleanup function to stop sound when component unmounts
    return () => {
      stopSound();
    };
  }, []);

  const bottom = [
    {
      icon: <Silent />,
      text: isSilent ? 'Unmute Alert' : 'Silent Alert',
      onPress: () => setIsSilent(!isSilent),
    },

    { icon: '', text: 'Demo Mode' },

    {
      icon: <Feather name="x" size={50} color="red" />,
      text: 'Close Alert',
      onPress: handleClose,
    },
  ];
  const name = `${parsed.location.CITY}, ${parsed.location.ST}`;

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
            className={clsx([
              'text-center font-bold uppercase',
              name.length > 13 ? 'text-3xl' : 'text-[34px]',
            ])}>
            {name}
          </Text>
          {parsed.location.NAME && (
            <Text
              style={{
                fontSize: parsed.location.NAME.length > 13 ? moderateScale(20) : moderateScale(27),
              }}
              className="text-center font-bold">
              {parsed.location.NAME}
            </Text>
          )}
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
              Tide - {getTide(parsed.threshold.tide ?? 0)}
              {parsed.threshold.tideTime ? ` at ${getTime(parsed.threshold.tideTime.start!)}` : ''}
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
