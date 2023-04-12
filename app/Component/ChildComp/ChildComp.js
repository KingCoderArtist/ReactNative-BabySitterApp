import React, {useState, useEffect} from 'react';
import {Text, View, TextInput, TouchableOpacity} from 'react-native';
import moment from 'moment';
import Color from '../../../assets/color';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

const ChildComp = ({
  onChangeText = () => {},
  passDate = () => {},
  getValue = '',
  getDate = moment(new Date()).format('DD/MM/YYYY'),
  index,
  childrenLength,
  RemoveChildren = () => {},
}) => {
  let [date, setDate] = useState(new Date());
  let [showPicker, setShowPicker] = useState(false);
  useEffect(() => {
    passDate(moment(new Date()).format('DD/MM/YYYY'));
  }, []);

  const hideDatePicker = () => {
    setShowPicker(false);
  };

  const handleConfirm = (date) => {
    hideDatePicker();
    setDate(date);
    passDate(moment(date).format('DD/MM/YYYY'));
  };
  return (
    <View
      key={index}
      style={{
        marginTop: 10,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <TextInput
        placeholder="Name"
        returnKeyType="next"
        defaultValue={getValue}
        onChangeText={(text) => onChangeText(text)}
        style={{
          height: 40,
          borderRadius: 25,
          borderWidth: 1,
          borderColor: Color.PrimaryColor,
          paddingHorizontal: 10,
          width: '60%',
          fontFamily: 'Montserrat-Regular',
        }}
      />
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          setShowPicker(true);
        }}
        style={{
          height: 40,
          borderRadius: 25,
          borderWidth: 1,
          borderColor: Color.PrimaryColor,
          paddingHorizontal: 10,
          width: '28%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{fontFamily: 'Montserrat-Regular', fontSize: 11}}>
          {getDate.length ? getDate : moment(date).format('DD/MM/YYYY')}
        </Text>
      </TouchableOpacity>
      {/* <TextInput
      placeholder="Age"
      returnKeyType="done"
      ref={BirthdayInput}
      onSubmitEditing={() => {
        if (ValidateLastPage()) {
          SubmitData();
        }
      }}
      keyboardType="number-pad"
      defaultValue={item.birthday}
      onChangeText={(text) => (children[index].birthday = text)}
      style={{
        height: 40,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: Color.PrimaryColor,
        paddingHorizontal: 10,
        width: '25%',
      }}
    /> */}
      {childrenLength > 1 ? (
        <View
          style={{
            width: '10%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => RemoveChildren(index)}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'red',
              height: 25,
              width: 25,
              borderRadius: 15,
            }}>
            <FontAwesome name="times" size={15} color="white" />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{width: '10%'}}></View>
      )}
      <DateTimePickerModal
        isVisible={showPicker}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        date={date}
        maximumDate={new Date()}
      />
    </View>
  );
};

export default ChildComp;
