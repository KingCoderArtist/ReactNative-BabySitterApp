import React, {useState} from 'react';
import {TextInput, View, FlatList, TouchableOpacity} from 'react-native';
import Header from '@Component/TabHeader';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ChatBubble from '../../Component/ChatBubble';
import Color from '../../../assets/color';

const ChatScreen = ({navigation}) => {
  let [data, setData] = useState([
    {
      id: 0,
      name: 'sitter',
      msg:
        'Eiusmod exercitation labore dolore non proident quis eiusmod nostrud laboris voluptate qui ullamco commodo.',
    },
    {
      id: 0,
      name: 'me',
      msg:
        'Officia labore qui incididunt ad commodo irure nulla aliqua et cupidatat et eiusmod.',
    },
  ]);
  return (
    <View style={{flex: 1}}>
      <Header
        onPressLeft={() => {
          navigation.pop();
        }}
        leftComp={<Icon name="arrow-left" size={20} color="#fff" />}
        title={'Chat'}
        rightComp={<Icon name="user-tie" size={20} color="#fff" />}
      />
      <FlatList
        data={data}
        inverted
        contentContainerStyle={{
          paddingHorizontal: 10,
          paddingTop: 10,
        }}
        keyExtractor={(data, index) => index.toString()}
        renderItem={({item, index}) => {
          return <ChatBubble key={index} item={item} />;
        }}
      />
      <View
        style={{
          backgroundColor: Color.PrimaryColor,
          height: 60,
          alignItems: 'center',
          flexDirection: 'row',
          padding: 10,
        }}>
        <TextInput
          style={{
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,

            elevation: 2,
            backgroundColor: '#fff',
            flex: 1,
            borderRadius: 10,
            paddingHorizontal: 10,
            fontFamily: 'Montserrat-Medium',
          }}
          placeholder="Type Message..."
        />
        <TouchableOpacity
          activeOpacity={0.9}
          style={{
            width: 40,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: Color.PrimaryColorRGBA_08,
            marginLeft: 10,
            borderRadius: 20,
          }}>
          <Icon name="paper-plane" color="#fff" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatScreen;
