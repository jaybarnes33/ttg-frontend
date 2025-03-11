import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';

import Input from '~/components/Input';
import Screen from '~/components/Layout/Screen';
import SliderInput from '~/components/SliderInput';
import AlertIcon from '~/components/icons/Alert';
import Chevron from '~/components/icons/Chevron';
import { Alert, alertStorage } from '~/services/alertStorage';

export const getTide = (tide: number) => {
  if (tide === 0) return 'N/A';
  if (tide <= 12) return 'LOW';
  if (tide <= 25) return 'MED';
  if (tide <= 37) return 'HIGH';
  return 'EXTREME';
};

const Alerts = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [activeItem, setActiveItem] = useState<Alert | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);

  const { navigate } = useRouter();
  useFocusEffect(
    useCallback(() => {
      loadAlerts();

      return undefined;
    }, [])
  );

  useEffect(() => {
    if (alerts.length > 0) {
      setActiveItem(alerts[currentIndex]);
    }
  }, [currentIndex, alerts]);

  const loadAlerts = async () => {
    try {
      const savedAlerts = await alertStorage.getAlerts();
      setAlerts(savedAlerts);
      if (savedAlerts.length > 0) {
        setActiveItem(savedAlerts[0]);
      }
      setCurrentIndex(0);
    } catch (error) {
      console.error('Error loading alerts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!activeItem) return;
    try {
      await alertStorage.updateAlert(activeItem);
      setAlerts(alerts.map((alert) => (alert.id === activeItem.id ? activeItem : alert)));
      setEditMode(false);
    } catch (error) {
      console.error('Error saving alert:', error);
    }
  };

  const handleEdit = () => {
    if (alerts[currentIndex]) {
      setActiveItem(alerts[currentIndex]);
    }
    setEditMode(!editMode);
  };

  const goToNext = () => {
    if (currentIndex < alerts.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const hasChanges = () => {
    if (!activeItem || !alerts[currentIndex]) return false;
    const currentAlert = alerts[currentIndex];

    return (
      activeItem.location !== currentAlert.location ||
      activeItem.threshold.maxWindSpeed !== currentAlert.threshold.maxWindSpeed ||
      activeItem.threshold.maxWaveHeight !== currentAlert.threshold.maxWaveHeight ||
      activeItem.threshold.tide !== currentAlert.threshold.tide
    );
  };

  const renderAlert = () =>
    activeItem && (
      <View className="flex-1 border-y border-teal-300 bg-[#d1e8e2] px-4 py-2">
        <View>
          <Text className="text-center text-xl font-bold uppercase">Location</Text>
          <Input
            border
            editable={editMode}
            className="text-center text-3xl font-semibold"
            placeholder="city, state"
            value={activeItem?.location}
            onChangeText={(text) => {
              if (activeItem) {
                setActiveItem({ ...activeItem, location: text });
              }
            }}
          />
        </View>

        <View className="mt-3 flex-1 gap-4">
          <SliderInput
            disabled={!editMode}
            label="Wind"
            value={activeItem.threshold.maxWindSpeed}
            onChange={(value) => {
              if (activeItem) {
                setActiveItem({
                  ...activeItem,
                  threshold: { ...activeItem.threshold, maxWindSpeed: value },
                });
              }
            }}
            description={
              <Text className="ml-2 text-right text-lg font-semibold uppercase">
                Max Wind - {activeItem?.threshold.maxWindSpeed} MPH
              </Text>
            }
          />

          <SliderInput
            disabled={!editMode}
            label="Wave"
            value={activeItem.threshold.maxWaveHeight}
            onChange={(value) => {
              if (activeItem) {
                setActiveItem({
                  ...activeItem,
                  threshold: { ...activeItem.threshold, maxWaveHeight: value },
                });
              }
            }}
            description={
              <Text className="ml-2 text-right text-lg font-semibold uppercase">
                Swells - {activeItem?.threshold.maxWaveHeight} ft
              </Text>
            }
          />

          <SliderInput
            disabled={!editMode}
            description={
              <Text className="ml-2 text-right text-lg font-semibold uppercase">
                Tide: {getTide(activeItem?.threshold.tide ?? 0)}
              </Text>
            }
            label="Tide"
            value={activeItem.threshold.tide}
            onChange={(value) => {
              if (activeItem) {
                setActiveItem({
                  ...activeItem,
                  threshold: { ...activeItem.threshold, tide: value },
                });
              }
            }}
          />
        </View>
        <TouchableOpacity
          onPress={() =>
            navigate({ pathname: '/alert', params: { alertData: JSON.stringify(activeItem) } })
          }>
          <Text>Preview</Text>
        </TouchableOpacity>
      </View>
    );

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#7c3aed" />
      </View>
    );
  }

  return (
    <Screen>
      {alerts.length === 0 ? (
        <>
          <View className="flex-1 items-center justify-center p-6">
            <Text className="mb-4 text-center text-gray-600">
              No alerts set. Create one to get started!
            </Text>
          </View>

          <TouchableOpacity
            className="absolute bottom-6 right-6 h-14 w-14 items-center justify-center rounded-full bg-black shadow-lg"
            onPress={() => navigate('/alert-form')}>
            <MaterialIcons name="add" size={30} color="white" />
          </TouchableOpacity>
        </>
      ) : (
        <View className="flex-1">
          <View className="items-center py-4">
            <Text className="text-[41px] font-extrabold text-white">ALERTS</Text>
          </View>

          {renderAlert()}

          <>
            {/* Indicators */}
            <View className="flex-row items-center justify-between gap-4 px-4 py-4">
              <TouchableOpacity disabled={currentIndex === 0} onPress={goToPrevious}>
                <Chevron size={30} color={currentIndex === 0 ? 'grey' : 'black'} direction="left" />
              </TouchableOpacity>
              {[0, 1, 2, 3].map((index) => (
                <TouchableOpacity
                  onPress={() =>
                    alerts.length - 1 >= index ? setCurrentIndex(index) : navigate('/alert-form')
                  }>
                  <AlertIcon
                    size={40}
                    key={index}
                    state={
                      index < alerts.length
                        ? index === currentIndex
                          ? 'active'
                          : 'filled'
                        : 'muted'
                    }
                  />
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                onPress={() =>
                  alerts.length - 1 >= currentIndex ? goToNext() : navigate('/alert-form')
                }>
                <Chevron size={30} direction="right" />
              </TouchableOpacity>
            </View>
            <View className="flex-row justify-evenly">
              <TouchableOpacity onPress={handleEdit}>
                <Text className="text-[26px] font-bold uppercase text-black">
                  {editMode ? 'CANCEL' : 'EDIT'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSave} disabled={!editMode || !hasChanges()}>
                <Text
                  className={`text-[26px] font-bold uppercase ${
                    editMode && hasChanges() ? 'text-black' : 'text-gray-400'
                  }`}>
                  SAVE
                </Text>
              </TouchableOpacity>
            </View>
          </>
        </View>
      )}
    </Screen>
  );
};

export default Alerts;
