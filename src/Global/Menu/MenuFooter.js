/**
 * Date : 11/12/2019
 * Time : 09:59
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import {
  Icon,
  Button,
  Footer,
  FooterTab,
} from 'native-base';
import Styling from '../StyleSheet';

class MenuFooter extends Component {
  constructor (props) {
    super(props);

    this.state = {
      isLogin: false,
      token: null,
    };
  }

  async componentDidMount () {
    await AsyncStorage.clear()
    const jwt = await AsyncStorage.getItem('jwt')
    if (jwt !== null) {
      this.setState({
        isLogin: true,
        token: jwt
      })
    }
  }

  render () {
    return (
      <Footer>
        <FooterTab style={Styling.bgPrimary}>
          <Button
            onPress={() => this.props.navigation.navigate('EngineerScreen')}
          >
            <Icon type='FontAwesome5' name='users' style={Styling.white}/>
          </Button>
        </FooterTab>
        <FooterTab style={Styling.bgPrimary}>
          <Button
            onPress={() => this.props.navigation.navigate('CompanyScreen')}
          >
            <Icon type='FontAwesome5' name='building' style={Styling.white}/>
          </Button>
        </FooterTab>
        <FooterTab style={Styling.bgPrimary}>
          <Button
            onPress={() => this.props.navigation.navigate('HomeScreen')}
          >
            <Icon type='FontAwesome5' name='home' style={Styling.white}/>
          </Button>
        </FooterTab>
        <FooterTab style={Styling.bgPrimary}>
          <Button
            onPress={() => this.props.navigation.navigate('ProjectScreen')}
          >
            <Icon type='FontAwesome5' name='briefcase' style={Styling.white}/>
          </Button>
        </FooterTab>
        {
          this.state.isLogin
            ? <FooterTab style={Styling.bgPrimary}>
              <Button
                onPress={() => this.props.navigation.navigate('ProfileScreen')}
              >
                <Icon type='MaterialIcons' name='face' style={Styling.white}/>
              </Button>
            </FooterTab>
            : <FooterTab style={Styling.bgPrimary}>
              <Button
                onPress={() => this.props.navigation.navigate('LoginScreen')}
              >
                <Icon type='FontAwesome5' name='sign-in-alt' style={Styling.white}/>
              </Button>
            </FooterTab>
        }
      </Footer>
    );
  }
}

export default MenuFooter;
