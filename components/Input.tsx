import { Feather } from '@expo/vector-icons';
import { clsx } from 'clsx';
import React from 'react';
import { View, Text, TextInput, TextInputProps, TouchableOpacity } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const Input = (props: TextInputProps & { name?: string; border?: boolean }) => {
  const [focus, setFocus] = React.useState(false);
  const [secure, setSecure] = React.useState(props.secureTextEntry || false);
  const inputRef = React.useRef<TextInput>(null);

  return (
    <View style={{ marginVertical: verticalScale(8), gap: verticalScale(4) }}>
      <View
        style={{
          height: props.multiline ? verticalScale(100) : verticalScale(45),
          ...(props.multiline && { paddingVertical: verticalScale(8) }),
        }}
        className={clsx([
          'font-main w-full justify-center bg-blue-100 font-semibold',
          focus && 'border-[3.1px] border-teal-500',
          props.border && 'border-2 border-black',
        ])}>
        <TextInput
          {...props}
          ref={inputRef}
          style={{
            height: '100%',
            paddingHorizontal: scale(12),
            fontSize: moderateScale(16),
            ...(props.style as object),
          }}
          className={clsx(['font-main absolute w-full flex-1 bg-white', props.className])}
          placeholderTextColor="#bbb"
          secureTextEntry={secure}
          editable={props.editable}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        />
        {props.secureTextEntry && (
          <TouchableOpacity
            onPress={() => setSecure(!secure)}
            style={{
              width: scale(48),
              height: '100%',
            }}
            className="absolute right-0 items-center justify-center">
            <Text className="text-gray-700 dark:text-neutral-50">
              <Feather name={secure ? 'eye' : 'eye-off'} size={moderateScale(20)} />
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {props.name && (
        <Text
          style={{ fontSize: moderateScale(18) }}
          className="text-center font-semibold uppercase">
          {props.name}
        </Text>
      )}
    </View>
  );
};

export default Input;
