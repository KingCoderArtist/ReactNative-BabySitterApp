import React, {memo} from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as cst from '../Library/constants';
import CButton from './button';
import { hOnBack, hLog } from '../Library/helper';

function CPrice(props) {
    let priceType = props.item.priceType;
    let price = props.item.price;
    let priceadd = props.item.priceadd;

    let res = <Txt18BAR>${price}<Txt15CD>/hr</Txt15CD></Txt18BAR>;
    if (priceType == 1) {
        // 1: Fixed
        res = <Txt18BAR>${price}</Txt18BAR>
    } else if (priceType == 2) {
        // 2: Fixed $ per foot
        res = <Txt18BAR>${price}<Txt15CD>/ft</Txt15CD></Txt18BAR>
    } else if (priceType == 3) {
        // 3: Variable $ per foot
        res = <Txt18BAR>${price}~{priceadd}<Txt15CD>/ft</Txt15CD></Txt18BAR>
    } else if (priceType == 4) {
        // 4: $#/ft + parts
        res = <Txt18BAR>${price}<Txt15CD>/ft + parts</Txt15CD></Txt18BAR>
    } else if (priceType == 5) {
        // 5. $ per hour
        res = <Txt18BAR>${price}<Txt15CD>/hr</Txt15CD></Txt18BAR>
    } else if (priceType == 6) {
        // 6. fixed $# + parts
        res = <Txt18BAR>${price}<Txt15CD>/ea + parts</Txt15CD></Txt18BAR>
    } else if (priceType == 7) {
        // 7. $#/hr + parts
        res = <Txt18BAR>${price}<Txt15CD>/hr + parts</Txt15CD></Txt18BAR>
    } else if (priceType == 8) {
        // 8. Free
        res = <Txt18BAR>Free</Txt18BAR>
    } else if (priceType == 9) {
        // 9. Get Quote
        res = <Txt18BAR>Quote</Txt18BAR>
    } else if (priceType == 10) {
        // 10: Fixed $ per month
        res = <Txt18BAR>${price}<Txt15CD>/mo</Txt15CD></Txt18BAR>
    } else if (priceType == 11) {
        // 11: Variable $ per month
        res = <Txt18BAR>${price}~${priceadd}<Txt15CD>/mo</Txt15CD></Txt18BAR>
    }
    return <View style={{width: global.width * 0.24, alignItems:'flex-end'}}>{res}</View>;
}

export const MCPrice = memo(CPrice);

export function CInput(value, setValue, placeholder = "", security = false) {
    return <TextInput
        underlineColorAndroid='rgba(0,0,0,0)'
        editable={true}
        secureTextEntry={security}
        style={{
            borderWidth: 1,
            borderColor: 'lightgrey',
            paddingLeft: cst.padSmall,
            borderRadius: 5,
            marginTop: 3,
            paddingTop: 5, paddingBottom: 5, width: '100%'
        }}
        justifyContent={'center'}
        autoCapitalize={'none'}
        onChangeText={setValue}
        placeholder={placeholder}
        value={value}
    />;
}

export function BtnJoinHarbor(props) {
    return <CButton callback={props.callback} textStyle={{
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        textAlignVertical: 'center',
        lineHeight: 50,
        justifyContent: 'center'
    }} backStyle={{
        backgroundColor: cst.colLightBlue,
        height: 50,
        borderRadius: 25,
        width: global.width * 0.66,
        justifyContent: 'center',
        textAlign: 'center',
        textAlignVertical: 'center'
    }}>{props.children}</CButton>
}

export function BtnContinue(props) {
    return <CButton callback={props.callback} textStyle={{
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        textAlignVertical: 'center',
        lineHeight: 45,
        justifyContent: 'center'
    }} backStyle={{
        backgroundColor: cst.colPurple,
        height: 45,
        borderRadius: 10,
        marginTop: cst.padSmall,
        width: global.width * 0.8,
        justifyContent: 'center',
        textAlign: 'center',
        textAlignVertical: 'center'
    }}>{props.children}</CButton>
}

export function BtnWord(props) {
    let backStyle = {
        height: 30, paddingLeft: 15, paddingRight: 15,
        paddingTop: 3,
        backgroundColor: '#CCC', borderRadius: 12, marginLeft: 7,
    };
    if (props.selected) {
        backStyle = {
            height: 30, paddingLeft: 15, paddingRight: 15,
            paddingTop: 1, borderWidth: 2, borderColor: cst.colLightBlue,
            backgroundColor: '#CCC', borderRadius: 12, marginLeft: 7,
        };
    }
    return <CButton backStyle={backStyle} textStyle={{ fontSize: 16 }} callback={props.callback} param={props.param}>{props.children}</CButton>
}

export const BtnFloatNext = (props) => <TouchableOpacity
    style={{
        alignItems: 'center',
        justifyContent: 'center',
        width: 70,
        position: 'absolute',
        bottom: 10,
        right: 10,
        height: 70,
        backgroundColor: cst.colLightBlue,
        borderRadius: 100,
    }}
    onPress={props.callback}
