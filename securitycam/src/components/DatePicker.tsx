import DateTimePicker from '@react-native-community/datetimepicker';
import { View, Text } from 'react-native';
import React from 'react';

export default function DatePicker() {
  return (
    <View>
        <Text>Holin't</Text>
        <DateTimePicker
          value={new Date()}
          display="default"
          is24Hour={true}
          mode="time"
          testID="dateTimePicker"
        />
    </View>
  );
}
