import React, {useEffect, useRef} from 'react';
import {View, Text, ImageBackground} from 'react-native';
import LottieView from 'lottie-react-native';
const Spinner = () => {
  let animation = useRef(null);
  useEffect(() => {
    animation.current.play();
  }, []);
  return (
    <View
      style={{
        flex: 1,
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        zIndex:10000,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,.2)',
      }}>
      <LottieView
        ref={animation}
        source={require('../../../assets/spinner.json')}
        loop
        resizeMode="contain"
        autoPlay
        duration={1000}
        style={{height: 70, width: 70}}
      />
    </View>
  );
};

export default Spinner;
