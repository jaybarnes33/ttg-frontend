import { Audio } from 'expo-av';
import { router, useFocusEffect } from 'expo-router';
import React, { useCallback, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { Menu, Button } from 'react-native-paper';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
  useSharedValue,
  runOnJS,
} from 'react-native-reanimated';
import { scale as scaleFunc, verticalScale, moderateScale } from 'react-native-size-matters';

import { alertStorage } from '../services/alertStorage';

import Screen from '~/components/Layout/Screen';
import LocationInput from '~/components/LocationInput';
import SliderInput from '~/components/SliderInput';
import { Location } from '~/types/global';
import { getTideLabel, TIDE_TIMES } from '~/utils/tide';
import Input from '~/components/Input';
import clsx from 'clsx';

const CreateAlert = () => {
  const [location, setLocation] = useState<Location>({
    CITY: '',
    NAME: '',
    ST: '',
    LAT: 0,
    LNG: 0,
  });
  const [maxWindSpeed, setMaxWindSpeed] = useState(0);
  const [maxWaveHeight, setMaxWaveHeight] = useState(0);
  const [tide, setTide] = useState(0);
  const [tideTime, setTideTime] = useState<{ start: number | null; end: number | null }>({
    start: null,
    end: null,
  });
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
    if (!location.LAT || !location.LNG) return;
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
      });

      // Run sound and animation in parallel
      await Promise.all([playSuccessSound(), animateRipple()]);

      setLocation({
        CITY: '',
        NAME: '',
        ST: '',
        LAT: 0,
        LNG: 0,
      });
      setMaxWindSpeed(0);
      setMaxWaveHeight(0);
      setTide(0);
      setTideTime({ start: null, end: null });
      router.replace('/alerts');
    } catch (error) {
      console.error('Error creating alert:', error);
    } finally {
      setSaving(false);
    }
  };

  const tap = Gesture.Tap().onStart(() => {
    console.log('tap');
    if (!saving && !locationValid) {
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

  const locationValid = location && location.NAME && location.LAT && location.LNG;
  const [height, setHeight] = useState(40);
  return (
    <Screen>
      <View
        style={{
          flex: 1,
          paddingHorizontal: moderateScale(16),
          paddingVertical: verticalScale(10),
          gap: verticalScale(10),
        }}>
        <Text
          style={{
            fontSize: moderateScale(35),
            textAlign: 'center',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            color: 'white',
            marginBottom: verticalScale(10),
          }}>
          ADD NEW ALERT
        </Text>

        <LocationInput onChange={setLocation} location={location} />
        <Input
          name="location"
          value={location.NAME}
          style={{
            fontSize: moderateScale(25),
            textAlign: 'center',
            fontWeight: 'bold',
            textTransform: 'uppercase',
          }}
          readOnly
          border
        />

        <View>
          <SliderInput
            label="Wind"
            value={maxWindSpeed}
            max={20}
            onChange={setMaxWindSpeed}
            description={
              <Text
                style={{
                  fontSize: moderateScale(18),
                  textAlign: 'right',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                }}>
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
                style={{
                  fontSize: moderateScale(18),
                  textAlign: 'right',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                }}>
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
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: verticalScale(10),
                  paddingBottom: verticalScale(4),
                }}>
                <Menu
                  visible={menuVisible}
                  onDismiss={() => setMenuVisible(false)}
                  anchor={
                    <Button
                      mode="outlined"
                      onPress={() => setMenuVisible(true)}
                      style={{
                        borderColor: '#000',
                        borderWidth: 1,
                        backgroundColor: '#e0f7fa',
                      }}
                      labelStyle={{
                        color: '#000',
                        fontSize: moderateScale(14),
                      }}>
                      {tideTime.start !== null && tideTime.end !== null
                        ? TIDE_TIMES.find(
                            (t) => t.start === tideTime.start && t.end === tideTime.end
                          )?.label
                        : 'Select Tide Time'}
                    </Button>
                  }>
                  {TIDE_TIMES.map((time) => (
                    <Menu.Item
                      key={time.label}
                      onPress={() => {
                        setTideTime({ start: time.start, end: time.end });
                        setMenuVisible(false);
                      }}
                      title={time.label}
                      titleStyle={{
                        fontSize: moderateScale(14),
                        fontWeight: 'bold',
                        fontStyle: 'italic',
                        fontFamily: 'System',
                      }}
                    />
                  ))}
                </Menu>
                <Text
                  style={{
                    fontSize: moderateScale(18),
                    fontWeight: '600',
                    textTransform: 'uppercase',
                  }}>
                  {getTideLabel(tide)}
                </Text>
              </View>
            }
          />
        </View>

        <View style={{ alignItems: 'center', marginTop: verticalScale(16) }}>
          <GestureDetector gesture={tap}>
            <TouchableOpacity
              style={{
                paddingHorizontal: scaleFunc(8),
                paddingVertical: verticalScale(4),
                borderRadius: moderateScale(12),
                borderWidth: 2,
                borderColor: '#00bcd4',
                backgroundColor: '#00bcd4',
                opacity: saving || !locationValid ? 0.5 : 1,
                width: '60%',
              }}
              disabled={saving || !locationValid}>
              <Text
                style={{
                  fontSize: moderateScale(24),
                  textAlign: 'center',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  color: 'white',
                }}>
                {saving ? 'Creating...' : 'Save'}
              </Text>
            </TouchableOpacity>
          </GestureDetector>
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
      </View>
    </Screen>
  );
};

export default CreateAlert;
