import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import Color from '../../../assets/color/index';
import DateTimePicker from '@react-native-community/datetimepicker';
import Header from '../../Component/TabHeader/index';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from '../../Component/Spinner/Spinner';
import { Common_Get } from '../../Component/Helper/Helper';
import { hLog } from '../../Library/helper';

const BookSitter = ({ navigation, route }) => {
  const [Data, SetData] = useState({
    StartDatePicker: false,
    StartDateTime: '',
    EndDatePicker: false,
    EndDateTime: '',
  });
  const [Address, SetAddress] = useState([]);
  const [IsLoading, SetIsLoading] = useState(true);
  const [SelectedAddress, SetSelectedAddress] = useState('');

  const SetStartTime = (date) => {
    console.log(date);
    let day = date.toString().substring(0, 3);

    let monthDate = date.toString().substring(4, 10);

    let hourMinute = date.toString().substring(16, 21);

    let AmPm = 'AM';

    let finalDate = day + ', ' + monthDate + ', ' + hourMinute + ' ' + AmPm;

    SetData({
      ...Data,
      StartDateTime: finalDate,
      StartDatePicker: false,
    });
  };

  const SetEndTime = (date) => {
    let day = date.toString().substring(0, 3);

    let monthDate = date.toString().substring(4, 10);

    let hourMinute = date.toString().substring(16, 21);

    let AmPm = 'AM';

    let finalDate = day + ', ' + monthDate + ', ' + hourMinute + ' ' + AmPm;

    SetData({
      ...Data,
      EndDateTime: finalDate,
      EndDatePicker: false,
    });
  };

  const DefaultStartEndTime = (date) => {
    let day = date.toString().substring(0, 3);

    let monthDate = date.toString().substring(4, 10);

    let hourMinute = date.toString().substring(16, 21);

    let AmPm = 'AM';

    let finalDate = day + ', ' + monthDate + ', ' + hourMinute + ' ' + AmPm;

    SetData({
      ...Data,
      StartDateTime: finalDate,
      EndDateTime: finalDate,
    });
  };

  useEffect(() => {
    let date = new Date();
    DefaultStartEndTime(date);
    const unsubscribe = navigation.addListener('focus', () => {
      GetLocation();
    });
    return unsubscribe;
  }, []);


  const GetLocation = () => {
    Common_Get('api/user/getparent/location')
      .then(data => data.json())
      .then(res => {
        console.log(res)
        if (res.status === 200) {
          SetIsLoading(false)
          SetAddress(res.users.address)
          SetSelectedAddress(res.users.address[0])
        }
        else {
          SetIsLoading(false)
          alert(res.message)
        }
      })
      .catch(e => {
        console.log(e)
        SetIsLoading(false)
        alert('Something went wrong...!')
      })
  }

  const onNext = () => {
    global.bookInfo = {
      dateInfo: Data,
      address: SelectedAddress
    }
    hLog(global.bookInfo);
    navigation.navigate('BookSitterContinued');
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        title={'Book a Sitter'}
        rightComp={null}
        leftComp={<Icon name="arrow-left" size={20} color="white" />}
        onPressLeft={() => navigation.pop()}
      />
      {IsLoading ? (
        <Spinner />
      ) : (
          <View style={{ flex: 1, paddingTop: 20 }}>
            <TouchableOpacity
              onPress={() =>
                SetData({ ...Data, StartDatePicker: !Data.StartDatePicker })
              }
              style={{
                height: 45,
                width: '100%',
                backgroundColor: 'white',
                paddingHorizontal: 20,
                borderBottomWidth: 1,
                borderColor: 'rgba(0,0,0,0.125)',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontSize: 13,
                  color: 'black',
                  fontFamily: 'Montserrat-SemiBold',
                }}>
                Start
            </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: Color.PrimaryColor,
                  fontFamily: 'Montserrat-SemiBold',
                }}>
                {Data.StartDateTime}
              </Text>
            </TouchableOpacity>
            {Data.StartDatePicker ? (
              <View style={{ width: '100%' }}>
                <DateTimePicker
                  value={new Date()}
                  mode="datetime"
                  is24Hour={false}
                  display="default"
                  onChange={(event, date) => SetStartTime(date)}
                  minimumDate={new Date()}
                />
              </View>
            ) : null}

            <TouchableOpacity
              onPress={() =>
                SetData({ ...Data, EndDatePicker: !Data.EndDatePicker })
              }
              style={{
                height: 45,
                width: '100%',
                backgroundColor: 'white',
                paddingHorizontal: 20,
                borderBottomWidth: 1,
                borderColor: 'rgba(0,0,0,0.125)',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontSize: 13,
                  color: 'black',
                  fontFamily: 'Montserrat-SemiBold',
                }}>
                End
            </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: Color.PrimaryColor,
                  fontFamily: 'Montserrat-SemiBold',
                }}>
                {Data.EndDateTime}
              </Text>
            </TouchableOpacity>
            {Data.EndDatePicker ? (
              <View style={{ width: '100%' }}>
                <DateTimePicker
                  value={new Date()}
                  mode="datetime"
                  is24Hour={false}
                  display="default"
                  onChange={(event, date) => SetEndTime(date)}
                  minimumDate={new Date()}
                />
              </View>
            ) : null}

            <View
              style={{
                height: 45,
                width: '100%',
                backgroundColor: Color.PrimaryColor,
                marginTop: 40,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 15,
                  color: 'white',
                  fontFamily: 'Montserrat-SemiBold',
                }}>
                Location
            </Text>
            </View>

            <FlatList
              data={Address}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => {
                return <TouchableOpacity
                onPress={()=>SetSelectedAddress(item)}
                  style={{
                    paddingVertical: 10,
                    borderBottomWidth: 1,
                    borderColor: 'rgba(0,0,0,0.125)',
                    width: '100%',
                    backgroundColor: 'white',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: 20,
                  }}>
                  <View style={{ width: '90%' }}>
                    {
                      index === 0
                        ?
                        <Text
                          style={{
                            fontSize: 18,
                            color: 'black',
                            fontFamily: 'Montserrat-SemiBold',
                          }}>
                          Home</Text>
                        :
                        null}
                    <Text
                      ellipsizeMode='tail'
                      numberOfLines={1}
                      style={{
                        fontSize: 13,
                        color: 'black',
                        fontFamily: 'Montserrat-SemiBold',
                      }}>
                      {item.address + ', ' + item.city + ', ' + item.state + ', ' + item.zip}
                    </Text>
                  </View>
                  {
                    item.address === SelectedAddress.address
                      ?
                      <View style={{ width: '10%', justifyContent: 'center', alignItems: 'center', }}>
                        <Icon name="check" size={15} color={Color.PrimaryColor} />
                      </View>
                      :
                      null
                  }
                </TouchableOpacity>
              }}
            />

            <TouchableOpacity
              onPress={() => navigation.navigate('AddLocation')}
              style={{
                height: 45,
                borderBottomWidth: 1,
                borderColor: 'rgba(0,0,0,0.125)',
                width: '100%',
                backgroundColor: 'white',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 20,
              }}>
              <View>
                <Text
                  style={{
                    fontSize: 16,
                    color: 'black',
                    fontFamily: 'Montserrat-SemiBold',
                  }}>
                  Add Location...
              </Text>
              </View>
              <Icon name="chevron-right" size={15} color={'rgba(0,0,0,0.2)'} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onNext}
              style={{
                height: 45,
                width: 100,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: Color.PrimaryColor,
                alignSelf: 'center',
                marginTop: 50,
                borderRadius: 25,
              }}>
              <Text
                style={{
                  fontSize: 15,
                  color: 'white',
                  fontFamily: 'Montserrat-Medium',
                }}>
                Next
            </Text>
            </TouchableOpacity>
          </View>
        )}
    </SafeAreaView>
  );
};

export default BookSitter;
