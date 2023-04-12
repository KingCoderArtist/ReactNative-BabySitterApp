import { StyleSheet } from 'react-native';
import Color from '../../../assets/color';

const Styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        backgroundColor: Color.PRIMARY_BACKGROUND_COLOR
    },
    heading: {
        fontSize: 15, fontFamily: 'Montserrat-SemiBold', color: Color.SUB_TITLE_TEXTCOLOR, marginTop: 40, marginLeft: 20
    },
    emailInput: {
        fontSize: 15, color: Color.PrimaryColor, height: 45, width: '100%', backgroundColor: '#fff',  paddingLeft:30, 
        fontFamily:'Montserrat-Regular', borderBottomWidth:0.5, borderColor:Color.PLACE_HOLDER_COLOR
    },
    forgotpassword:{
        fontSize:14, color: Color.LINK_COLOR, fontFamily:'Montserrat-Bold', textAlign:'center', marginVertical:30
    },
    LoginButton:{
        height:45, backgroundColor:Color.PrimaryColor, width:100, justifyContent:'center', alignItems:'center', alignSelf:'center'
    },
    ButtonText:{
        fontSize:15, color:Color.BUTTON_TEXT_COLOR, fontFamily:'Montserrat-Regular'
    }
})

export default Styles;