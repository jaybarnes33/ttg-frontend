import { Feather } from '@expo/vector-icons';
import { clsx } from 'clsx';
import React from 'react';
import { View, Text, TextInput, TextInputProps, TouchableOpacity, Keyboard } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const Input = (props: TextInputProps & { name?: string; border?: boolean; size?: number }) => {
  const [focus, setFocus] = React.useState(false);
  const [secure, setSecure] = React.useState(props.secureTextEntry || false);
  const inputRef = React.useRef<TextInput>(null);

  const handleBlur = () => {
    setFocus(false);
    Keyboard.dismiss();
  };

  return (
    <View style={{ marginVertical: verticalScale(8), gap: verticalScale(4) }}>
      <View
        className={clsx([
          'font-main w-full justify-center bg-blue-100 font-semibold',
          focus && 'border-[3.1px] border-teal-500',
          props.border && 'border-2 border-black',
        ])}>
        <TextInput
          {...props}
          ref={inputRef}
          style={{
            minHeight: verticalScale(48),
            paddingVertical: verticalScale(8),
            ...(props.style as object),
          }}
          className={clsx(['w-full bg-white', props.className])}
          placeholderTextColor="#bbb"
          secureTextEntry={secure}
          editable={props.editable}
          onFocus={() => setFocus(true)}
          onBlur={handleBlur}
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
