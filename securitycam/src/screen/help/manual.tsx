import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import HeaderMainContextHook from '../../hooks/HeaderMainContextHook';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useIsFocused } from "@react-navigation/native";

const images: string[] = [
    'https://taktic.es/wp-content/uploads/2020/08/tendencias-tecnol%C3%B3gicas-2020.jpg',
    'https://crehana-blog.imgix.net/media/filer_public/16/f1/16f1e973-b521-426f-a4e5-42d713854078/tendencias-tecnologicas-2021.jpg'
];

function Carrousel(props:{navigation:any}) {
    const [position, setPosition] = React.useState(0);
    const isFocused = useIsFocused();

    React.useEffect(() => {
        if (isFocused){
            setPosition(0);
        }
    }, [isFocused]);

    const isLast:boolean = (images.length - 1) === position;
    const finishImage = () => props.navigation.goBack();
    return (
        <View style={styles.carrousel}>
            {
                position !== 0 && (
                <TouchableOpacity onPress={() => setPosition(position - 1)} style={styles.left}>
                    <Ionicons name="chevron-back-circle" size={50} color="#ff9900"/>
                </TouchableOpacity>
                )
            }
            <Image source={{uri: images[position]}} style={styles.image} />
            <TouchableOpacity onPress={() => isLast ? finishImage() : setPosition(position + 1)} style={styles.rigth}>
                <Ionicons name="chevron-forward-circle" size={50} color="#ff9900"/>
            </TouchableOpacity>
        </View>
    );
}

export default function Manual(props:any){
    HeaderMainContextHook({headerShown: false});
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.omitir} onPress={() => props.navigation.goBack()}>
            <Text style={styles.textOmitir}>Omitir</Text>
        </TouchableOpacity>
        <Carrousel navigation={props.navigation}/>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },
  omitir: {
    backgroundColor: '#ff9900',
    top: 10,
    right: 10,
    position: 'absolute',
    zIndex: 20,
    elevation: 1,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10
  },
  textOmitir: {
    color: '#fff',
    fontWeight: '600'
  },
  carrousel: {
    flex: 1,
    position: 'relative'
  },
  image: {
    height: '100%',
    width: '100%'
  },
  rigth: {
    position: 'absolute',
    top: '50%',
    right: 10
  },
  left: {
    position: 'absolute',
    top: '50%',
    left: 20,
    zIndex: 20,
    elevation: 1
  }
});
