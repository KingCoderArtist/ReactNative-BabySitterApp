import React from 'react';
import {Text, View, TouchableOpacity, Dimensions} from 'react-native';

const TabHeader = ({
  leftComp = null,
  onPressLeft = () => {},
  rightComp = null,
  onPressRight = () => {},
  title = 'Home',
}) => (
  <View
    style={{
      height: 100,
      backgroundColor: '#2d6eab',
      borderRadius: 40,
      marginTop: -50,
      paddingTop: 50,
      overflow: 'hidden',
      elevation: 10,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
    }}>
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
      }}>
      {leftComp !== null && (
        <TouchableOpacity
          activeOpacity={0.9}
          style={{position: 'absolute', left: 30}}
          onPress={onPressLeft}>
          {leftComp}
        </TouchableOpacity>
      )}
      <Text
        style={{
          color: '#fff',
          fontWeight: 'bold',
          fontSize: 18,
          position: 'absolute',
          zIndex: -10,
          textAlign: 'center',
          width: Dimensions.get('window').width,
        }}>
        {title.toUpperCase()}
      </Text>
      {rightComp !== null && (
        <TouchableOpacity
          style={{position: 'absolute', right: 30}}
          onPress={onPressRight}>
          {rightComp}
        </TouchableOpacity>
      )}
    </View>
  </View>
);

export default TabHeader;
