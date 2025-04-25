import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';

import Input from '~/components/Input';
import Logo from '~/components/Logo';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { navigate } = useRouter();

  const handleSignIn = () => {
    console.log('Sign in');
    navigate('/');
  };

  return (
    <SafeAreaView className="flex-1 bg-amber-200">
      <View className="flex-1 px-6  py-20">
        <View className="mb-8 items-center">
          <Text className="mb-2 text-center text-3xl font-semibold text-gray-700 ">Sign In</Text>
          <Logo />
        </View>

        <View className="gap-y-4">
          <View>
            <Text className="font-semibold text-gray-800">Username or Email</Text>
            <Input
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              className="rounded border border-neutral-300"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View>
            <Text className="font-semibold text-gray-800">Password</Text>
            <Input
              placeholder="Password"
              value={password}
              className="rounded border border-neutral-300"
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity className="rounded bg-indigo-600 p-4" onPress={handleSignIn}>
            <Text className="text-center font-semibold text-white">Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity className=" mx-auto w-48">
            <Text className="pt-1  text-center text-base font-semibold text-indigo-600 underline ">
              Forgot your Password?
            </Text>
          </TouchableOpacity>
        </View>
        <View className="mt-auto gap-y-3">
          <Text className="text-center text-base font-medium text-neutral-500">
            Don't have an account?
          </Text>
          <TouchableOpacity
            onPress={() => navigate('/signup')}
            className="mx-auto w-20  border-neutral-400">
            <Text className="text-center font-semibold text-indigo-600 underline">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
