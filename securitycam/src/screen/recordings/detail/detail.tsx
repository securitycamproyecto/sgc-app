import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useIsFocused } from "@react-navigation/native";
import HeaderMainContextHook from '../../../hooks/HeaderMainContextHook';
import ItemText from '../../../components/ItemText';
// import { ISectionNotifications, data } from './IDetail';
import React, { useEffect } from 'react';
import moment from 'moment';
import services from '../../../services/api';
import { SettingContext } from '../../../context/SettingContext';

function Separator(){
  return (
    <View style={styles.separator}/>
  );
}

const SectionNotifications = (props: any) => {
  return (
    <View>
      <View style={styles.headerSection}>
        <Text style={styles.headerText}>{props.month}</Text>
      </View>
      <FlatList
        ItemSeparatorComponent={() => <Separator/>}
        data={props.records}
        renderItem={({item}) => {
          const text = item.label === 'unknown' ? 'Se identifico a un sujeto desconocido' : 'Se identifico a ' + item.names + (item.similarity ? ' (' + item.similarity + '%)' : '');
          const date = moment(item.date).format('DD/MM/YYYY h:mm:ss a');
          return (
            <ItemText
              date={date}
              text={text}
              type={item.type}
              key={item.id}
              onPress={() => props.navigation.navigate('DetailVideoRecording', {title: date, ...item})}
            />
          )
        }}
      />
    </View>
  );
};

const Detail = (props: any) => {
  HeaderMainContextHook({headerShown: false});
  const isFocused = useIsFocused();
  const { clientId } = React.useContext(SettingContext);
  const [data, setData] = React.useState<any>([{month: 'Últimos 7 días', records: []}]);

  useEffect(() => {
    props.navigation.setOptions({title: props.route?.params.title || 'Loading...'});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.route?.params.title]);

  useEffect(() => {
    if (isFocused) {
      const load = async () => {
        const records = (await services.getRecords(clientId) as any).data as Array<any>;
        data[0].records = records.sort((x: any, y: any) => new Date(y.date).getTime() - new Date(x.date).getTime());
        setData([...data]);
      }
      load();
    }
  }, [isFocused])

  return (
    <View style={styles.container}>
      <FlatList
        ItemSeparatorComponent={() => <Separator/>}
        data={data}
        renderItem={({item}) =>
          <SectionNotifications
            month={item.month}
            records={item.records}
            navigation={props.navigation}
            key={item.month}
          />
        }
      />
    </View>
  );
}

export default Detail;

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
