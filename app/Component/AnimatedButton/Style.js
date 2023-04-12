import {Dimensions,StyleSheet} from 'react-native';
import Color from '@Asset/color';
const {width,height} = Dimensions.get('screen');
import {widthPercentageToDP,heightPercentageToDP,} from '@Theme/Responsive';
export default {

      button: {
        backgroundColor: Color.PrimaryColor,
        height: 70,
        width:width-100,
        marginHorizontal: 20,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
        shadowOffset: { x: 2, y: 2 },
        shadowColor: '#000',
        shadowOpacity: 0.2
      },
      btnText:{ fontSize: 20, fontWeight: 'bold', color: 'white' },
}