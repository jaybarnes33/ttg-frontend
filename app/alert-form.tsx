import { router, useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';

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
      <View className="gap-y-5 px-4 py-6">
        <Text className="text-center text-[41px] font-extrabold uppercase text-white">
          ADD NEW ALERT
        </Text>
        <View>
          <Input
            name="Location"
            className="text-center text-xl font-semibold"
            placeholder="city, state"
            value={location}
            onChangeText={setLocation}
          />

          <Input
            name="Activity"
            className="text-center text-xl font-semibold"
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
            <Text className="text-right text-lg font-semibold  uppercase ">
              Max Wind - {maxWindSpeed} MPH
            </Text>
          }
        />

        <SliderInput
          label="Wave"
          value={maxWaveHeight}
          onChange={setMaxWaveHeight}
          description={
            <Text className="text-right text-lg font-semibold  uppercase ">
              Swells - {maxWaveHeight} ft
            </Text>
          }
        />

        <SliderInput
          label="Tide"
          value={tide}
          onChange={setTide}
          description={
            <View className=" flex-row justify-between">
              <Text className="ml-2 flex-1 text-right text-xl font-semibold uppercase  ">N/A</Text>
              <Text className="ml-2 flex-1 text-right text-xl font-semibold uppercase  ">Low</Text>
              <Text className="ml-2 flex-1 text-right text-xl font-semibold uppercase  ">MED</Text>
              <Text className="ml-2 flex-1 text-right text-xl font-semibold uppercase  ">High</Text>
            </View>
          }
        />

        <TouchableOpacity
          className={`bg-button border-button mx-auto   rounded-xl border-2 px-2 py-1  ${saving ? 'opacity-50' : ''}`}
          onPress={handleCreate}
          disabled={saving || !location.trim()}>
          <Text className="text-center text-2xl font-semibold uppercase text-white">
            {saving ? 'Creating...' : 'Save'}
          </Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
};

export default CreateAlert;
