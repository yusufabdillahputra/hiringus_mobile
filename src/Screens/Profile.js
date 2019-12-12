/**
 * Date : 11/12/2019
 * Time : 12:32
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

import React, { Component } from 'react';
import jwtDecode from 'jwt-decode'
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
import { readAllProjectSkillEngineer } from '../Utils/redux/actions/users/readAllProjectSkillEngineer';

class Profile extends Component {

  constructor (props) {
    super(props);

    this.state = {
      isLoading : true,
      idUsers : null,
      roleUsers : null,
      propsProfile : null
    }
  }

  async componentDidMount () {
    const jwt = await this.props.token;
    const decode = await jwtDecode(jwt);
    const idUsers = await decode.id_users;
    const roleUsers = await decode.role_users;
    await this.props.readById(idUsers, jwt);
    await this.setState({
      isLoading : false,
      idUsers : idUsers,
      roleUsers : roleUsers,
      propsProfile : this.props.profile
    })
    await console.log(this.state)
  }

  async logoutHandler () {
    await this.props.authentication();
    await this.props.readById();
    await setTimeout(() => {
      this.props.navigation.replace('HomeScreen')
    }, 1000)
  }

  render () {
    if (this.state.isLoading) {
      return <LoadingScreen
        color={'skyblue'}
      />
    } else {
      return (
        <Container>
          <Header transparent androidStatusBarColor={Styling.statusBar}>
            <Left style={{flex: 0.74}} />
            <Body>
              <Title style={Styling.primary}>Profile</Title>
            </Body>
          </Header>
          <Content padder>
            <Body>
              <Text>{this.state.propsProfile.name_users}</Text>

            </Body>
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
    token: state.Component_Authentication.token,
    profile: state.Users_readById.stateArray.rows[0]
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ authentication, readById }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
