import React from "react";
import { View } from "react-native";
import { Txt15WB, Txt15BCLB } from "./common";
import { CScaleImage } from "./CScaleImage";
import * as cst from '../Library/constants';
import { TouchableOpacity } from "react-native-gesture-handler";
import { hLog, hThumbCategory } from "../Library/helper";


export function CCateItem(props) {
    return (
        <TouchableOpacity style={{ marginLeft: cst.padSmall, height: 150 }} onPress={() => {
            props.callback(props.item.id);
        }}>
            <CScaleImage path={hThumbCategory(props['item']['id'])}
                width={110} height={150} borderRadius={cst.padSmall} />
            {
                props.item.name ? <View style={{
                    position: 'absolute', top: 120, left: 0
                    , height: 30, backgroundColor: 'rgba(0,0,0,0.3)', width: 110,
                    borderBottomLeftRadius: cst.padSmall,
                    borderBottomRightRadius: cst.padSmall,
                    alignItems: 'center', paddingTop: 4
                }}>
                    {props.selected?<Txt15BCLB>{props.item.name}</Txt15BCLB>:
                    <Txt15WB>{props.item.name}</Txt15WB>}
                    </View> : null
            }

        </TouchableOpacity>
    );
}