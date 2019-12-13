/**
 * Date : 11/12/2019
 * Time : 12:32
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';
import {
  Container,
  Header,
  Left,
  Icon,
  Button,
  Text,
  Content,
  Body,
  Title,
  Right,
  Card,
  CardItem
} from 'native-base';
import MenuFooter from '../Global/Menu/MenuFooter';
import Styling from '../Global/StyleSheet';

/**
 * Redux
 */
import { bindActionCreators } from 'redux';
import { authentication } from '../Utils/redux/actions/components/authentication';
import { readById } from '../Utils/redux/actions/users/readById';
import { connect } from 'react-redux';
import LoadingScreen from '../Global/LoadingScreen';
import ProjectList from '../Components/Profile/ProjectList';
import { baseUriApi } from '../Utils/axios';
import { Image } from 'react-native';

class Profile extends Component {

  constructor (props) {
    super(props);

    this.state = {
      isLoading: true,
      idUsers: null,
      roleUsers: null,
      propsProfile: null,
    };
  }

  async componentDidMount () {
    const jwt = await this.props.auth;
    if (jwt.isFulfilled) {
      const decode = await jwtDecode(jwt.token);
      const idUsers = await decode.id_users;
      const roleUsers = await decode.role_users;
      await this.setState({
        isLoading: false,
        idUsers: idUsers,
        roleUsers: roleUsers,
        propsProfile: this.props.profile.stateArray.rows[0],
      });
    } else {
      return this.props.navigation.replace('LoginScreen');
    }
  }

  async logoutHandler () {
    await this.setState({
      isLoading: true,
    });
    await this.props.authentication();
    await this.props.readById();
    await setTimeout(() => {
      this.props.navigation.replace('HomeScreen');
    }, 200);
  }

  render () {
    if (this.state.isLoading) {
      return <LoadingScreen
        color={'skyblue'}
      />;
    } else {
      const {propsProfile} = this.state;
      return (
        <Container>
          <Header transparent androidStatusBarColor={Styling.statusBar}>
            <Left style={{flex: 0.74}}/>
            <Body>
              <Title style={Styling.primary}>Profile</Title>
            </Body>
          </Header>
          <Image
            source={{
              uri: `${baseUriApi}/${propsProfile.role_name}/${propsProfile.photo_users}`,
            }}
            style={{height: 200, width: null, resizeMode: 'stretch'}}
          />
          <Content padder>
            <Card
              style={{
                borderRadius: 8,
              }}
            >
              <CardItem
                bordered
                header
                style={{
                  backgroundColor: Styling.white.color,
                  borderTopRightRadius: 8,
                  borderTopLeftRadius: 8,
                }}
              >
                <Title
                  style={Styling.primary}
                >
                  {this.state.propsProfile.name_users}
                </Title>
              </CardItem>
              <CardItem
                bordered
              >
                <Title
                  style={Styling.primary}
                >
                  {this.state.propsProfile.role_name}
                </Title>
              </CardItem>
              <CardItem
                bordered
                style={{
                  backgroundColor: Styling.black.color,
                  borderBottomRightRadius: 8,
                  borderBottomLeftRadius: 8,
                  paddingBottom: 0
                }}
              />
            </Card>
            {
              propsProfile.role_users === 2
                ? <ProjectList
                  propsProfile={propsProfile}
                  navigation={this.props.navigation}
                />
                : null
            }
            <Button
              block
              rounded
              danger
              onPress={
                () => this.logoutHandler()
              }
            >
              <Text>Logout</Text>
            </Button>
          </Content>
          <MenuFooter
            navigation={this.props.navigation}
          />
        </Container>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    auth: state.Component_Authentication,
    profile: state.Users_readById,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({authentication, readById}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
