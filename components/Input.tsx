import { Feather } from '@expo/vector-icons';
import { clsx } from 'clsx';
import React from 'react';
import { View, Text, TextInput, TextInputProps, TouchableOpacity } from 'react-native';

const Input = (props: TextInputProps & { name?: string; border?: boolean }) => {
  const [focus, setFocus] = React.useState(false);
  const [secure, setSecure] = React.useState(props.secureTextEntry || false);
  const inputRef = React.useRef<TextInput>(null);
  return (
    <View className="my-2 gap-y-1">
      <View
        className={clsx([
          'font-main  h-14 w-full   justify-center  bg-blue-100 font-semibold ',
          focus && ' border-[3.1px] border-teal-500  ',
          props.multiline && 'h-[100px] py-2',
          props.border && 'border-2 border-black',
        ])}>
        <TextInput
          {...props}
          ref={inputRef}
          className={clsx([
            'font-main absolute h-full w-full flex-1 bg-white px-3  ',
            props.className,
          ])}
          placeholderTextColor="#bbb"
          secureTextEntry={secure}
          editable={props.editable}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        />
        {props.secureTextEntry && (
          <TouchableOpacity
            onPress={() => setSecure(!secure)}
            className="absolute right-0 h-full w-12 items-center justify-center">
            <Text className="text-gray-700 dark:text-neutral-50">
              <Feather name={secure ? 'eye' : 'eye-off'} size={20} />
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {props.name && (
        <Text className="text-center  text-lg font-semibold uppercase  ">{props.name}</Text>
      )}
    </View>
  );
};

export default Input;
