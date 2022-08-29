import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React from 'react';

interface IItemService {
  text: string;
  nameNavigate: string;
  params?: any;
}

const ItemList = (props:IItemService) => {
  const navigation = useNavigation<any>();

  return (
    <TouchableOpacity style={{...styles.container, ...styles.shadow}} onPress={() => navigation.navigate(props.nameNavigate, props.params)}>
      <View style={styles.icon}>
        <Image source={require('./../assets/old-movie-camera.png')} style={styles.image}/>
      </View>
      <Text style={styles.text}>{props.text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eff1f2',
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
    borderRadius: 15
  },
  icon: {
    backgroundColor: '#fabc3d',
    height: 60,
    width: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20
  },
  image: {
    height: 30,
    width: 30
  },
  text: {
    fontWeight: '800'
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

export default ItemList;
