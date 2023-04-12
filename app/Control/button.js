import React, { PureComponent } from 'react';
import {
    Text,
    TouchableOpacity
} from 'react-native';
import { hLog } from '../Library/helper';

class CButton extends PureComponent {

    onClick = () => {
        if (this.props.callback) {
            if (this.props.param != undefined) {
                this.props.callback(this.props.param);
            } else {
                this.props.callback();
            }
        }
    }

    render() {
        return (<TouchableOpacity style={this.props.backStyle} onPress={this.onClick} >
            <Text style={this.props.textStyle}>{this.props.children}</Text>
        </TouchableOpacity>)
    }
}

export default CButton;