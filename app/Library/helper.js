
import React from 'react';
import {
    Alert,
    Text,
    Dimensions,
    StatusBar
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as cst from './constants';
import RNExitApp from 'react-native-exit-app';
import Toast from 'react-native-simple-toast';
import { NavigationActions, StackActions } from 'react-navigation';
import { imgCardVisa, imgCardUnionPay, imgCardAmericanExpress, imgCardMasterCard, imgCardDiscover, imgCardMDinersClub, imgCardJCB } from '../Images';

var { width, height } = Dimensions.get('window')
global.width = width;
global.height = Platform.OS === 'android' ? Dimensions.get('screen').height - StatusBar.currentHeight
    : Dimensions.get('window').height;
// global.height = Dimensions.get('window').height;

export function hOnExitCheck() {
    Alert.alert(
        'Exit',
        'Are you going to really exit?',
        [
            {
                text: 'No',
                onPress: () => { },
                style: 'cancel',
            },
            { text: 'Yes', onPress: () => RNExitApp.exitApp() },
        ],
        { cancelable: false },
    );
};

export function hLog(...params) {
    // console.log(global.pages[global.pagepos - 1] + ':', ...params);
    console.log('*** :', ...params);
};

export function hGetCardImg(card) {
    hLog(card.card.brand);
    if(card.card.brand == 'Visa') {
        return imgCardVisa;
    }
    if(card.card.brand == 'MasterCard') {
        return imgCardMasterCard;
    }
    if(card.card.brand == 'American Express') {
        return imgCardAmericanExpress;
    }
    if(card.card.brand == 'Discover') {
        return imgCardDiscover;
    }
    if(card.card.brand == 'Diners Club') {
        return imgCardMDinersClub;
    }
    if(card.card.brand == 'JCB') {
        return imgCardJCB;
    }
    return imgCardUnionPay;
}

export async function hSaveInfo(name, content) {
    try {
        await AsyncStorage.setItem('@' + name, JSON.stringify(content));
    } catch (error) {
        console.error('AsyncStorage error: ' + error.message);
    }
};

export function hThumbCategory(id) {
    return 'category/thumbs/' + id + '_200x200.png';
}

export function hThumbVessel(id) {
    return 'vessel/thumbs/' + id + '_200x200.png';
}

export function hThumbAvatar(id) {
    return 'avatar/thumbs/' + id + '_200x200.png';
}

export async function hDrawLog() {
    hLog("+++ DRAW +++");
}

export async function hOnLogOut() {
    await hSaveInfo('Rememberme', false);
    hGotoPage('xSplash');
};

export async function hGetInfo(name) {
    data = await AsyncStorage.getItem('@' + name);

    if (data) {
        return JSON.parse(data);
    }
    return null;
};

export function hGetTimeDiffStr(to) {
    let def = (new Date(to)).getTime() - (new Date).getTime();
    let sec = def / 1000;

    let style = {
        color: '#333'
    };
    if (sec < 3 * 86400) {
        style.color = '#f00';
    }

    let retstr = '';
    if (sec >= 86400) {
        retstr += Math.floor(sec / 86400).toString() + 'Day ';
        sec %= 86400;
    }
    if (sec >= 3600) {
        retstr += Math.floor(sec / 3600).toString() + 'Hour ';
        sec %= 3600;
    }
    if (sec >= 60) {
        retstr += Math.floor(sec / 60).toString() + 'Min ';
        sec %= 60;
    }
    if (sec > 0) {
        retstr += Math.floor(sec).toString() + 'Sec ';
    }
    return <Text style={style}>{retstr}</Text>;
};

export function hOnBack() {
    global.timePos = new Date;
    if (global.pages[global.pagepos - 1] == 'xMain') {
        return;
    }
    // if (global.pages[global.pagepos - 1] == 'xFirstPage' ||
    //     global.pages[global.pagepos - 1] == 'xSignupSuccess' ||
    //     global.pages[global.pagepos - 1] == 'xPopup') {
    //     return;
    // }
    // if (global.pages[global.pagepos - 1] == 'xInterface' ||
    //     global.pages[global.pagepos - 1] == 'xProfile') {
    //     hlp.onExitCheck();
    //     return;
    // }
    if (global.pagepos >= 2) {
        // if (global.pages[global.pagepos - 2] == 'xInterface' &&
        //     (global.pages[global.pagepos - 1] != 'xEmailLogin' && global.pages[global.pagepos - 1] != 'xSignup')) {
        //     hlp.onExitCheck();
        //     return;
        // }
        // if (global.pages[global.pagepos - 2] == 'xFirstPage') {
        //     hlp.onExitCheck();
        //     return;
        // }
        global.pagepos -= 1;


        global.navigator.dispatch(StackActions.reset({
            index: 0,
            key: null,
            actions: [NavigationActions.navigate({ routeName: global.pages[global.pagepos - 1] })]
        }))

        // global.navigator.navigate(global.pages[global.pagepos - 1]);
    } else {
        hOnExitCheck();
    }
};

export function hGotoPage(page) {
    global.navigator.dispatch(StackActions.reset({
        index: 0,
        key: null,
        actions: [NavigationActions.navigate({ routeName: page })]
    }))
    //global.navigator.navigate(page);
};

export function hSetLog(page, flag = 1) {
    global.timePos = new Date;
    for (let pos = 2; pos < global.pagepos; pos++) {
        if (global.pages[pos] == page) {
            global.pages[pos] = page;
            global.pagepos = pos + 1;
            return;
        }
    }
    if (page != global.pages[global.pagepos - 1]) {
        global.pages[global.pagepos] = page;
        global.pageflag[global.pagepos] = flag;
        global.pagepos++;
    }
};

export function hFormat(number) {
    return String(number).replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export function hGetSplice(val, len = 70) {
    if (val.length < len) {
        return val;
    }
    return val.substring(0, len) + "...";
}

export async function hStartSystem() {
    //    global.width = width;
    //    global.height = height;
    hLog("+++: SYSTEM STARTED!");

    let urls = await hGetInfo('urls@');
    global.urls = urls || {};

    let logos = await hGetInfo('logos@');
    global.logos = logos || {};

    // global.timePos = new Date;
    // global.searchStr = '';
    // global.curtab = cst.FIND_STORE;

    // result2 = await hlp.post('common');
    // global.common_name = result2['data'][0];
    // global.common_child = result2['data'][1];

    // setInterval(function () {
    //     hlp.post('auth/getnotice', {}).then(
    //         result => {
    //             if (result['result']) { // Notice 

    //                 const data = result['data'];

    //                 data['notices'].forEach(notice => {
    //                     hlp.showToast(notice.content);
    //                 });
    //                 global.unreadnotice = data.unreadnotice;

    //                 if (data.systemupdate) {
    //                     hlp.post('common').then(result2 => {
    //                         global.common_name = result2['data'][0];
    //                         global.common_child = result2['data'][1];
    //                     });
    //                 }

    //             }
    //         },
    //     );
    // }, 7 * 1000);
};

export function hShowMessage(msg) {
    Toast.show(msg, Toast.LONG);
}

export function hPost(url, param) {
    return fetch(this.getBaseURL() + url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        withCredentials: true,
        credentials: 'include',
        body: JSON.stringify(param)
    }).then((response) => {
        res = response.json();
        return res;
    }).then((result) => {
        if (result.message) {
            if (result.message === cst.MSG_ERR_NO_SESSION || result.message === cst.MSG_ERR_NOT_LOGIN) {
                global.navigator.navigate('xInterface');
            }
            else {
                Toast.show(cst.message[result.message], Toast.LONG);
            }
        }
        return result;
    });
};

export function hPostForm(url, param) {
    return fetch(this.getBaseURL() + url, {
        method: 'POST',
        headers: {
            Accept: 'application/x-www-form-urlencoded'
        },
        withCredentials: true,
        credentials: 'include',
        body: param
    }).then((response) => {
        res = response.json();
        return res;
    }).then((result) => {
        if (result.message) {
            if (result.message === cst.MSG_ERR_NO_SESSION || result.message === cst.MSG_ERR_NOT_LOGIN) {
                global.navigator.navigate('xInterface');
            }
            else {
                Toast.show(cst.message[result.message], Toast.LONG);
            }
        }
        return result;
    });
};

export function hShowToast(message) {
    if (message) {
        Toast.show(message);
    }
};