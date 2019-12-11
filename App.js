/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { PersistGate } from "redux-persist/integration/react";

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Provider } from 'react-redux';
import { fromBottom } from 'react-navigation-transitions';

import configureStore from './src/Utils/redux/store';

/**
 * Screens
 */
import Home from './src/Screens/Home';
import Login from './src/Components/Profile/Login';
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

const { store, persistor } = configureStore();

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Navigation/>
        </PersistGate>
      </Provider>
    );
  }
}

export default App
