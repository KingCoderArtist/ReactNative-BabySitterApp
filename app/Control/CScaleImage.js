import React, { useState, useEffect, memo } from "react";
import { ActivityIndicator } from "react-native";
import { Image } from 'react-native-elements';
import { fComGetDownloadUrl } from "../Library/fbfsCommon";
import FastImage from "react-native-fast-image";
import { hLog } from "../Library/helper";
import { imgAvatar } from "../Images";


function CScaleImageOrigin(props) {
    const [count, setCount] = useState(0);
    const [path, setPath] = useState(props.path);
    const [width, setWidth] = useState(props.width || props.height);
    const [height, setHeight] = useState(props.height || props.width);
    const [source, setSource] = useState(null);

    const onLoadImage = async () => {
        var url = await fComGetDownloadUrl(props.path);
        if(url) {
            // hLog(url);
            setSource({
                uri: url,
            });
        } else {
            // hLog("Here");
            setSource(imgAvatar);
        }
    }

    useEffect(() => {
        if (count == 0) {
            // Load Firebase Image
            onLoadImage();
            setCount(count + 1);
        }

        return () => {

        }
    })

    const onLoad = (value) => {
        // const { height, width } = value.nativeEvent.source;
        // if (props.width && !props.height) {
        //     setWidth(props.width);
        //     setHeight(height * (props.width / width));
        // } else if (!props.width && props.height) {
        //     setWidth(width * (props.height / height));
        //     setHeight(props.height);
        // } else {
        //     setWidth(props.width);
        //     setHeight(props.height);
        // }
    }

    return (
        <FastImage
            source={source}
            borderRadius={props.borderRadius}
            // resizeMode={FastImage.resizeMode.contain}
            // onLoad={onLoad}
            style={{ ...props.style, height: height, width: width, borderRadius: props.borderRadius }}
            // PlaceholderContent={<ActivityIndicator />}
        />
    );
}

export const CScaleImage = memo(CScaleImageOrigin);