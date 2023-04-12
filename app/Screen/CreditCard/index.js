import React, { Component } from 'react';
import { View, Dimensions, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Form, Item, Input, Label, Icon, Thumbnail, Picker, CheckBox, Textarea, Left, Body, Right, Button } from 'native-base';
import Animated, { Easing, Transition, Transitioning } from 'react-native-reanimated';
import { TapGestureHandler, State, ScrollView } from 'react-native-gesture-handler';
import Styles from '@Screen/SignUp/Style'
import { widthPercentageToDP, heightPercentageToDP, } from '@Theme/Responsive';
//import Svg, { Image, Circle, ClipPath, Path } from 'react-native-svg';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Color from '@Asset/color';
import AnimateLoadingButton from '@Component/AnimatedButton'; 
import NavigationService from '@Service/Navigation';
import LinearGradient from 'react-native-linear-gradient';
import CreditCard from '@Component/CreditCardComponent';
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";
import { Txt18 } from '../../Control/common';

export default class extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
      return <Txt18>Good</Txt18>
    }
}