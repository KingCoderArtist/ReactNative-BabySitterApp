import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BookSitter from '../../Screen/BookSitter/BookSitter';
import BookSitterTabComp from '../BookSitterTabComp/BookSitterTabComp';
import Setting from '../../Screen/Setting/Setting';

const BookSitterTab = createBottomTabNavigator();


function MyTabs() {
    return (
        <BookSitterTab.Navigator tabBar={props => <BookSitterTabComp {...props} />} >
            <BookSitterTab.Screen name="BookSitter" component={BookSitter} />
            <BookSitterTab.Screen name="Setting" component={Setting} />
        </BookSitterTab.Navigator>
    );
}

export default MyTabs;