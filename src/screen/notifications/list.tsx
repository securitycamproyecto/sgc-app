import { View, StyleSheet, FlatList } from 'react-native';
import React from 'react';
import ItemText from '../../components/ItemText';
import { SettingContext } from '../../context/SettingContext';
import { useIsFocused } from "@react-navigation/native";
import services from '../../services/api';
import moment from 'moment';

// interface IData {
//   text: string;
//   date: string;
//   type: 'normal' | 'danger' | 'caution';
//   key: number;
// }

// const data: IData[] = [
//   // {date: 'Hoy 08:31 AM', text: 'Se identificó a CARLOS SANTANA (95%) en la zona SALA', type: 'normal', key: 1},
//   // {date: 'Hoy 05:01 AM', text: 'Se identificó a ANA LAURENS (95%) en la zona COCHERA', type: 'normal', key: 2},
//   // {date: 'Hace 2 días', text: 'Se identificó a SUJETO PELIGROSO 1 (80%) en la zona SALA', type: 'danger', key: 3},
//   // {date: 'Hace 4 días', text: 'Sujeto no conocido, sex FEMALE, age 18', type: 'caution', key: 4}
// ];

function Separator(){
  return (
    <View style={styles.separator}/>
  );
}

export default function Notifications(props: any) {
  const { setSettings, userId } = React.useContext(SettingContext);
  const [data, setData] = React.useState<any>([]);
  const isFocused = useIsFocused();

  const loadNotifications = async () => {
    const result = await services.getNotifications(userId || '');
    let formattedData = result.data.Items.map((x: any) => {
      return {
        id: x.id.S,
        userId: x.userId.S,
        type: x.type.S,
        body: x.body.S,
        clientId: x.clientId.S,
        date: x.date.S,
        recordId: x.recordId?.S || 'none'
      }
    });
    formattedData = formattedData.sort((x: any, y: any) => new Date(y.date).getTime() - new Date(x.date).getTime());
    setData(formattedData);
  }

  React.useEffect(() => {
    if (isFocused) {
      loadNotifications();
      setSettings({
        headerTitle: 'Notificaciones',
        headerComponent: () => null,
        headerShown: true
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <FlatList
        ItemSeparatorComponent={() => <Separator/>}
        data={data}
        renderItem={({item}) => {
          const date = moment(item.date).format('DD/MM/YYYY h:mm:ss a')
          return (<ItemText
            date={date}
            text={item.body}
            type={item.type}
            key={item.id}
            onPress={() => props.navigation.navigate('Recordings', {screen: 'DetailVideoRecording', params: {title: date, ...item}, initial: false})}
          />)
        }}
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
  }
});
