import React, { Component } from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    Text
} from 'react-native';

import { Badge } from 'react-native-elements'

import * as cst from '../Library/constants';
import { imgMarketPlaceSel, imgMarketPlace, imgFeedSel, imgFeed, imgMyVesselSel, imgMyVessel, imgNotificationSel, imgNotification, imgInboxSel, imgInbox } from '../Images';

var body;
class CMainFooter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            unreadnotice: 0
        }
        body = this;
    }
    componentDidMount() {
        this.noticeTimer = setInterval(function () {
            if (global.unreadnotice) {
                body.setState({ unreadnotice: global.unreadnotice });
            }
        }, 1 * 1000);
    }
    componentWillUnmount() {
        clearInterval(this.noticeTimer);
    }
    pageMarketplaceRender = () => {
        if (this.props.page == 1) {
            return <View style={{alignItems:'center'}}>
                <Image source={imgMarketPlaceSel} style={{
                    height: 30,
                    width: 60
                }} />
                <Text style={{
                    textAlign: 'center',
                    color: cst.colLightBlue,
                    fontWeight: 'bold',
                    fontSize: 11
                }}>Market</Text>
            </View>;
        } else {
            return <TouchableOpacity onPress={() => {
                this.props.onPage(1);
            }} style={{alignItems:'center'}}>
                <Image source={imgMarketPlace} style={{
                    height: 30,
                    width: 60
                }} />
                <Text style={{
                    textAlign: 'center',
                    color: cst.colDisable,
                    fontWeight: 'bold',
                    fontSize: 11
                }}>Market</Text>
            </TouchableOpacity>
        }
    }
    pageFeedRender = () => {
        if (this.props.page == 2) {
            return <View style={{alignItems:'center'}}>
                <Image source={imgFeedSel} style={{
                    height: 30,
                    width: 60
                }} />
                <Text style={{
                    textAlign: 'center',
                    color: cst.colLightBlue,
                    fontWeight: 'bold',
                    fontSize: 11
                }}>Feed</Text>
            </View>;
        } else {
            return <TouchableOpacity onPress={() => {
                this.props.onPage(2);
            }} style={{alignItems:'center'}}>
                <Image source={imgFeed} style={{
                    height: 30,
                    width: 60
                }} />
                <Text style={{
                    textAlign: 'center',
                    color: cst.colDisable,
                    fontWeight: 'bold',
                    fontSize: 11
                }}>Feed</Text>
            </TouchableOpacity>
        }
    }
    pageMyVesselRender = () => {
        if (this.props.page == 3) {
            return <View style={{alignItems:'center'}}>
                <Image source={imgMyVesselSel} style={{
                    height: 30,
                    width: 60
                }} />
                <Text style={{
                    textAlign: 'center',
                    color: cst.colLightBlue,
                    fontWeight: 'bold',
                    fontSize: 11
                }}>Vessel</Text>
            </View>;
        } else {
            return <TouchableOpacity onPress={() => {
                this.props.onPage(3);
            }} style={{alignItems:'center'}}>
                <Image source={imgMyVessel} style={{
                    height: 30,
                    width: 60
                }} />
                <Text style={{
                    textAlign: 'center',
                    color: cst.colDisable,
                    fontWeight: 'bold',
                    fontSize: 11
                }}>Vessel</Text>
            </TouchableOpacity>
        }
    }
    pageNotificationRender = () => {
        if (this.props.page == 4) {
            return <View style={{alignItems:'center'}}>
                <Image source={imgNotificationSel} style={{
                    height: 30,
                    width: 60
                }} />
                <Text style={{
                    textAlign: 'center',
                    color: cst.colLightBlue,
                    fontWeight: 'bold',
                    fontSize: 11
                }}>Notifications</Text>
            </View>;
        } else {
            return <View><TouchableOpacity onPress={() => {
                this.props.onPage(4);
            }} style={{alignItems:'center'}}>
                <Image source={imgNotification} style={{
                    height: 30,
                    width: 60
                }} />
                <Text style={{
                    textAlign: 'center',
                    color: cst.colDisable,
                    fontWeight: 'bold',
                    fontSize: 11
                }}>Notifications</Text>

            </TouchableOpacity>
                {
                    this.state.unreadnotice > 0 ?
                        <Badge value={this.state.unreadnotice} status="error" containerStyle={{ position: 'absolute', top: -6, right: +8 }} />
                        : null}
            </View>
        }
    }


    pageInboxRender = () => {
        if (this.props.page == 5) {
            return <View style={{alignItems:'center'}}>
                <Image source={imgInboxSel} style={{
                    height: 30,
                    width: 60
                }} />
                <Text style={{
                    textAlign: 'center',
                    color: cst.colLightBlue,
                    fontWeight: 'bold',
                    fontSize: 11
                }}>Inbox</Text>
            </View>;
        } else {
            return <View><TouchableOpacity onPress={() => {
                this.props.onPage(5);
            }} style={{alignItems:'center'}}>
                <Image source={imgInbox} style={{
                    height: 30,
                    width: 60
                }} />
                <Text style={{
                    textAlign: 'center',
                    color: cst.colDisable,
                    fontWeight: 'bold',
                    fontSize: 11
                }}>Inbox</Text>

            </TouchableOpacity>
                {
                    this.state.unreadnotice > 0 ?
                        <Badge value={this.state.unreadnotice} status="error" containerStyle={{ position: 'absolute', top: -6, right: +8 }} />
                        : null}
            </View>
        }
    }

    render() {
        return (
            <View style={{
                height: 51,
                backgroundColor: 'white'
            }}>
                <View style={{
                    borderBottomWidth: 1,
                    borderBottomColor: '#DDDDDD',
                    width: global.width,
                    marginBottom: 2,
                    //marginTop: '1%',
                    //marginBottom: '1%'
                }} />
                <View style={{
                    flexDirection: 'row',
                    width: global.width,
                    alignItems: 'center',
                    backgroundColor: 'white',
                    paddingHorizontal: cst.padSmall,
                    height: 48,
                }} justifyContent='space-between'>
                    <this.pageMarketplaceRender />
                    <this.pageFeedRender />
                    <this.pageMyVesselRender />
                    <this.pageNotificationRender />
                    <this.pageInboxRender />
                </View>
            </View>
        )
    }
}

export default CMainFooter;