>
    <Icon name="arrow-right" size={30} color='white' />
</TouchableOpacity>

export function BtnLink(props) {
    return <CButton textStyle={{ fontSize: 17, color: cst.colLightBlue }} callback={props.callback}>{props.children}</CButton>
}

export function BtnBack(props) {
    return <TouchableOpacity onPress={() => {
        if (props.callback) {
            props.callback();
        }
        hOnBack();
    }}>
        <LineView>
            <Icon name='chevron-left' size={22} />
            <Txt17>  Back</Txt17>
        </LineView>
    </TouchableOpacity>;
}


export function Container(props) {
    return <View style={{
        flex: 1,
        alignItems: 'center',
    }}>{props.children}</View>;
}

export function ContainerCB(props) {
    return <View style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: cst.colLightBlue
    }}>{props.children}</View>;
}

function LineSplitterOrigin(props) {
    return <View style={{ width: global.width, borderBottomWidth: 1, marginTop: cst.padTiny, borderBottomColor: '#EEE' }} />;
}
export const LineSplitter = memo(LineSplitterOrigin);

function LineSplitterBOrigin(props) {
    return <View style={{ width: global.width, borderBottomWidth: 1, marginTop: cst.padTiny, borderBottomColor: '#CCC' }} />;
}
export const LineSplitterB = memo(LineSplitterBOrigin);

function LineSplitterMidOrigin(props) {
    return <View style={{ width: global.width * 0.7, borderBottomWidth: 1, marginTop: cst.padTiny, borderBottomColor: '#BBB' }} />;
}
export const LineSplitterMid = memo(LineSplitterMidOrigin);

function LineViewOrigin(props) {
    return <View style={{ flexDirection: "row" }} alignItems='center'>{props.children}</View>;
}
export const LineView = memo(LineViewOrigin);

function LineViewFullOrigin(props) {
    return <View alignItems="center" style={{ flexDirection: "row", width: global.width * 0.9, justifyContent: 'space-between' }}>{props.children}</View>;
}
export const LineViewFull = memo(LineViewFullOrigin);

function LineView70COrigin(props) {
    return <View style={{ flexDirection: "row", width: global.width * 0.7 }}>{props.children}</View>;
}
export const LineView70C = memo(LineView70COrigin);

function Txt12CLBOrigin(props) {
    return <Text style={{ fontSize: 12, color: cst.colLightBlue }}>{props.children}</Text>
}
export const Txt12CLB = memo(Txt12CLBOrigin);

function Txt12CWOrigin(props) {
    return <Text style={{ fontSize: 12, color: '#FFF' }}>{props.children}</Text>
}
export const Txt12CW = memo(Txt12CWOrigin);

function Txt12Origin(props) {
    return <Text style={{ fontSize: 12 }}>{props.children}</Text>
}
export const Txt12 = memo(Txt12Origin); 

function Txt13CLBOrigin(props) {
    return <Text style={{ fontSize: 13, color: cst.colLightBlue }}>{props.children}</Text>
}
export const Txt13CLB = memo(Txt13CLBOrigin);

function Txt13CPOrigin(props) {
    return <Text style={{ fontSize: 13, color: cst.colPurple }}>{props.children}</Text>
}
export const Txt13CP = memo(Txt13CPOrigin);

function Txt15Origin(props) {
    return <Text style={{ fontSize: 15, color: cst.colBase }}>{props.children}</Text>
}
export const Txt15 = memo(Txt15Origin);

function Txt15BOrigin(props) {
    return <Text style={{ fontSize: 15, color: cst.colBlack }}>{props.children}</Text>
}
export const Txt15B = memo(Txt15BOrigin);

function Txt15CBOrigin(props) {
    return <Text style={{ fontSize: 15, color: cst.colBlack }}>{props.children}</Text>
}
export const Txt15CB = memo(Txt15CBOrigin);

function Txt15WBOrigin(props) {
    return <Text style={{ fontSize: 15, color: '#FFF', fontWeight: 'bold' }}>{props.children}</Text>
}
export const Txt15WB = memo(Txt15WBOrigin);

function Txt15CLBOrigin(props) {
    return <Text style={{ fontSize: 15, color: cst.colLightBlue }}>{props.children}</Text>
}
export const Txt15CLB = memo(Txt15CLBOrigin);

function Txt15BCLBOrigin(props) {
    return <Text style={{ fontSize: 15, color: cst.colLightBlue, fontWeight: 'bold' }}>{props.children}</Text>
}
export const Txt15BCLB = memo(Txt15BCLBOrigin);

function Txt15CPOrigin(props) {
    return <Text style={{ fontSize: 15, color: cst.colPurple }}>{props.children}</Text>
}
export const Txt15CP = memo(Txt15CPOrigin);

function Txt15CDOrigin(props) {
    return <Text style={{ fontSize: 15, color: cst.colDisable }}>{props.children}</Text>
}
export const Txt15CD = memo(Txt15CDOrigin);

function Txt17Origin(props) {
    return <Text style={{ fontSize: 16, color: cst.colBase }}>{props.children}</Text>
}
export const Txt17 = memo(Txt17Origin);

