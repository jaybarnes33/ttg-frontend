import { Audio } from 'expo-av';
import { router, useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
  useSharedValue,
  runOnJS,
} from 'react-native-reanimated';
import { scale as scaleFunc, verticalScale, moderateScale } from 'react-native-size-matters';
import { Menu, Button } from 'react-native-paper';

import { getTide } from './alerts';
import { alertStorage } from '../services/alertStorage';

import Input from '~/components/Input';
import Screen from '~/components/Layout/Screen';
import SliderInput from '~/components/SliderInput';

const TIDE_TIMES = [
  { label: 'Select Time', value: '' },
  { label: '6:00 AM', value: '6:00' },
  { label: '9:00 AM', value: '9:00' },
  { label: '12:00 PM', value: '12:00' },
  { label: '3:00 PM', value: '15:00' },
  { label: '6:00 PM', value: '18:00' },
  { label: '9:00 PM', value: '21:00' },
];

const CreateAlert = () => {
  const [location, setLocation] = useState('');
  const [activity, setActivity] = useState('');
  const [maxWindSpeed, setMaxWindSpeed] = useState(0);
  const [maxWaveHeight, setMaxWaveHeight] = useState(0);
  const [tide, setTide] = useState(0);
  const [tideTime, setTideTime] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);
  const [saving, setSaving] = useState(false);
  const [totalAlerts, setTotalAlerts] = useState(0);

  const scale = useSharedValue(0.1);
  const opacity = useSharedValue(0);
  const radius = useSharedValue(10);
  const translateY = useSharedValue(1000);

  useFocusEffect(
    useCallback(() => {
      const loadAlerts = async () => {
        const alerts = await alertStorage.getAlerts();
        setTotalAlerts(alerts.length);
      };
      loadAlerts();
    }, [])
  );

  const playSuccessSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(require('../assets/sounds/alert.mp3'));
      await sound.playAsync();
      return new Promise<void>((resolve) => {
        setTimeout(resolve, 1000);
      });
    } catch (error) {
      console.log('Error playing sound:', error);
      return Promise.resolve();
    }
  };

  const animateRipple = () => {
    return new Promise<void>((resolve) => {
      translateY.value = 1000;
      opacity.value = 0;
      radius.value = 10;
      scale.value = 0.1;

      translateY.value = withSpring(-1000, {
        damping: 20,
        stiffness: 50,
        mass: 1,
      });
      opacity.value = withSequence(
        withTiming(0.8, { duration: 300 }),
        withTiming(0, { duration: 2000 })
      );
      radius.value = withSpring(1000, {
        damping: 15,
        stiffness: 30,
        mass: 1,
      });
      scale.value = withSpring(1, {
        damping: 20,
        stiffness: 50,
        mass: 1,
      });

      // Resolve after the longest animation (opacity fade out)
      setTimeout(resolve, 2300); // 300ms fade in + 2000ms fade out
    });
  };

  const handleCreate = async () => {
    if (!location.trim()) return;
    if (totalAlerts === 4) {
      Alert.alert('You have reached the maximum number of alerts, upgrade your plan');
      return;
    }

    try {
      setSaving(true);
      await alertStorage.saveAlert({
        location,
        threshold: {
          maxWindSpeed,
          maxWaveHeight,
          tide,
          tideTime,
        },
        active: true,
        activity,
      });

      // Run sound and animation in parallel
      await Promise.all([playSuccessSound(), animateRipple()]);

      setActivity('');
      setLocation('');
      setMaxWindSpeed(0);
      setMaxWaveHeight(0);
      setTide(0);
      setTideTime('');
      router.navigate('/alerts');
    } catch (error) {
      console.error('Error creating alert:', error);
    } finally {
      setSaving(false);
    }
  };

  const tap = Gesture.Tap().onStart(() => {
    console.log('tap');
    if (!saving && location.trim()) {
      runOnJS(handleCreate)();
    }
  });

  const rippleStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    width: radius.value * 2,
    height: radius.value * 2,
    borderRadius: radius.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Screen>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}>
        <View className="gap-y-5 px-4" style={{ paddingVertical: verticalScale(6) }}>
          <Text
            style={{ fontSize: moderateScale(41) }}
            className="text-center font-extrabold uppercase text-white">
            ADD NEW ALERT
          </Text>
          <View>
            <Input
              name="Location"
              className="pt-1 text-center text-3xl font-semibold"
              placeholder="city, state"
              value={location}
              onChangeText={setLocation}
            />

            <Input
              name="Activity"
              className="text-center text-3xl font-semibold"
              placeholder="activity"
              value={activity}
              onChangeText={setActivity}
            />
          </View>

          <SliderInput
            label="Wind"
            value={maxWindSpeed}
            max={20}
            onChange={setMaxWindSpeed}
            description={
              <Text
                style={{ fontSize: moderateScale(18) }}
                className="text-right font-semibold uppercase">
                Max Wind - {maxWindSpeed} MPH
              </Text>
            }
          />

          <SliderInput
            label="Wave"
            value={maxWaveHeight}
            max={10}
            onChange={setMaxWaveHeight}
            description={
              <Text
                style={{ fontSize: moderateScale(18) }}
                className="text-right font-semibold uppercase">
                Swells - {maxWaveHeight} ft
              </Text>
            }
          />

          <SliderInput
            label="Tide"
            value={tide}
            max={3}
            onChange={setTide}
            description={
              <View className="gap-y-2">
                <View className="flex-row items-center justify-between">
                  <Text style={{ fontSize: moderateScale(18) }} className="font-semibold uppercase">
                    {getTide(tide)}
                  </Text>
                  <Menu
                    visible={menuVisible}
                    onDismiss={() => setMenuVisible(false)}
                    anchor={
                      <Button
                        mode="outlined"
                        onPress={() => setMenuVisible(true)}
                        style={{ borderColor: '#000', borderWidth: 1 }}
                        labelStyle={{ color: '#000', fontSize: moderateScale(14) }}>
                        {tideTime
                          ? TIDE_TIMES.find((t) => t.value === tideTime)?.label
                          : 'Select Time'}
                      </Button>
                    }>
                    {TIDE_TIMES.map((time) => (
                      <Menu.Item
                        key={time.value}
                        onPress={() => {
                          setTideTime(time.value);
                          setMenuVisible(false);
                        }}
                        title={time.label}
                      />
                    ))}
                  </Menu>
                </View>
              </View>
            }
          />

          <View className="relative items-center">
            <GestureDetector gesture={tap}>
              <TouchableOpacity
                style={{
                  paddingHorizontal: scaleFunc(8),
                  paddingVertical: verticalScale(4),
                }}
                className={`rounded-xl border-2 border-button bg-button ${saving ? 'opacity-50' : ''}`}
                disabled={saving || !location.trim()}>
                <Text
                  style={{ fontSize: moderateScale(24) }}
                  className="text-center font-semibold uppercase text-white">
                  {saving ? 'Creating...' : 'Save'}
                </Text>
              </TouchableOpacity>
            </GestureDetector>
          </View>
        </View>

        <Animated.View
          style={[
            rippleStyle,
            {
              position: 'absolute',
              backgroundColor: 'rgba(255, 255, 255, 0.5)',
              zIndex: 1000,
              bottom: 0,
              left: '50%',
              marginLeft: -radius.value,
            },
          ]}
        />
      </KeyboardAvoidingView>
    </Screen>
  );
};

export default CreateAlert;
