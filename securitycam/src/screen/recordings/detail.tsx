import { View, Text, FlatList, StyleSheet } from 'react-native';
import React from 'react';
import ItemText from '../../components/ItemText';

interface INotifications {
  text: string;
  date: string;
  type: 'normal' | 'danger' | 'caution';
  key: number;
}

interface IData {
  mounth: string;
  notifications: INotifications[];
}

const data:IData[] = [
  {
    mounth: 'Hoy',
    notifications: [
      {date: 'Hoy 08:31 AM', text: 'Se identificó a CARLOS SANTANA (95%) en la zona SALA', type: 'normal', key: 1},
      {date: 'Hoy 05:01 AM', text: 'Se identificó a ANA LAURENS (95%) en la zona COCHERA', type: 'normal', key: 2}
    ]
  },
  {
    mounth: 'Agosto',
    notifications: [
      {date: '12/08/2022', text: 'Se identificó a SUJETO PELIGROSO 1 (80%) en la zona SALA', type: 'danger', key: 3},
      {date: '06/08/2022', text: 'Sujeto no conocido, sex FEMALE, age 18', type: 'caution', key: 4}
    ]
  }
];

function Separator(){
  return (
    <View style={styles.separator}/>
  );
}

const SectionNotifications = (props:IData) => {

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
          />
        }
      />
    </View>
  );
};

export default function Detail() {
  return (
    <View style={styles.container}>
      <FlatList
        ItemSeparatorComponent={() => <Separator/>}
        data={data}
        renderItem={({item}) =>
          <SectionNotifications
            mounth={item.mounth}
            notifications={item.notifications}
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
