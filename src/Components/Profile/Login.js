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
    };
  }

  async componentDidUpdate (prevProps, prevState) {
    if (prevState.isSubmit !== this.state.isSubmit) {
      const body = {
        username_users: this.state.username,
        password_users: this.state.password,
      };
      const responseApi = await post('/auth/login', body);
      await console.log(responseApi);
      await this.isAuthentication(responseApi);
    }
  }

  async isAuthentication (responseApi) {
    const status = await responseApi.data.status;
    if (status === 200) {
      const token = await responseApi.data.payload.token;
      await AsyncStorage.clear();
      await AsyncStorage.setItem('jwt', token);
      await this.setState({
        isAuth: true,
        isSubmit: false,
      });
      await this.props.navigation.navigate('HomeScreen')
    }
    if (status === 401) {
      this.setState({
        isSubmit: false,
        showToast: true,
      });
      setTimeout(() => {
        this.setState({
          showToast: false,
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
                  () => this.props.navigation.goBack()
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
          <Grid>
            <Row size={60}>
              <Content padder style={Styling.bgPrimary}>
                <Body>
                  <Image
                    style={{
                      width: 200,
                      height: 100,
                      resizeMode: 'contain',
                    }}
                    source={require('../../Assets/Image/Logo/logo_transparent_white.png')}
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
                      marginTop: 20,
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
              </Content>
            </Row>
            <Row size={40}>
              <Content padder>
                <Button
                  rounded
                  block
                  style={{
                    backgroundColor: Styling.primary.color,
                    marginTop: 10,
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
                    marginTop: 20,
                  }}
                  onPress={
                    () => this.props.navigation.navigate('RegisterScreen')
                  }
                >
                  <Text>Register</Text>
                </Button>
                {
                  this.state.showToast
                    ? <AlertCard
                      marginTop={20}
                      bgColor={'#d50000'}
                      title={'401, Unauthorized'}
                      subTitle={'Username or password is wrong'}
                    />
                    : null
                }
              </Content>
            </Row>
          </Grid>
        </Container>
      );
    }
  }
}

export default Login;
