import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';

interface IItemService {
  text: string;
  date: string;
  type: 'normal' | 'danger' | 'caution';
  onPress?: () => void;
}

const ItemText = (props:IItemService) => {
  return (
    <TouchableOpacity style={{...styles.container, ...styles.shadow}} onPress={props.onPress}>
      <View style={{...styleTypeText[props.type], ...styleTypeText.container}}>
        <Text style={styleTypeText.text}>{props.date}</Text>
      </View>
      <Text style={styles.text}>{props.text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eff1f2',
    minHeight: 80,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 25,
    borderRadius: 15
  },
  text: {
    color: '#333'
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4
  }
});

const styleTypeText = StyleSheet.create({
  container: {
    height: 25,
    width: 170,
    borderRadius: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginBottom: 5
  },
  normal: {
    backgroundColor: '#56c1fa'
  },
  caution: {
    backgroundColor: '#fbc77e'
  },
  danger: {
    backgroundColor: '#f58688'
  },
  text: {
    color: '#fff'
  }
});

export default ItemText;
