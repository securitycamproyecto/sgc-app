import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import HeaderMainContextHook from '../../hooks/HeaderMainContextHook';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useIsFocused } from "@react-navigation/native";

const images: string[] = [
  'https://i.ibb.co/pjPyLBQ/p1gf2s3j88k9r15a8boe1qs41mac4-0.jpg',
  'https://i.ibb.co/vZR68Vp/p1gf2s3j88k9r15a8boe1qs41mac4-1.jpg',
  'https://i.ibb.co/0BpFFTT/p1gf2s3j88k9r15a8boe1qs41mac4-2.jpg',
  'https://i.ibb.co/31zs6xZ/p1gf2s3j88k9r15a8boe1qs41mac4-3.jpg',
  'https://i.ibb.co/wRBJKfB/p1gf2s3j88k9r15a8boe1qs41mac4-4.jpg',
  'https://i.ibb.co/hKLXpY9/p1gf2s3j88k9r15a8boe1qs41mac4-5.jpg',
  'https://i.ibb.co/mFMTTBB/p1gf2s3j88k9r15a8boe1qs41mac4-6.jpg',
  'https://i.ibb.co/4gLcxQW/p1gf2s3j88k9r15a8boe1qs41mac4-7.jpg',
  'https://i.ibb.co/Z2y6x7h/p1gf2s3j88k9r15a8boe1qs41mac4-8.jpg'
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
            {
              !isLast &&
              <TouchableOpacity onPress={() => setPosition(position + 1)} style={styles.rigth}>
                  <Ionicons name="chevron-forward-circle" size={50} color="#ff9900"/>
              </TouchableOpacity>
            }
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
