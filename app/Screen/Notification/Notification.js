import React from 'react';
import { View, Text, SafeAreaView, FlatList } from 'react-native';
import Header from '../../Component/TabHeader/index';
import Econ from 'react-native-vector-icons/FontAwesome5';
import NotificationList from '../../Component/NotificationList/NotificationList';

const Notification = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header
                title={'notifications'}
                leftComp={<Econ name='arrow-left' size={20} color='white' />}
                onPressLeft={() => navigation.pop()}
            />

            <View style={{ flex: 1 }}>
                <FlatList
                    contentContainerStyle={{paddingVertical:10}}
                    ItemSeparatorComponent={() => {
                        return <View style={{ height: 1, width: '100%', backgroundColor: 'rgba(0,0,0,0.125)' }}></View>
                    }}
                    data={[{ key: 'a' }, { key: 'b' }]}
                    renderItem={(data) => {
                        return <NotificationList data={data} />
                    }}
                />
            </View>
        </SafeAreaView>
    )
}

export default Notification;