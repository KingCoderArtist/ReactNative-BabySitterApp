import React from 'react';
import {View, Text, SafeAreaView, FlatList} from 'react-native';
import Header from '../../Component/TabHeader/index';
import Color from '../../../assets/color';
import Econ from 'react-native-vector-icons/FontAwesome5';
import SitterJobsList from '../../Component/SitterJobsList/SitterJobsList';

const SitterJobs = ({navigation}) => {
    return(
        <SafeAreaView style={{flex:1}}>
            <Header
                title={'sitter jobs'}
                leftComp={<Econ name='arrow-left' size={20} color='white' />}
                onPressLeft={() => navigation.pop()}
            />

            <View style={{flex:1}}>
                <FlatList 
                    data={[{key:'a'},{key:'b'}]}
                    contentContainerStyle={{paddingVertical:10}}
                    renderItem={(data)=>{
                        return <SitterJobsList data={data}/>
                    }}
                />
            </View>
        </SafeAreaView>
    )
}

export default SitterJobs;