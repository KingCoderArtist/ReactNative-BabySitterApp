import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
} from 'react-native';

import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';

class CMainHeader extends Component {
    constructor(props) {

        super(props);
        this.state = {
            search: global.searchStr,
            cartcnt: 0
        }
    }

    onLoad = async () => {
        if (global.visitflag) {
            return;
        }
    }

    componentDidMount() {
        if (this.props.onSearch) {
            this.props.onSearch(global.searchStr);
        }
        this.onLoad();
    }

    render() {
        return (
            <View>
                <View style={{
                    flexDirection: 'row',
                    width: global.width,
                    height: 50,
                }} justifyContent='space-between'>
                    
                    <TouchableOpacity onPress={() => {
                        global.navigator.navigate('xShoppingCart');
                    }}>
                        <Icon
                            style={{
                                margin: 9,
                                height: 32,
                                width: 32
                            }}
                            name='shopping-cart'
                            size={30}
                            color='#35B5F0'
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ width: '70%' }} onPress={() => {
                        global.searchStr = this.state.search;
                        global.navigator.navigate('xSearch');
                    }}>
                        <Input
                            leftIcon={
                                <Icon
                                    name='search'
                                    size={24}
                                    color='#35B5F0'
                                />
                            }
                            underlineColorAndroid='#fff'
                            editable={false}
                            onChangeText={(search) => {
                                this.setState({ search: search });
                                if (this.props.onSearch) {
                                    this.props.onSearch(search);
                                }
                            }}
                            placeholder="Search Services"
                            placeholderTextColor='#555'
                            value={this.state.search}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        global.navigator.navigate('xShoppingCart');
                    }}>
                        <Icon
                            style={{
                                margin: 9,
                                height: 32,
                                width: 32
                            }}
                            name='shopping-cart'
                            size={30}
                            color='#35B5F0'
                        />
                    </TouchableOpacity>
                </View>
                <View style={{
                    borderBottomWidth: 1,
                    borderBottomColor: '#DDDDDD',
                    width: global.width
                    //marginTop: '1%',
                    //marginBottom: '1%'
                }} />
            </View>
        )
    }
}

export default CMainHeader;