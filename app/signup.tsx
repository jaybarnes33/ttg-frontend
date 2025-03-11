import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Input from '~/components/Input';

const Signup = () => {
  const { navigate } = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-white px-4">
      <View className="items-center gap-y-2">
        <Text className="text-center text-base">Welcome</Text>
        <Text className="text-center text-3xl font-semibold capitalize">Create an Account</Text>
      </View>

      <View className="gap-y-4 py-10">
        <View>
          <Text className="font-semibold text-gray-800">Email Address</Text>
          <Input className="rounded border-2 border-neutral-400" />
        </View>
        <View>
          <Text className="font-semibold text-gray-800">Username</Text>
          <Input className="rounded border-2 border-neutral-400" />
        </View>
        <View>
          <Text className="font-semibold text-gray-800">Password</Text>
          <Input className="rounded border-2 border-neutral-400" />
        </View>
        <View>
          <Text className="font-semibold text-gray-800">Re-type Password</Text>
          <Input className="rounded border-2 border-neutral-400" />
        </View>
      </View>

      <View>
        <TouchableOpacity className="rounded bg-indigo-600 px-4 py-3">
          <Text className="text-center text-xl font-semibold text-white">Submit</Text>
        </TouchableOpacity>
      </View>

      <View className="mt-auto gap-y-3">
        <Text className="text-center text-base font-medium text-neutral-500">
          Already have an account?
        </Text>
        <TouchableOpacity
          onPress={() => navigate('/')}
          className="mx-auto w-20  border-neutral-400">
          <Text className="text-center font-semibold text-indigo-600 underline">Sign in</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Signup;
