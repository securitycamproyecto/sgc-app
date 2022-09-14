/* eslint-disable react-native/no-inline-styles */
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useIsFocused } from "@react-navigation/native";
import { Auth } from 'aws-amplify';

const signOut = async () => {
  try {
    await Auth.signOut();
  } catch (error) {
    console.log('error signing out: ', error);
  }
};

const SIZE_ICONS = 22;
interface ITemplateListWithChildren {
  icon: string;
  title: string;
  state: any;
  navigation: any;
  list: {
    title: string;
    icon: string;
    name: string;
    component: string;
    params: any;
  }[];
}

function TemplateListWithChildren(props: ITemplateListWithChildren){
  const [showList, setShowList] = useState(false);
  const selected = props.state.routes[props.state.index];
  return (
    <View style={{...stylesListWithChildren.view, marginBottom: showList ? -12 : 0}}>
      <TouchableOpacity onPress={() => setShowList(!showList)}>
          <View style={{...stylesBottom.itemList, marginBottom: showList ? 5 : 0}}>
            <Ionicons name={props.icon} size={SIZE_ICONS} style={stylesBottom.itemIcon}/>
            <Text style={{...stylesBottom.itemText, ...stylesListWithChildren.text}}>
              {props.title}
            </Text>
            <Ionicons size={18} name={showList ? 'chevron-up-outline' : 'chevron-down-outline'} style={stylesListWithChildren.iconLeft}/>
          </View>
          {
            showList &&
              props.list?.map((item, index) =>
                <DrawerItem
                  key={index}
                  label={item.title}
                  focused={selected.name === item.name && selected.params.key === item.params.key}
                  onPress={() => props.navigation.navigate(item.name, item.params)}
                  icon={({color}) => <Ionicons size={SIZE_ICONS} name={item.icon} color={color}/>}
                  activeTintColor="#fff"
                  activeBackgroundColor="#ff9900"
                  inactiveTintColor="#333"
                  style={{marginLeft: 0, marginVertical: 5, padding: 0}}
                  labelStyle={{marginLeft: -8}}
                />
              )
          }
        </TouchableOpacity>
    </View>
  );
}

const ViewHelp = (props: {navigation:any}) => {
  const [showOptions, setShowOptions] = useState(false);
  const isFocused = useIsFocused();

    React.useEffect(() => {
        if (isFocused){
          setShowOptions(false);
        }
    }, [isFocused]);

  const navigate = (view:string) => {
    setShowOptions(false);
    props.navigation.navigate(view);
  };

  return (
    <View>
      {
        showOptions && (
          <>
            <View style={styleHelp.containerOptions}>
              <TouchableOpacity style={{...styleHelp.itemOption, ...styleHelp.itemStart}} onPress={() => navigate('Manual')}>
                <Text style={{color: '#fff'}}>Manual</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{...styleHelp.itemOption, ...styleHelp.itemEnd}} onPress={() => navigate('Soporte')}>
                <Text style={{color: '#fff'}}>Soporte</Text>
              </TouchableOpacity>
            </View>
            <View style={styleHelp.triangle}/>
          </>
        )
      }
      <TouchableOpacity style={styleHelp.containterHelp} onPress={() => setShowOptions(!showOptions)}>
        <Ionicons name="help-circle" size={35} color="#333" style={styleHelp.iconHelp}/>
        <Text>Ayuda</Text>
      </TouchableOpacity>
    </View>
  );
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
        {
          props.drawerMenuItems?.map((item:any, index:number) => (
            !item.ocult && (
              item.list ? (
                <TemplateListWithChildren
                  icon={item.icon}
                  title={item.title}
                  key={index}
                  state={props.state}
                  navigation={props.navigation}
                  list={item.list}
                />
              ) : (
                <DrawerItem
                  key={index}
                  label={item.title}
                  focused={props.state.routes[props.state.index].name === item.name}
                  onPress={() => props.navigation.navigate(item.name)}
                  icon={({color}) => <Ionicons size={SIZE_ICONS} name={item.icon} color={color}/>}
                  activeTintColor="#fff"
                  activeBackgroundColor="#ff9900"
                  inactiveTintColor="#333"
                  labelStyle={{fontWeight: 'normal', fontSize: 14}}
                />
              )
            )
          ))
        }
      </DrawerContentScrollView>
      <ViewHelp navigation={props.navigation}/>
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

const styleHelp = StyleSheet.create({
  containterHelp: {
    marginLeft: 'auto',
    paddingHorizontal: 15,
    paddingVertical: 8
  },
  iconHelp: {
    marginBottom: -8
  },
  containerOptions: {
    flexDirection: 'row',
    marginLeft: 'auto',
    paddingRight: 12,
    marginBottom: 0
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 10,
    borderRightWidth: 7,
    borderBottomWidth: 0,
    borderLeftWidth: 7,
    borderTopColor: '#ff9900',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
    marginLeft: 'auto',
    marginRight: 30,
    marginBottom: -10
  },
  itemOption: {
    backgroundColor: '#ff9900',
    paddingVertical: 7,
    paddingHorizontal: 15,
    borderColor: '#fff',
    borderWidth: 0.5
  },
  itemStart: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10
  },
  itemEnd: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10
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
    marginLeft: 32,
    color: '#333'
  }
});

const stylesListWithChildren = StyleSheet.create({
  view: {
    paddingVertical: 20,
    paddingLeft: 18,
    paddingRight: 20
  },
  text: {
    fontFamily: 'Roboto-Bold',
    fontSize: 14
  },
  iconLeft: {
    marginLeft: 'auto'
  }
});

export default CustomDrawer;
