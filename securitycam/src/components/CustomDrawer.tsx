import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Auth } from 'aws-amplify';

const signOut = async () => {
  try {
    await Auth.signOut();
  } catch (error) {
    console.log('error signing out: ', error);
  }
};

const CustomDrawer = (props:any) => {
  return (
    <View style={styles.view}>
      <DrawerContentScrollView {...props}>
        <View style={styles.contentProfile}>
          <Image source={require('./../assets/profile.jpg')} style={styles.profileImage} />
          <Text style={styles.textTitle}>Security IA</Text>
          <Text style={styles.textDescription}>Monitoreo para el hogar</Text>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View style={stylesBottom.view}>
        <TouchableOpacity onPress={signOut}>
          <View style={stylesBottom.itemList}>
            <Ionicons name="exit-outline" size={22} style={stylesBottom.itemIcon}/>
            <Text style={stylesBottom.itemText}>
              Cerrar sesión
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1
  },
  contentProfile: {
    backgroundColor: '#ff9900',
    marginTop: -4,
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20
  },
  profileImage: {
    height: 100,
    width: 100,
    borderRadius: 50
  },
  textTitle: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '900',
    color: '#fff'
  },
  textDescription: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff'
  }
});

const stylesBottom = StyleSheet.create({
  view: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc'
  },
  itemList: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemIcon: {
    color: '#333'
  },
  itemText: {
    fontSize: 15,
    fontFamily: 'Roboto-Medium',
    marginLeft: 5,
    color: '#333'
  }
});

export default CustomDrawer;
