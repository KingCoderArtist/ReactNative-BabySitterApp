import React from 'react';
import {Text, View, Dimensions} from 'react-native';

const ChatBubble = ({item}) => (
  <View
    style={{
      alignItems: item.name == 'me' ? 'flex-end' : 'flex-start',
      paddingTop: 10,
    }}>
    <View
      style={{
        width: Dimensions.get('window').width - 100,
        backgroundColor: item.name == 'me' ? '#1c87ac' : '#164583',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        padding: 10,
        borderBottomRightRadius: item.name == 'me' ? 0 : 10,
        borderBottomLeftRadius: item.name == 'me' ? 10 : 0,
      }}>
      <Text
        style={{fontSize: 16, fontFamily: 'Montserrat-Medium', color: '#fff'}}>
        {item.msg}
      </Text>
    </View>
  </View>
);

export default ChatBubble;
