import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Switch,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Econ from 'react-native-vector-icons/FontAwesome5';
import Header from '../../Component/TabHeader/index';
import Color from '../../../assets/color';
import { hShowToast, hShowMessage, hLog } from '../../Library/helper';
import { Common_Post } from '../../Component/Helper/Helper';

const BookingNotes = ({ navigation }) => {
  const [Data, SetData] = useState({
    catSwitch: false,
    dogSwitch: false,
  });
  const [count, setCount] = useState(0);
  const [note, setNote] = useState('');

  const onLoad = async () => {
    if (global.bookInfo.PetOnlyChecked) {
      SetData({
        catSwitch: true,
        dogSwitch: true
      })
    }
  }


  const onBookSitter = () => {
    hShowMessage('Same Day Booking Fee of $5');

    global.bookInfo.hasCat = Data.catSwitch;
    global.bookInfo.hasDog = Data.dogSwitch;
    global.bookInfo.note = note;

    let param = {
      name: global.userData.fullName,
      userId: global.userData._id,
      startDate: global.bookInfo.dateInfo.StartDateTime,
      endDate: global.bookInfo.dateInfo.EndDateTime,
      registerLocation: JSON.stringify(global.bookInfo.address),
      childs: global.bookInfo.childs,
      bookingNote: note,
      startTime: "1",
      endTime: "1"
    };

    hLog(param)

    Common_Post('api/user/booking', param)
      .then(data => data.json())
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          RNToasty.Success({
            title: res.message,
            fontFamily: 'Montserrat-Medium',
          });
        }
        else {
        }
      })
      .catch(e => {
        console.log(e);
        alert('Something went wrong...!')
      })
      
     navigation.popToTop();
     navigation.replace('BottomTabs');
  }

  useEffect(() => {
    if (count == 0) {
      onLoad();
      setCount(count + 1);
    }

    return () => {
    }
  })

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        title={'notes'}
        rightComp={null}
        leftComp={<Econ name="arrow-left" size={20} color="white" />}
        onPressLeft={() => navigation.pop()}
      />

      <ScrollView>
        <View style={{ marginTop: 50, paddingHorizontal: 20 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Switch
              trackColor={{
                false: 'rgba(0,0,0,0.115)',
                true: 'rgba(0,0,0,0.115)',
              }}
              thumbColor={Data.catSwitch ? Color.PrimaryColor : '#f4f3f4'}
              ios_backgroundColor="rgba(0,0,0,0.115)"
              onValueChange={(val) => {
                if (Data.dogSwitch == false && global.bookInfo.PetOnlyChecked) {
                  hShowToast("You must select at least one Animal");
                  return;
                }
                SetData({ ...Data, catSwitch: !Data.catSwitch });
              }}
              value={Data.catSwitch}
            />
            <Text
              style={{
                fontSize: 15,
                color: 'black',
                fontFamily: 'Montserrat-Medium',
                marginLeft: 50,
              }}>
              Cats
            </Text>
          </View>

          <View
            style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center' }}>
            <Switch
              trackColor={{
                false: 'rgba(0,0,0,0.115)',
                true: 'rgba(0,0,0,0.115)',
              }}
              thumbColor={Data.dogSwitch ? Color.PrimaryColor : '#f4f3f4'}
              ios_backgroundColor="rgba(0,0,0,0.115)"
              onValueChange={(val) => {
                if (Data.catSwitch == false && global.bookInfo.PetOnlyChecked) {
                  hShowToast("You must select at least one Animal");
                  return;
                }
                SetData({ ...Data, dogSwitch: !Data.dogSwitch });
              }}
              value={Data.dogSwitch}
            />
            <Text
              style={{
                fontSize: 15,
                color: 'black',
                fontFamily: 'Montserrat-Medium',
                marginLeft: 50,
              }}>
              Dogs
            </Text>
          </View>

          <TextInput
            multiline
            placeholder="Special notes for this job..."
            value={note}
            onChangeText={setNote}
            style={{
              borderRadius: 8,
              padding: 15,
              height: 90,
              width: '100%',
              marginTop: 50,
              textAlignVertical: 'top',
              backgroundColor: 'white',
              fontFamily: 'Montserrat-Medium',
              fontSize: 15,
              color: Color.PrimaryColor,
            }}></TextInput>
        </View>

        <TouchableOpacity
          onPress={onBookSitter}
          style={{
            height: 45,
            width: 150,
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
            Book Sitter
          </Text>
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 13,
            color: 'black',
            fontFamily: 'Montserrat-Medium',
            textAlign: 'center',
            marginTop: 30,
          }}>
          *Please allow 24hrs for cancellation
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BookingNotes;
