import DateTimePicker from '@react-native-community/datetimepicker';
import { View } from 'react-native';
import React from 'react';

interface IDatePicker {
  onChange: (value:number | undefined) => void | any;
}

export default function DatePicker(props:IDatePicker) {
  return (
    <View>
        <DateTimePicker
          value={new Date()}
          display="default"
          is24Hour={true}
          mode="date"
          testID="dateTimePicker"
          onChange={(value) => value.type === "set" ? props.onChange(value.nativeEvent.timestamp) : null}
        />
    </View>
  );
}
