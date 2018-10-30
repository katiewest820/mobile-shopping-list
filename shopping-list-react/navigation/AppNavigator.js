import React from 'react';
import { createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import EditListScreen from '../screens/EditListScreen';
import AddItemScreen from '../screens/AddItemScreen';

export default createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: MainTabNavigator,
  EditList: { screen: EditListScreen },
  AddList: { screen: AddItemScreen },

});