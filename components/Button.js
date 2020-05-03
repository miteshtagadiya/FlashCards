import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function TextButton({ children, onPress, style = {} }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.reset, style]}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  reset: {
    color: 'white',
    backgroundColor: 'purple',
    padding: 10,
    textAlign: 'center',
    borderRadius: 10,
    fontWeight: 'bold',
    borderWidth: 3,
    borderColor: 'purple'
  },
});
