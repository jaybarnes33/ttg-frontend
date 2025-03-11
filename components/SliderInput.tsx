import Slider from '@react-native-community/slider';
import React, { ReactNode } from 'react';
import { View, Text } from 'react-native';

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
    <View className="gap-2">
      {description}
      <View className="w-full flex-row  items-center gap-1">
        <Text className="w-[17%] text-2xl font-semibold uppercase">{label}</Text>

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
