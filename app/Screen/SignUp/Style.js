import { Dimensions, StyleSheet } from 'react-native';
import Color from '@Asset/color';
const { width, height } = Dimensions.get('screen');
import { widthPercentageToDP, heightPercentageToDP } from '@Theme/Responsive';
export default {

  LoginLabel: {
    //marginTop:20,
    // fontFamily: 'Roboto-Bold',
    fontSize: 14,
    marginLeft: 7,
    color: 'rgba(237,56,51,1)'
  },
  InputView: {
    width: 260,
    height: 40,
    backgroundColor: 'white',
    marginTop: 20,
    borderRadius: 20,
    flexDirection: 'row',
    elevation: 2,
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
  },
  LoginContainer: {
    height: 550,
    width: 300,
    backgroundColor: 'white',
    alignSelf: 'center',
    padding: 20,
    elevation: 5,
    borderRadius: 8
  },
  error: {
    fontSize: 11,
    color: 'red',
    marginTop: 3,
    marginLeft: 10
  },
  keyboardAvoidView: {
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(100),
  },
  modalTitle: {
    fontSize: widthPercentageToDP(7),
    fontWeight: 'bold',
    color: '#fff',
    shadowColor: Color.PrimaryColorRGBA_08,
    shadowOpacity: 0.5,
    shadowOffset: {
      x: 1,
      y: 1,
    },
  },
  formModalheader: {
    width: widthPercentageToDP(90),
    // height: heightPercentageToDP(5),
    flexDirection: 'row',
    alignItems: 'center',
  },

  button: {
    backgroundColor: Color.PrimaryColor,
    height: heightPercentageToDP(7),
    width: widthPercentageToDP(70),
    marginTop: heightPercentageToDP(2),
    marginHorizontal: 20,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    shadowOffset: { x: 2, y: 2 },
    shadowColor: '#000',
    shadowOpacity: 0.2,
  },
  btnText: { fontSize: 20, fontWeight: 'bold', color: 'white' },
  textInput: {
    height: 50,
    borderRadius: 25,
    paddingLeft: 10,
    shadowOpacity: 0,
  },
  textInputContainer: {
    height: heightPercentageToDP(5.5),
    borderRadius: 25,
    marginVertical: widthPercentageToDP(3),
    marginHorizontal: widthPercentageToDP(5),
    borderColor: 'rgba(0,0,0,0.4)',
    borderWidth: 0.5,
    /* shadowColor:'#000',
        shadowOpacity:1,
        shadowOffset:{
          x:0,y:1
        }, */
    flexDirection: 'row',
    alignItems: 'center',
  },
  closeButton: {
    height: 40,
    width: 40,
    borderRadius: 20,
    position: 'absolute',
    top: -20,
    left: width / 2 - 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { x: 2, y: 2 },
    shadowColor: '#000',
    shadowOpacity: 0.2,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    ...StyleSheet.absoluteFill,
    zIndex: 1,
  },
  formModal: {
    // height: heightPercentageToDP(75),
    width: widthPercentageToDP(90),
    //borderRadius:20,
    zIndex: 1,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      x: 0.5,
      y: 1,
    },
    shadowOpacity: 0.6,
    alignItems: 'center',
  },
  formContainer: {
    // height: heightPercentageToDP(56),
    width: widthPercentageToDP(100),
  },
  form: {
    width: widthPercentageToDP(70),
  },
  formItems: {
    marginVertical: 5,
  },
  formDoubleItems1: {
    width: widthPercentageToDP(35),
  },
  formDoubleItems2: {
    width: widthPercentageToDP(15),
  },
  formIcons: {
    color: Color.PrimaryColor,
    marginVertical: 10,
    marginRight: 10,
  },
  formLable: {
    color: Color.PrimaryColor,
  },
  pickerStyle: {
    width: widthPercentageToDP(50),
    marginLeft: -10,
  },
};
