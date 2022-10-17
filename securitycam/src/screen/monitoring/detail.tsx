/* eslint-disable react-native/no-inline-styles */
import moment from 'moment';
import * as React from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import Video from 'react-native-video';
import io from 'socket.io-client';
import { SettingContext } from '../../context/SettingContext';
import HeaderMainContextHook from '../../hooks/HeaderMainContextHook';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const MonitoringDetail = (props: any) => {
    HeaderMainContextHook({headerShown: false});
    const [messages, setMessages] = React.useState<Array<string>>([]);
    const { clientId } = React.useContext(SettingContext);
    const socketRef = React.useRef<any>();
    let playerDetail: Video | null = null;

    React.useEffect(() => {
        props.navigation.setOptions({title: props.route?.params.title || 'Loading...'});
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.route?.params.title]);

    React.useEffect(() => {
        socketRef.current = io('https://acme-socket.securitycamperu.com');
        socketRef.current.on(`message-${clientId}`, (args: any) => {
            if (messages.length > 9) {
                let temp = [...messages];
                temp.shift();
                temp.push(args);
                setMessages(temp);
            } else {
                setMessages([...messages, args]);
            }
            console.log('SOCKET: ', JSON.stringify(args));
        });
        return () => {
            socketRef.current.disconnect();
        };
    }, [messages])

    return (
        <View style={{flex: 1, backgroundColor: '#fff'}}>
            <Video
                // source={{uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}}
                source={{uri: props.route?.params.urlStream}}
                ref={ref => {
                    playerDetail = ref;
                }}
                resizeMode="stretch"
                // fullscreen={true}
                // fullscreenOrientation={'landscape'}
                style={styles.video}
            />
            <View style={styles.box}>
                {
                    messages.map((item, i) =>
                        <Text key={i} style={{color: '#fff', fontSize: 10, fontWeight: '800', paddingBottom: 5}}>
                            {moment().format('DD/MM/YYYY h:mm:ss a')}-{item}
                        </Text>
                    )
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    video: {
        flex : 1,
        top: 0,
        bottom: 0,
        right: 0,
        left : -screenWidth/2 ,
        width : screenHeight,
        transform: [{ rotate: "90deg" }]
    },
    box: {
        flex : 1,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        position: 'absolute',
        left : 50,
        width: 300,
        height: 350,
        maxHeight: 350,
        padding: 20,
        transform: [{ rotate: "90deg" }]
    }
});

export default MonitoringDetail;
