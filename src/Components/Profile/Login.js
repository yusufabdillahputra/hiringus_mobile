/**
 * Date : 11/12/2019
 * Time : 09:24
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

import React, { Component } from 'react';
import { Image, AsyncStorage } from 'react-native';
import { post } from '../../Utils/axios';
import Styling from '../../Global/StyleSheet';
import { Row, Grid } from 'react-native-easy-grid';
import {
  Container,
  Header,
  Left,
  Icon,
  Content,
  Button,
  Text,
  Title,
  Body,
  Input,
  Item,
} from 'native-base';
import LoadingScreen from '../../Global/LoadingScreen';
import AlertCard from '../../Global/AlertCard';

/**
 * Redux Actions
 */
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { authentication } from '../../Utils/redux/actions/components/authentication'
import { readById } from '../../Utils/redux/actions/users/readById';
import jwtDecode from 'jwt-decode';

class Login extends Component {
  constructor (props) {
    super(props);

    this.state = {
      isSubmit: false,
      isAuth: false,
      propsUsers: null,
      username: null,
      password: null,
      showToast: false,
      color: null,
      title: null,
      subTitle: null
    };
  }

  async componentDidUpdate (prevProps, prevState) {
    if (prevState.isSubmit !== this.state.isSubmit) {
      if (this.state.username !== null && this.state.password !== null) {
        const body = {
          username_users: this.state.username,
          password_users: this.state.password,
        };
        const responseApi = await post('/auth/login', body);
        await this.isAuthentication(responseApi);
      } else {
        this.setState({
          isSubmit: false,
          showToast: true,
          color: '#d50000',
          title: 'Unauthorized',
          subTitle: 'Username or password empty'
        });
        setTimeout(() => {
          this.setState({
            showToast: false,
            color: null,
            title: null,
            subTitle: null
          });
        }, 2000);
      }
    }
  }

  async isAuthentication (responseApi) {
    const status = await responseApi.data.status;
    if (status === 200) {
      const token = await responseApi.data.payload.token;
      const decode = await jwtDecode(token);
      const idUsers = await decode.id_users;
      await this.props.readById(idUsers, token);
      await this.props.authentication(token);
      await this.setState({
        isAuth: true,
        isSubmit: false,
        showToast: true,
        color: '#28A745',
        title: 'Login Success',
        subTitle: 'Please wait, loading content...'
      });
      await setTimeout(() => {
        this.props.navigation.replace('HomeScreen')
      }, 2000)
    }
    if (status === 401) {
      this.setState({
        isSubmit: false,
        showToast: true,
        color: '#d50000',
        title: 'Unauthorized',
        subTitle: 'Username or password is wrong'
      });
      setTimeout(() => {
        this.setState({
          showToast: false,
          color: null,
          title: null,
          subTitle: null
        });
      }, 2000);
    }
  }

  async loginHandler () {
    await this.setState({
      isSubmit: true,
    });
  }

  render () {
    if (this.state.isSubmit) {
      return <LoadingScreen
        color={'skyblue'}
      />;
    } else {
      return (
        <Container>
          <Header transparent androidStatusBarColor={Styling.statusBar}>
            <Left>
              <Button
                iconLeft
                transparent
                onPress={
                  () => this.props.navigation.replace('HomeScreen')
                }
              >
                <Icon style={Styling.primary} type="MaterialIcons" name="chevron-left"/>
              </Button>
            </Left>
            <Body>
              <Title style={{
                color: Styling.primary.color,
                marginLeft: 49,
              }}>Login</Title>
            </Body>
          </Header>
          <Content padder style={Styling.bgWhite}>
            <Body>
              <Image
                style={{
                  width: 200,
                  height: 100,
                  resizeMode: 'contain',
                }}
                source={require('../../Assets/Image/Logo/logo_transparent.png')}
              />
            </Body>
            <Body>
              <Item
                rounded
                style={{
                  backgroundColor: Styling.white.color,
                }}
              >
                <Icon
                  active
                  type='SimpleLineIcons'
                  name='user'
                  style={{
                    paddingLeft: 30,
                  }}
                />
                <Input
                  placeholder='Username'
                  onChangeText={
                    async value => {
                      await this.setState({
                        username: value,
                      });
                    }
                  }
                />
              </Item>
              <Item
                rounded
                style={{
                  marginTop: 10,
                  backgroundColor: Styling.white.color,
                }}
              >
                <Icon
                  active
                  type='SimpleLineIcons'
                  name='key'
                  style={{
                    paddingLeft: 30,
                  }}
                />
                <Input
                  placeholder='Password'
                  secureTextEntry={true}
                  onChangeText={
                    async value => {
                      await this.setState({
                        password: value,
                      });
                    }
                  }
                />
              </Item>
            </Body>

            <Button
              rounded
              block
              style={{
                backgroundColor: Styling.primary.color,
                marginTop: 50,
              }}
              onPress={
                () => this.loginHandler()
              }
            >
              <Text>Login</Text>
            </Button>
            <Button
              rounded
              bordered
              block
              info
              style={{
                marginTop: 10,
              }}
              onPress={
                () => this.props.navigation.replace('RegisterScreen')
              }
            >
              <Text>Register</Text>
            </Button>
            {
              this.state.showToast
                ? <AlertCard
                  marginTop={20}
                  bgColor={this.state.color}
                  title={this.state.title}
                  subTitle={this.state.subTitle}
                />
                : null
            }

          </Content>
        </Container>
      );
    }
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ authentication, readById }, dispatch)
}

export default connect(null, mapDispatchToProps)(Login);