function Txt17CBOrigin(props) {
    return <Text style={{ fontSize: 16, color: cst.colBlack }}>{props.children}</Text>
}
export const Txt17CB = memo(Txt17CBOrigin);

function Txt17CDOrigin(props) {
    return <Text style={{ fontSize: 16, color: cst.colDisable }}>{props.children}</Text>
}
export const Txt17CD = memo(Txt17CDOrigin);

function Txt17BCBOrigin(props) {
    return <Text style={{ fontSize: 16, color: cst.colBlack, fontWeight: 'bold' }}>{props.children}</Text>
}
export const Txt17BCB = memo(Txt17BCBOrigin);

function Txt17CLBOrigin(props) {
    return <Text style={{ fontSize: 16, color: cst.colLightBlue }}>{props.children}</Text>
}
export const Txt17CLB = memo(Txt17CLBOrigin);

function Txt17BCLBOrigin(props) {
    return <Text style={{ fontSize: 16, color: cst.colLightBlue, fontWeight: 'bold' }}>{props.children}</Text>
}
export const Txt17BCLB = memo(Txt17BCLBOrigin);

function Txt18Origin(props) {
    return <Text style={{ fontSize: 17, color: cst.colBase }}>{props.children}</Text>;
}
export const Txt18 = memo(Txt18Origin);

function Txt18BCPOrigin(props) {
    return <Text style={{ fontSize: 17, color: cst.colPurple, fontWeight: 'bold' }}>{props.children}</Text>
}
export const Txt18BCP = memo(Txt18BCPOrigin);

function Txt18BOrigin(props) {
    return <Text style={{ fontSize: 17, color: cst.colBlack, fontWeight: 'bold' }}>{props.children}</Text>;
}
export const Txt18B = memo(Txt18BOrigin);

function Txt18BAROrigin(props) {
    return <Text style={{ fontSize: 17, color: cst.colBlack, fontWeight: 'bold', textAlign:'right' }}>{props.children}</Text>;
}
export const Txt18BAR = memo(Txt18BAROrigin);

function Txt18DBOrigin(props) {
    return <Text style={{ fontSize: 17, color: cst.colDeepBlue, fontWeight: 'bold' }}>{props.children}</Text>;
}
export const Txt18DB = memo(Txt18DBOrigin);

function Txt18BCDOrigin(props) {
    return <Text style={{ fontSize: 17, color: cst.colDisable, fontWeight: 'bold' }}>{props.children}</Text>;
}
export const Txt18BCD = memo(Txt18BCDOrigin);

function Txt18WBOrigin(props) {
    return <Text style={{ fontSize: 17, color: '#FFF', fontWeight: 'bold' }}>{props.children}</Text>
}
export const Txt18WB = memo(Txt18WBOrigin);

function Txt20Origin(props) {
    return <Text style={{ fontSize: 19, color: cst.colBase, textAlign: 'center' }}>{props.children}</Text>;
}
export const Txt20 = memo(Txt20Origin);

function Txt20BOrigin(props) {
    return <Text style={{ fontSize: 19, color: cst.colBlack, fontWeight: 'bold' }}>{props.children}</Text>;
}
export const Txt20B = memo(Txt20BOrigin);

function Txt20CDOrigin(props) {
    return <Text style={{ fontSize: 19, color: cst.colDisable, textAlign: 'center' }}>{props.children}</Text>;
}
export const Txt20CD = memo(Txt20CDOrigin);

function MbBackOrigin(props) {
    return <View style={{ width: 56 }} />;
}
export const MbBack = memo(MbBackOrigin);

function SbOrigin(props) {
    return <View style={{ marginTop: cst.pad }} />;
}
export const Sb = memo(SbOrigin);

function SbSmallOrigin(props) {
    return <View style={{ marginTop: cst.padSmall }} />;
}
export const SbSmall = memo(SbSmallOrigin);

function SbTinyOrigin(props) {
    return <View style={{ marginTop: cst.padTiny }} />;
}
export const SbTiny = memo(SbTinyOrigin);

function SbLargeOrigin(props) {
    return <View style={{ marginTop: cst.padLarge }} />;
}
export const SbLarge = memo(SbLargeOrigin);

function Sb10Origin(props) {
    return <View style={{ marginTop: global.width * 0.1 }} />;
}
export const Sb10 = memo(Sb10Origin);

function Sb20Origin(props) {
    return <View style={{ marginTop: global.width * 0.2 }} />;
}
export const Sb20 = memo(Sb20Origin);

function Sb30Origin(props) {
    return <View style={{ marginTop: global.width * 0.3 }} />;
}
export const Sb30 = memo(Sb30Origin);

function Sb40Origin(props) {
    return <View style={{ marginTop: global.width * 0.4 }} />;
}
export const Sb40 = memo(Sb40Origin);

function Sb50Origin(props) {
    return <View style={{ marginTop: global.width * 0.5 }} />;
}
export const Sb50 = memo(Sb50Origin);
