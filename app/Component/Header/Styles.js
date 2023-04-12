import {StyleSheet, Platform} from 'react-native';
import Color from '../../../assets/color';

const Styles = StyleSheet.create({
    MainContainer:{
        height:Platform.OS === 'ios' ? 85 : 50, backgroundColor:Color.PrimaryColor, flexDirection:'row',
        paddingHorizontal:20, alignItems:'center', justifyContent:'space-between', paddingTop:Platform.OS === 'ios' ? 35 : 0
    }
})

export default Styles;