import React from 'react';
import {View,TouchableOpacity,Text} from 'react-native';


export default class AccountPendingComponnet extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <View>
                <Text>
                    Thank you for registering!
                </Text>
                <Text>
                    Your account is currently being reviewed. We will contact you shortly.
                </Text>
                <TouchableOpacity>
                    <Text></Text>
                </TouchableOpacity>
            </View>
        )
    }
}