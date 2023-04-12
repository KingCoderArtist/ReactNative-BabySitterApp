import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useState} from 'react';
import Home from '@Screen/Home';
import Settings from '@Screen/Setting/Setting';
import Profile from '@Screen/Profile';
import Header from '@Component/TabHeader';
import {
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const Tab = createBottomTabNavigator();
let TabBar = (props, onRouteChange) => {
  let icons = ['book', 'account', 'settings'];
  return (
    <View
      style={{
        backgroundColor: '#2d6eab',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        elevation: 10,
        marginHorizontal: 10,
        marginBottom: 10,
        borderRadius: 5,
        overflow: 'hidden',
      }}>
      {props.state.routes.map((d, i) => {
        return (
          <TouchableOpacity
            key={i}
            onPress={() => {
              onRouteChange(d.name);
              props.navigation.jumpTo(d.name);
            }}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 5,
              width:
                (Dimensions.get('window').width - 20) /
                props.state.routes.length,
              height: 60,
            }}>
            <Icon
              name={icons[i]}
              size={24}
              color={props.state.index == i ? '#fff' : '#000'}
            />
            {/* {props.state.index == i && (
              <Text style={{fontSize: 16, color: '#fff', marginTop: 5}}>
                {d.name}
              </Text>
            )} */}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
const BottomTabBar = () => {
  let [routeName, setRouteName] = useState('Bookings');
  let onRouteChange = (routes) => {
    console.log(routes);
    setRouteName(routes);
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar backgroundColor="#2d6eab" barStyle="light-content" />
      <Header
        title={routeName}
        rightComp={
          routeName == 'Profile' ? (
            <Icon name="account-edit" size={28} color="#fff" />
          ) : routeName == 'Bookings' ? (
            <Icon name="history" size={28} color="#fff" />
          ) : null
        }
      />
      <Tab.Navigator tabBar={(props) => TabBar(props, onRouteChange)}>
        <Tab.Screen name="Bookings" component={Home} />
        <Tab.Screen name="Profile" component={Profile} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};
export default BottomTabBar;
