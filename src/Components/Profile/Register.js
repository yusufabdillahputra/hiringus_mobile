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
  Picker,
  Form,
} from 'native-base';
import LoadingScreen from '../../Global/LoadingScreen';
import AlertCard from '../../Global/AlertCard';

/**
 * Redux Actions
 */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { authentication } from '../../Utils/redux/actions/components/authentication';
import { readById } from '../../Utils/redux/actions/users/readById';
import jwtDecode from 'jwt-decode';

class Register extends Component {
  constructor (props) {
    super(props);

    this.state = {
      isSubmit: false,
      isAuth: false,
      propsUsers: null,
      showToast: false,
      color: null,
      title: null,
      subTitle: null,
      name: null,
      username: null,
      password: null,
      email: null,
      role: null,
    };
  }

  async componentDidUpdate (prevProps, prevState) {
    if (prevState.isSubmit !== this.state.isSubmit) {
      await console.log(this.state)
      if (this.state.name !== null && this.state.username !== null && this.state.password !== null && this.state.email !== null && this.state.role !== 0) {
        const body = {
          name_users: this.state.name,
          username_users: this.state.username,
          password_users: this.state.password,
          email_users: this.state.email,
          role_users: this.state.role,
        };
        const responseApi = await post('/auth/register', body);
        await this.isNotUnique(responseApi);
      } else {
        this.setState({
          isSubmit: false,
          showToast: true,
          color: '#d50000',
          title: 'Required',
          subTitle: 'All form cannot be empty',
        });
        setTimeout(() => {
          this.setState({
            showToast: false,
            color: null,
            title: null,
            subTitle: null,
          });
        }, 2000);
      }
    }
  }

  /**
   * Check is not unique, using error code 23505 postgresql
   * DOC : https://www.postgresql.org/docs/9.2/errcodes-appendix.html
   *
   * @param responseApi
   */
  async isNotUnique (responseApi) {
    const responseApiCode = responseApi.data.payload.code;
    const uniqueErrorCatchCode = "23502";
    await console.log(responseApi)
    if (responseApiCode === uniqueErrorCatchCode) {
      await this.setState({
        isSubmit: false,
        showToast: true,
        color: '#d50000',
        title: 'Unique',
        subTitle: 'Username or email already taken',
      });
      setTimeout(async () => {
        await this.setState({
          showToast: false,
          color: null,
          title: null,
          subTitle: null,
        });
        this.props.navigation.replace('RegisterScreen')
      }, 2000);
    }
    if (responseApiCode !== uniqueErrorCatchCode) {
      this.setState({
        isSubmit: false,
        showToast: true,
        color: '#28A745',
        title: 'Success',
        subTitle: 'please wait for auto redirect in 2 seconds',
      });
      setTimeout(() => {
        this.setState({
          showToast: false,
          color: null,
          title: null,
          subTitle: null,
        });
        this.props.navigation.replace('LoginScreen')
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
                  () => this.props.navigation.replace('LoginScreen')
                }
              >
                <Icon style={Styling.primary} type="MaterialIcons" name="chevron-left"/>
              </Button>
            </Left>
            <Body>
              <Title style={{
                color: Styling.primary.color,
                marginLeft: 38,
              }}>Register</Title>
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
                <Form>
                  <Item
                    picker
                    rounded
                    style={{
                      backgroundColor: Styling.white.color,
                    }}
                  >
                  <Picker
                    mode="dropdown"
                    style={{
                      marginLeft: 30,
                      marginRight: 30,
                    }}
                    selectedValue={this.state.role}
                    onValueChange={
                      async value => {
                        await this.setState({
                          role: value,
                        });
                      }
                    }
                  >
                    <Picker.Item label="-- Select your role --" value="0"/>
                    <Picker.Item label="Engineer" value="2"/>
                    <Picker.Item label="Partner" value="3"/>
                  </Picker>
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
                      type='FontAwesome5'
                      name='id-card'
                      style={{
                        paddingLeft: 30,
                      }}
                    />
                    <Input
                      placeholder='Name'
                      onChangeText={
                        async value => {
                          await this.setState({
                            name: value,
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
                      onChangeText={
                        async value => {
                          await this.setState({
                            password: value,
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
                      name='envelope'
                      style={{
                        paddingLeft: 30,
                      }}
                    />
                    <Input
                      placeholder='Email'
                      onChangeText={
                        async value => {
                          await this.setState({
                            email: value,
                          });
                        }
                      }
                    />
                  </Item>
                </Form>
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
                  <Text>Submit</Text>
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
                    () => this.props.navigation.replace('LoginScreen')
                  }
                >
                  <Text>Back to login</Text>
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
            </Row>
          </Grid>
        </Container>
    );
    }
    }
    }

    const mapDispatchToProps = dispatch => {
      return bindActionCreators({authentication, readById}, dispatch);
    };

    export default connect(null, mapDispatchToProps)(Register);
