import React from 'react';
import {View, Text} from 'react-native';
import Color from '@Asset/color';
import NavigationService from '@Service/Navigation';
import LinearGradient from 'react-native-linear-gradient';
//const { width, height } = Dimensions.get('window');
import CompanyForm from './CompanyForm';
import ParentForm from './ParentForm';
import SitterForm from './SitterForm';
import Styles from '@Screen/SignUp/Style';
import {widthPercentageToDP, heightPercentageToDP} from '@Theme/Responsive';

const RegistrForm = ({route, navigation}) => {
  const navigateFor = route.params.navigateFrom;

  return (
    <View
      style={{
        flex: 1,
      }}>
      {navigateFor === 'parent' && <ParentForm navigation={navigation} />}
      {navigateFor === 'company' && <CompanyForm navigation={navigation} />}
      {navigateFor === 'sitter' && <SitterForm navigation={navigation} />}
    </View>
  );
};

export default RegistrForm;
