import { forwardRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

type ButtonProps = {
  title?: string;
} & TouchableOpacityProps;

export const Button = forwardRef<View, ButtonProps>(({ title, ...touchableProps }, ref) => {
  return (
    <TouchableOpacity ref={ref} {...touchableProps} style={[styles.button, touchableProps.style]}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#6366F1',
    borderRadius: scale(24),
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: moderateScale(16),
    shadowColor: '#000',
    shadowOffset: {
      height: verticalScale(2),
      width: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: scale(3.84),
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: moderateScale(16),
    fontWeight: '600',
    textAlign: 'center',
  },
});
