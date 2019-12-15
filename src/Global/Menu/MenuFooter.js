/**
 * Date : 11/12/2019
 * Time : 09:59
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';
import {
  Icon,
  Button,
  Footer,
  FooterTab,
} from 'native-base';
import Styling from '../StyleSheet';

import { connect } from 'react-redux';

class MenuFooter extends Component {
  constructor (props) {
    super(props);

    this.state = {
      isLogin: false,
      token: null,
      role: null,
      currentScreen: null,
    };
  }

  async componentDidMount () {
    const jwt = await this.props.data.Component_Authentication.token;
    if (jwt !== 'null') {
      const decode = await jwtDecode(jwt);
      await this.setState({
        currentScreen: this.props.navigation.state.routeName,
        role: decode.role_users,
        isLogin: true,
        token: jwt,
      });
    } else {
      await this.setState({
        currentScreen: this.props.navigation.state.routeName,
      });
    }
  }

  render () {
    return (
      <Footer>
        {
          this.state.currentScreen === 'EngineerScreen'
            ? <FooterTab style={Styling.bgWhite}>
              <Button
                onPress={() => this.props.navigation.replace('EngineerScreen')}
              >
                <Icon type='FontAwesome5' name='users' style={Styling.primary}
                />
              </Button>
            </FooterTab>
            : <FooterTab style={Styling.bgPrimary}>
              <Button
                onPress={() => this.props.navigation.replace('EngineerScreen')}
              >
                <Icon type='FontAwesome5' name='users'
                      style={Styling.white}
                />
              </Button>
            </FooterTab>
        }
        {
          this.state.currentScreen === 'CompanyScreen'
            ? <FooterTab style={Styling.bgWhite}>
              <Button
                onPress={() => this.props.navigation.replace('CompanyScreen')}
              >
                <Icon type='FontAwesome5' name='building' style={Styling.primary}/>
              </Button>
            </FooterTab>
            : <FooterTab style={Styling.bgPrimary}>
              <Button
                onPress={() => this.props.navigation.replace('CompanyScreen')}
              >
                <Icon type='FontAwesome5' name='building' style={Styling.white}/>
              </Button>
            </FooterTab>
        }
        {
          this.state.currentScreen === 'HomeScreen'
            ? <FooterTab style={Styling.bgWhite}>
              <Button
                onPress={() => this.props.navigation.replace('HomeScreen')}
              >
                <Icon type='FontAwesome5' name='home' style={Styling.primary}/>
              </Button>
            </FooterTab>
            : <FooterTab style={Styling.bgPrimary}>
              <Button
                onPress={() => this.props.navigation.replace('HomeScreen')}
              >
                <Icon type='FontAwesome5' name='home' style={Styling.white}/>
              </Button>
            </FooterTab>
        }
        {
          this.state.isLogin
            ?
            this.state.role === 3
              ?
              this.state.currentScreen === 'ProjectScreen'
                ? <FooterTab style={Styling.bgWhite}>
                  <Button
                    onPress={() => this.props.navigation.replace('ProjectScreen')}
                  >
                    <Icon type='FontAwesome5' name='briefcase' style={Styling.primary}/>
                  </Button>
                </FooterTab>
                : <FooterTab style={Styling.bgPrimary}>
                  <Button
                    onPress={() => this.props.navigation.replace('ProjectScreen')}
                  >
                    <Icon type='FontAwesome5' name='briefcase' style={Styling.white}/>
                  </Button>
                </FooterTab>
              : null
          : null
        }
        {
          this.state.isLogin
            ?
            this.state.currentScreen === 'ProfileScreen'
              ? <FooterTab style={Styling.bgWhite}>
                <Button
                  onPress={() => this.props.navigation.replace('ProfileScreen')}
                >
                  <Icon type='MaterialIcons' name='face' style={Styling.primary}/>
                </Button>
              </FooterTab>
              : <FooterTab style={Styling.bgPrimary}>
                <Button
                  onPress={() => this.props.navigation.replace('ProfileScreen')}
                >
                  <Icon type='MaterialIcons' name='face' style={Styling.white}/>
                </Button>
              </FooterTab>
            :
            this.state.currentScreen === 'LoginScreen'
              ? <FooterTab style={Styling.bgWhite}>
                <Button
                  onPress={() => this.props.navigation.replace('LoginScreen')}
                >
                  <Icon type='FontAwesome5' name='sign-in-alt' style={Styling.primary}/>
                </Button>
              </FooterTab>
              : <FooterTab style={Styling.bgPrimary}>
                <Button
                  onPress={() => this.props.navigation.replace('LoginScreen')}
                >
                  <Icon type='FontAwesome5' name='sign-in-alt' style={Styling.white}/>
                </Button>
              </FooterTab>
        }
      </Footer>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state,
  };
};

export default connect(mapStateToProps)(MenuFooter);
