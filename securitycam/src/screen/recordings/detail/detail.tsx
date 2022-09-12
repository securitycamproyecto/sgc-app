import { View, Text, FlatList, StyleSheet } from 'react-native';
import HeaderMainContextHook from '../../../hooks/HeaderMainContextHook';
import ItemText from '../../../components/ItemText';
import { ISectionNotifications, data } from './IDetail';
import React, { useEffect } from 'react';

function Separator(){
  return (
    <View style={styles.separator}/>
  );
}

const SectionNotifications = (props:ISectionNotifications) => {
  return (
    <View>
      <View style={styles.headerSection}>
        <Text style={styles.headerText}>{props.mounth}</Text>
      </View>
      <FlatList
        ItemSeparatorComponent={() => <Separator/>}
        data={props.notifications}
        renderItem={({item}) =>
          <ItemText
            date={item.date}
            text={item.text}
            type={item.type}
            key={item.key}
            onPress={() => props.navigation.navigate('DetailVideoRecording', {title: item.date, ...item})}
          />
        }
      />
    </View>
  );
};

export default function Detail(props:any) {
  HeaderMainContextHook({headerShown: false});

  useEffect(() => {
    props.navigation.setOptions({title: props.route?.params.title || 'Loading...'});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.route?.params.title]);

  return (
    <View style={styles.container}>
      <FlatList
        ItemSeparatorComponent={() => <Separator/>}
        data={data}
        renderItem={({item}) =>
          <SectionNotifications
            mounth={item.mounth}
            notifications={item.notifications}
            navigation={props.navigation}
            key={item.mounth}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 25,
    paddingVertical: 30
  },
  separator: {
    marginVertical: 10
  },
  headerSection: {
    height: 40,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    justifyContent: 'center'
  },
  headerText: {
    color: 'black',
    fontWeight: '600'
  }
});
