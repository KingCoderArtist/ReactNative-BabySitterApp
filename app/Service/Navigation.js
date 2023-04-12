import {
    NavigationActions,
    CommonActions,
    StackActions,
  } from '@react-navigation/native';
  
  let _navigator;
  
  function setTopLevelNavigator(navigatorRef) {
    _navigator = navigatorRef;
  }
  
  function getTopLevelNavigator() {
    return _navigator;
  }
  
  
  function navigate(routeName) {
    _navigator.dispatch(CommonActions.navigate(routeName));
  }
  
  function push(routeName) {
    _navigator.dispatch(StackActions.push(routeName));
  }
  
  function navigateAndRemoveFirstRoute(routeName) {
    console.log('_navigator', _navigator);
    //_navigator.dispatch(StackActions.replace(routeName));
    _navigator.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: routeName}],
        //actions: [NavigationActions.navigate({routeName})],
      }),
    );
  }
  
  function navigateWithParams(routeName, params) {
    _navigator.dispatch(CommonActions.navigate(routeName, params));
    // _navigator.dispatch(
    //   NavigationActions.navigate({
    //     routeName,
    //     params,
    //   }),
    // );
  }
  function navigatePushWithParams(routeName, params) {
    _navigator.dispatch(StackActions.push(routeName, params));
    // _navigator.dispatch(
    //   NavigationActions.navigate({
    //     routeName,
    //     params,
    //   }),
    // );
  }
  function popWithoutParams() {
    console.log('_navigator pop:', _navigator);
    _navigator.goBack(null); //.dispatch(StackActions.pop());
  }
  
  function popWithoutParams2() {
    console.log('_navigator pop:', _navigator);
    _navigator.dispatch(StackActions.pop());
  }
  export default {
    navigate,
    navigateWithParams,
    setTopLevelNavigator,
    popWithoutParams,
    navigateAndRemoveFirstRoute,
    navigatePushWithParams,
    push,
    popWithoutParams2,
    getTopLevelNavigator
  };
  