/**
 * Date : 11/12/2019
 * Time : 09:59
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

import React, { Component } from 'react';
import {
  Icon,
  Button,
  Footer,
  FooterTab
} from 'native-base';

const Style = {
  white : {
    color: '#FFFFFF'
  },
  bgPrimary : {
    backgroundColor: '#3F9CE8'
  },
  bgWhite : {
    backgroundColor: '#FFFFFF'
  }
};

class MenuFooter extends Component {
  constructor (props) {
    super(props);

    this.state = {
      isLogin : false
    }
  }

  componentDidMount () {

  }

  render () {
    return (
      <Footer>
        <FooterTab style={Style.bgPrimary}>
          <Button
            onPress={() => this.props.navigation.navigate('EngineerScreen')}
          >
            <Icon type='FontAwesome5' name='users' style={Style.white} />
          </Button>
        </FooterTab>
        <FooterTab style={Style.bgPrimary}>
          <Button
            onPress={() => this.props.navigation.navigate('CompanyScreen')}
          >
            <Icon type='FontAwesome5' name='building' style={Style.white} />
          </Button>
        </FooterTab>
        <FooterTab style={Style.bgPrimary}>
          <Button
            onPress={() => this.props.navigation.navigate('HomeScreen')}
          >
            <Icon type='FontAwesome5' name='home' style={Style.white} />
          </Button>
        </FooterTab>
        <FooterTab style={Style.bgPrimary}>
          <Button
            onPress={() => this.props.navigation.navigate('ProjectScreen')}
          >
            <Icon type='FontAwesome5' name='briefcase' style={Style.white} />
          </Button>
        </FooterTab>
        <FooterTab style={Style.bgPrimary}>
          <Button
            onPress={() => this.props.navigation.navigate('ProfileScreen')}
          >
            <Icon type='MaterialIcons' name='face' style={Style.white} />
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}

export default MenuFooter;
