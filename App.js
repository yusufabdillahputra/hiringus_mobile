/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Provider } from 'react-redux';
import store from './src/Utils/redux/store';
import { fromBottom } from 'react-navigation-transitions';

/**
 * Screens
 */
import Home from './src/Screens/Home';
import Login from './src/Screens/Login';
import Engineer from './src/Screens/Engineer';
import Company from './src/Screens/Company';
import Project from './src/Screens/Project';
import Profile from './src/Screens/Profile';
import EngineerSearch from './src/Components/Engineer/EngineerSearch';

const RootStack = createStackNavigator({
  HomeScreen: {
    screen: Home
  },
  LoginScreen : {
    screen: Login
  },
  ProjectScreen : {
    screen: Project
  },
  ProfileScreen : {
    screen: Profile
  },
  EngineerScreen : {
    screen: Engineer
  },
  EngineerSearchScreen : {
    screen: EngineerSearch
  },
  CompanyScreen : {
    screen: Company
  },
}, {
  headerMode: 'none',
  transitionConfig : () => fromBottom()
})

const Navigation = createAppContainer(RootStack);

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <Navigation/>
      </Provider>
    );
  }
}

export default App
