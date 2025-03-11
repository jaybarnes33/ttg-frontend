import { Text, TouchableOpacity } from 'react-native';

export const BackButton = ({ onPress }: { onPress: () => void }) => {
  return (
    <TouchableOpacity className="my-4 px-4" onPress={onPress}>
      <Text className=" dark:text-white">&larr; Back</Text>
    </TouchableOpacity>
  );
};
