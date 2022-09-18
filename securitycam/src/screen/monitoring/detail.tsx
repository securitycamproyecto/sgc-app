/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import HeaderMainContextHook from '../../hooks/HeaderMainContextHook';

const MonitoringDetail = (props: any) => {
    HeaderMainContextHook({headerShown: false});

    React.useEffect(() => {
        props.navigation.setOptions({title: props.route?.params.title || 'Loading...'});
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.route?.params.title]);

    return (
        <View style={{flex: 1, backgroundColor: '#000', paddingVertical: 20}}>
        </View>
    );
}

const styles = StyleSheet.create({
});

export default MonitoringDetail;
