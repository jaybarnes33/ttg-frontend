import { MaterialIcons } from '@expo/vector-icons';
import clsx from 'clsx';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Input from '~/components/Input';

import Screen from '~/components/Layout/Screen';
import SliderInput from '~/components/SliderInput';
import AlertIcon from '~/components/icons/Alert';
import Chevron from '~/components/icons/Chevron';
import Delete from '~/components/icons/Delete';
import { Alert as AlertType, alertStorage } from '~/services/alertStorage';

export const getTide = (tide: number) => {
  if (tide === 0) return 'N/A';
  if (tide <= 1) return 'LOW';
  if (tide <= 2) return 'MED';
  if (tide <= 3) return 'HIGH';
};

const Alerts = () => {
  const [alerts, setAlerts] = useState<AlertType[]>([]);
  const [activeItem, setActiveItem] = useState<AlertType | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);

  const { id } = useLocalSearchParams();

  const { navigate } = useRouter();
  useFocusEffect(
    useCallback(() => {
      loadAlerts();

      return undefined;
    }, [])
  );

  useEffect(() => {
    if (id) {
      console.log('id', id);
      const index = alerts.findIndex((alert) => alert.id === id);
      setCurrentIndex(index);
      setActiveItem(alerts[index]);
      setEditMode(true);
    }
  }, [id, alerts]);

  useEffect(() => {
    if (alerts.length > 0) {
      setActiveItem(alerts[currentIndex]);
    } else {
      setActiveItem(null);
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

  const handleEdit = () => {
    if (!editMode && alerts[currentIndex]) {
      setActiveItem({ ...alerts[currentIndex] });
    } else if (editMode) {
      setActiveItem(alerts[currentIndex]);
    }
    setEditMode(!editMode);
  };

  const handleSave = async () => {
    if (!activeItem) return;
    try {
      await alertStorage.updateAlert(activeItem);
      const updatedAlerts = [...alerts];
      updatedAlerts[currentIndex] = activeItem;
      setAlerts(updatedAlerts);
      setEditMode(false);
    } catch (error) {
      console.error('Error saving alert:', error);
    }
  };

  const handleDelete = async () => {
    if (activeItem) {
      Alert.alert('Delete Alert', 'Are you sure you want to delete this alert?', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await alertStorage.deleteAlert(activeItem.id);
            await loadAlerts();
          },
        },
      ]);
    }
  };

  const goToNext = () => {
    if (currentIndex < alerts.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (alerts.length > 0) {
      setCurrentIndex(0);
    } else {
      navigate('/alert-form');
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (alerts.length > 1) {
      setCurrentIndex(alerts.length - 1);
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

  const renderAlert = () => {
    const location = activeItem?.location;
    const name = `${location?.CITY}, ${location?.ST}`;
    return (
      <View
        className="h-[75%]  gap-y-2 border-y border-teal-300 bg-[#d1e8e2] px-4 py-2"
        style={{
          height: '75%',
          paddingHorizontal: moderateScale(16),
          paddingVertical: moderateScale(8),
          gap: moderateScale(8),
        }}>
        <View
          className=" -mt-10 flex-1 gap-2 "
          style={{ marginTop: moderateScale(-40), gap: moderateScale(8) }}>
          <View>
            <Input
              value={name}
              className={clsx(['text-center  font-bold uppercase'])}
              style={{ fontSize: moderateScale(name.length > 12 ? 25 : 32) }}
              name="City-State"
              border
              readOnly
            />
            <Input
              value={location?.NAME}
              className={clsx(['text-center  font-bold uppercase'])}
              style={{ fontSize: moderateScale(name.length > 12 ? 25 : 32) }}
              name="location"
              border
              readOnly
            />
          </View>
          <SliderInput
            disabled={!editMode}
            max={20}
            label="Wind"
            value={activeItem!.threshold.maxWindSpeed}
            onChange={(value) => {
              if (activeItem) {
                setActiveItem({
                  ...activeItem,
                  threshold: { ...activeItem.threshold, maxWindSpeed: value },
                });
              }
            }}
            description={
              <Text
                className="ml-2 text-right text-lg font-semibold uppercase"
                style={{ fontSize: moderateScale(18) }}>
                Max Wind - {activeItem?.threshold.maxWindSpeed} MPH
              </Text>
            }
          />

          <SliderInput
            disabled={!editMode}
            max={10}
            label="Wave"
            value={activeItem!.threshold.maxWaveHeight}
            onChange={(value) => {
              if (activeItem) {
                setActiveItem({
                  ...activeItem,
                  threshold: { ...activeItem.threshold, maxWaveHeight: value },
                });
              }
            }}
            description={
              <Text
                className="ml-2 text-right text-lg font-semibold uppercase"
                style={{ fontSize: moderateScale(18) }}>
                Swells - {activeItem?.threshold.maxWaveHeight} ft
              </Text>
            }
          />

          <SliderInput
            disabled={!editMode}
            max={3}
            description={
              <Text
                className="ml-2 text-right text-lg font-semibold uppercase"
                style={{ fontSize: moderateScale(18) }}>
                Tide: {getTide(activeItem?.threshold.tide ?? 0)}
              </Text>
            }
            label="Tide"
            value={activeItem!.threshold.tide}
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
      </View>
    );
  };

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
            style={{
              position: 'absolute',
              bottom: moderateScale(24),
              right: moderateScale(24),
              height: moderateScale(56),
              width: moderateScale(56),
              borderRadius: moderateScale(28),
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'black',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
            }}
            onPress={() => navigate('/alert-form')}>
            <MaterialIcons name="add" size={moderateScale(30)} color="white" />
          </TouchableOpacity>
        </>
      ) : (
        <View className="flex-1">
          <View className="items-center py-4">
            <Text style={{ fontSize: moderateScale(41) }} className="font-extrabold text-white">
              ALERTS
            </Text>
          </View>

          {renderAlert()}

          <View>
            {/* Indicators */}
            <View className="flex-row items-center justify-between gap-4 px-4 py-4">
              <TouchableOpacity onPress={goToPrevious} disabled={alerts.length <= 1}>
                <Chevron
                  size={moderateScale(30)}
                  direction="left"
                  color={alerts.length > 1 ? 'black' : 'gray'}
                />
              </TouchableOpacity>
              {[0, 1, 2, 3].map((index) => (
                <TouchableOpacity
                  key={index}
                  disabled={alerts.length - 1 < index}
                  onPress={() => alerts.length - 1 >= index && setCurrentIndex(index)}>
                  <AlertIcon
                    key={`alert-${index}`}
                    size={moderateScale(40)}
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
              <TouchableOpacity onPress={goToNext} disabled={alerts.length <= 1}>
                <Chevron
                  size={moderateScale(30)}
                  direction="right"
                  color={alerts.length > 1 ? 'black' : 'gray'}
                />
              </TouchableOpacity>
            </View>
            <View className="flex-row justify-evenly pb-4">
              <TouchableOpacity onPress={handleEdit}>
                <Text
                  style={{ fontSize: moderateScale(26) }}
                  className="font-bold uppercase text-black">
                  {editMode ? 'CANCEL' : 'EDIT'}
                </Text>
              </TouchableOpacity>
              {activeItem && (
                <TouchableOpacity onPress={handleDelete}>
                  <Delete />
                </TouchableOpacity>
              )}
              <TouchableOpacity onPress={handleSave} disabled={!editMode || !hasChanges()}>
                <Text
                  style={{ fontSize: moderateScale(26) }}
                  className={`font-bold uppercase ${
                    editMode && hasChanges() ? 'text-black' : 'text-gray-400'
                  }`}>
                  SAVE
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </Screen>
  );
};

export default Alerts;
