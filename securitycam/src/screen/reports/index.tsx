import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import General from './general';
import Device from './device';
import { StyleSheet, Text, View } from 'react-native';

const Tab = createBottomTabNavigator();
const SIZE_ICONS = 22;
const COLOR_FOCUSED = '#ff9900';
const COLOR_DEFAULT = '#748c94';

function StackReports() {
  return (
    <Tab.Navigator screenOptions={{
        header: () => null,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 25,
          left: 20,
          right: 20,
          backgroundColor: '#fff',
          borderRadius: 15,
          height: 90,
          ...styles.shadow
        }
      }}
    >
      <Tab.Screen name="General" component={General}
        options={{
          tabBarIcon: ({focused}) =>
            <View style={styles.itemTab}>
              <Ionicons name="bar-chart-outline" size={SIZE_ICONS} color={focused ? COLOR_FOCUSED : COLOR_DEFAULT}/>
              <Text style={{color: focused ? COLOR_FOCUSED : COLOR_DEFAULT}}> General </Text>
            </View>
        }}
      />
      <Tab.Screen name="Device" component={Device}
        options={{
          tabBarIcon: ({focused}) =>
            <View style={styles.itemTab}>
              <Ionicons name="phone-landscape-outline" size={SIZE_ICONS} color={focused ? COLOR_FOCUSED : COLOR_DEFAULT}/>
              <Text style={{color: focused ? COLOR_FOCUSED : COLOR_DEFAULT}}> Dispositivos </Text>
            </View>
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.5,
    elevation: 5
  },
  itemTab: {
    alignItems: 'center',
    justifyContent: 'center',
    top: 3
  }
});

export default StackReports;
