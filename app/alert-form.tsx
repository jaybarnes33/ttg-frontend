import { router, useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

import { alertStorage } from '../services/alertStorage';

import Input from '~/components/Input';
import Screen from '~/components/Layout/Screen';
import SliderInput from '~/components/SliderInput';

const CreateAlert = () => {
  const [location, setLocation] = useState('');
  const [activity, setActivity] = useState('');
  const [maxWindSpeed, setMaxWindSpeed] = useState(20);
  const [maxWaveHeight, setMaxWaveHeight] = useState(4);
  const [tide, setTide] = useState(0);
  const [saving, setSaving] = useState(false);
  const [totalAlerts, setTotalAlerts] = useState(0);

  useFocusEffect(
    useCallback(() => {
      const loadAlerts = async () => {
        const alerts = await alertStorage.getAlerts();
        setTotalAlerts(alerts.length);
      };
      loadAlerts();
    }, [])
  );

  const handleCreate = async () => {
    if (!location.trim()) return;
    if (totalAlerts >= 4) {
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
        },
        active: true,
        activity,
      });
      router.back();
    } catch (error) {
      console.error('Error creating alert:', error);
    } finally {
      setSaving(false);
    }
  };

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
              className="pt-1 text-center text-3xl font-semibold "
              placeholder="city, state"
              value={location}
              onChangeText={setLocation}
            />

            <Input
              name="Activity"
              className=" text-center text-3xl font-semibold"
              placeholder="activity"
              value={activity}
              onChangeText={setActivity}
            />
          </View>

          <SliderInput
            label="Wind"
            value={maxWindSpeed}
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
            onChange={setTide}
            description={
              <View className="flex-row justify-end">
                {['N/A', 'Low', 'MED', 'High'].map((text) => (
                  <Text
                    key={text}
                    style={{ fontSize: moderateScale(18) }}
                    className="ml-2  text-right font-semibold uppercase">
                    {text}
                  </Text>
                ))}
              </View>
            }
          />

          <TouchableOpacity
            style={{
              paddingHorizontal: scale(8),
              paddingVertical: verticalScale(4),
            }}
            className={`mx-auto rounded-xl border-2 border-button bg-button ${saving ? 'opacity-50' : ''}`}
            onPress={handleCreate}
            disabled={saving || !location.trim()}>
            <Text
              style={{ fontSize: moderateScale(24) }}
              className="text-center font-semibold uppercase text-white">
              {saving ? 'Creating...' : 'Save'}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
};

export default CreateAlert;
