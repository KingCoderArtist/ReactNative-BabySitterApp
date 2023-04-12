import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Header from '../../Component/TabHeader/index';
import Color from '../../../assets/color/index';
import Icon from 'react-native-vector-icons/Feather';
import CheckBox from 'react-native-checkbox';
import Econ from 'react-native-vector-icons/FontAwesome5';
import { Common_Get } from '../../Component/Helper/Helper';
import Spinner from '../../Component/Spinner/Spinner';
import { hLog, hShowMessage } from '../../Library/helper';

const BookSitterContinued = ({ navigation, route }) => {
  const [CheckBoxData, SetCheckBoxData] = useState({
    caden: false,
    kody: false,
    petsOnly: false,
    houseOnly: false,
  });
  const [ChildData, SetChildData] = useState([]);
  const [IsLoading, SetIsLoading] = useState(true);
  const [PetOnlyChecked, SetPetOnlyChecked] = useState(false);
  const [HouseOnlyChecked, SetHouseOnlyChecked] = useState(false);

  let [selectedChild, setSeclectedChild] = useState([])

  let addChild = (item) => {
    setSeclectedChild([...selectedChild, { ...item, checked: true }])
  }
  let removeChild = (item) => {
    let remChild = selectedChild.map(d => {
      if (item.name == d.name) {
        return { ...d, checked: false }
      }
      return d
    })
    setSeclectedChild(remChild)
  }

  const onNext = () => {
    let childs = [];
    ChildData.forEach(child => {
      if(child.checked) {
        childs.push(child);
      }
    });

    if(childs.length == 0 && PetOnlyChecked == false && HouseOnlyChecked == false) {
      hShowMessage("You must select at least one choice.");
      return;
    }

    global.bookInfo.PetOnlyChecked = PetOnlyChecked;
    global.bookInfo.HouseOnlyChecked = HouseOnlyChecked;
    if(PetOnlyChecked || HouseOnlyChecked) {
      childs = [];
    }
    global.bookInfo.childs = childs;

    hLog(global.bookInfo);
    navigation.navigate('PreferredSitters');
  }


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      GetChild();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, []);

  const GetChild = () => {
    Common_Get('api/user/child')
      .then((data) => data.json())
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          let childs = res.response;
          for(let i = 0; i < childs.length; i++) {
            childs[i].checked = false;
          }
          SetChildData(childs);
          SetIsLoading(false);
        } else {
          SetIsLoading(false);
          alert(res.message);
        }
      })
      .catch((e) => {
        console.log(e);
        SetIsLoading(false);
        alert('Something went wrong...!');
      });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        title={'Book Sitter continued'}
        rightComp={null}
        leftComp={<Econ name="arrow-left" size={20} color="white" />}
        onPressLeft={() => navigation.pop()}
      />
      {IsLoading ? (
        <Spinner />
      ) : (
          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate('AddChild')}
              style={{
                height: 45,
                width: 220,
                backgroundColor: Color.PrimaryColor,
                borderRadius: 30,
                marginVertical: 30,
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name="plus" size={20} color="white" />
                <Text
                  style={{
                    fontSize: 15,
                    color: 'white',
                    marginLeft: 10,
                    fontFamily: 'Montserrat-Medium',
                  }}>
                  ADD Child/Pet
              </Text>
              </View>
            </TouchableOpacity>

            <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
              <FlatList
                data={ChildData}
                keyExtractor={(item, index) => index.toString()}
                ListFooterComponent={() => {
                  return <View>
                    <TouchableOpacity
                      style={{
                        height: 45,
                        paddingHorizontal: 20,
                        backgroundColor: 'white',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: 'black',
                          fontFamily: 'Montserrat-Medium',
                        }}>
                        {'PET ONLY'}
                      </Text>
                      {
                        !HouseOnlyChecked && (
                          <CheckBox
                            label=""
                            checked={PetOnlyChecked}
                            onChange={(checked) => SetPetOnlyChecked(!PetOnlyChecked)}
                          />
                        )
                      }
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        height: 45,
                        paddingHorizontal: 20,
                        backgroundColor: 'white',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: 'black',
                          fontFamily: 'Montserrat-Medium',
                        }}>
                        {'HOUSE ONLY'}
                      </Text>
                      {
                        !PetOnlyChecked && (
                          <CheckBox
                            label=""
                            checked={HouseOnlyChecked}
                            onChange={(checked) => SetHouseOnlyChecked(!HouseOnlyChecked)}
                          />
                        )
                      }

                    </TouchableOpacity>
                  </View>
                }}
                renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('AddChild', {
                          type: 'edit',
                          data: item,
                        })
                      }
                      style={{
                        height: 45,
                        paddingHorizontal: 20,
                        backgroundColor: 'white',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: 'black',
                          fontFamily: 'Montserrat-Medium',
                        }}>
                        {item.name}
                      </Text>
                      {
                        PetOnlyChecked || !HouseOnlyChecked && (
                          <CheckBox
                            label=""
                            checked={item.checked}
                            onChange={(checked) => {
                              ChildData[index].checked = !ChildData[index].checked;
                              if (item.checked) {
                                removeChild(item)
                              } else {
                                addChild(item)
                              }
                            }
                            }
                          />
                        )
                      }
                    </TouchableOpacity>
                  );
                }}
              />
              {/* 
                <View style={{ marginTop: 10, height: 45, paddingHorizontal: 20, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 16, color: 'black', fontFamily: 'Montserrat-Medium' }}>Kody</Text>
                    <CheckBox
                        label=''
                        checked={CheckBoxData.kody}
                        onChange={(checked) => SetCheckBoxData({ ...CheckBoxData, kody: !CheckBoxData.kody })}
                    />
                </View>

                <View style={{ marginTop: 10, height: 45, paddingHorizontal: 20, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 16, color: 'black', fontFamily: 'Montserrat-Medium' }}>PETS ONLY</Text>
                    <CheckBox
                        label=''
                        checked={CheckBoxData.petsOnly}
                        onChange={(checked) => SetCheckBoxData({ ...CheckBoxData, petsOnly: !CheckBoxData.petsOnly })}
                    />
                </View>

                <View style={{ marginTop: 10, height: 45, paddingHorizontal: 20, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 16, color: 'black', fontFamily: 'Montserrat-Medium' }}>HOUSE ONLY</Text>
                    <CheckBox
                        label=''
                        checked={CheckBoxData.houseOnly}
                        onChange={(checked) => SetCheckBoxData({ ...CheckBoxData, houseOnly: !CheckBoxData.houseOnly })}
                    />
                </View> */}
            </View>

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

export default BookSitterContinued;
