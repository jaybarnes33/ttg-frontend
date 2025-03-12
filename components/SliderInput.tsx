import Slider from '@react-native-community/slider';
import React, { ReactNode } from 'react';
import { View, Text } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const SliderInput = ({
  label,
  value,
  onChange,
  disabled,
  description,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  description: ReactNode;
  disabled?: boolean;
}) => {
  return (
    <View style={{ gap: verticalScale(8) }}>
      {description}
      <View style={{ gap: scale(4) }} className="w-full flex-row items-center">
        <Text
          style={{ fontSize: moderateScale(24), width: moderateScale(70) }}
          className="font-semibold uppercase">
          {label}
        </Text>

        <Slider
          style={{ flex: 1 }}
          minimumValue={0}
          maximumValue={50}
          value={value}
          thumbImage={require('~/assets/thumb.png')}
          maximumTrackTintColor="#000"
          minimumTrackTintColor="#000"
          step={1}
          disabled={disabled}
          onValueChange={onChange}
        />
      </View>
    </View>
  );
};

export default SliderInput;
