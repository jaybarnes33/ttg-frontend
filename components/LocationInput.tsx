import clsx from 'clsx';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { verticalScale, scale, moderateScale } from 'react-native-size-matters';

import Input from './Input';

import locations from '~/locations.json'; // Make sure this path is correct
import { Location } from '~/types/global';

const LocationInput = ({
  onChange,
}: {
  onChange: (location: Location) => void;
  location: Location;
}) => {
  const [keyword, setKeyword] = useState('');
  const [showResults, setShowResults] = useState(false);
  // Filter locations by keyword (case-insensitive, matches city, name, or state)
  const filtered =
    keyword.length > 1
      ? locations.filter((loc: Location) => {
          const kw = keyword.toLowerCase();
          return (
            loc.CITY.toLowerCase().includes(kw) ||
            (loc.NAME && loc.NAME.toLowerCase().includes(kw)) ||
            (loc.ST && loc.ST.toLowerCase().includes(kw))
          );
        })
      : [];
  const handleClear = () => {
    onChange({ CITY: '', NAME: '', ST: '', LAT: 0, LNG: 0 });
  };

  return (
    <View className="relative">
      <Input
        className={clsx(' text-center  font-bold uppercase')}
        size={moderateScale(28)}
        border
        placeholderTextColor="#bbb"
        placeholder="city"
        value={keyword.toUpperCase()}
        onChangeText={(text) => {
          setKeyword(text);
          setShowResults(true);
          handleClear();
        }}
        name="City-State"
        onFocus={() => {
          if (keyword.length > 1) {
            setShowResults(true);
          }
        }}
        autoCorrect={false}
        autoCapitalize="characters"
      />

      {showResults && filtered.length > 0 && (
        <View className=" -mt-10   w-full rounded-b-lg bg-white shadow-lg">
          <View className="flex-row items-center justify-between border-b border-gray-200">
            <Text className="flex-1 px-3 py-2 text-base font-semibold text-gray-700">
              {filtered.length} results for "{keyword}"
            </Text>

            <TouchableOpacity
              className="border-b border-gray-200 bg-white px-3 py-2"
              onPress={() => {
                setKeyword('');
                setShowResults(false);
                handleClear();
              }}>
              <Text className="text-base text-gray-500">Clear</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            style={{
              maxHeight: verticalScale(200),
              borderRadius: scale(8),
              marginTop: verticalScale(4),
              position: 'relative',
              zIndex: 9999999,
            }}>
            {filtered.slice(0, 10).map((item) => (
              <TouchableOpacity
                key={`${item.CITY}-${item.NAME}-${item.LAT}`}
                className="border-b border-gray-200 px-3 py-2"
                style={{
                  backgroundColor: 'white',
                  position: 'relative',
                  zIndex: 9999999,
                }}
                onPress={() => {
                  setKeyword(`${item.CITY}, ${item.ST}`);
                  setShowResults(false);
                  onChange(item);
                }}>
                <Text className="text-base font-semibold">
                  {item.CITY}
                  {item.NAME ? ` – ${item.NAME}` : ''}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
      {showResults && keyword.length > 1 && filtered.length === 0 && (
        <Text className="mt-2 text-center text-base text-gray-400">No locations found.</Text>
      )}
    </View>
  );
};

export default LocationInput;
