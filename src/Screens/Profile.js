/**
 * Date : 11/12/2019
 * Time : 12:32
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

import React, { Component } from 'react';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {
  Container,
  Header,
  Left,
  Icon,
  Button,
  Text,
  Content,
  View, Body, Title, Right,
} from 'native-base';
import MenuFooter from '../Global/Menu/MenuFooter';
import Styling from '../Global/StyleSheet';

/**
 * Redux
 */
import { bindActionCreators } from 'redux';
import { authentication } from '../Utils/redux/actions/components/authentication';
import { connect } from 'react-redux';

class Profile extends Component {

  async logoutHandler () {
    await this.props.authentication();
    await setTimeout(() => {
      this.props.navigation.navigate('HomeScreen')
    }, 1000)
  }

  render () {
    return (
      <>
        <Container>
          <Header transparent androidStatusBarColor={Styling.statusBar}>
            <Left style={{flex: 0.74}} />
            <Body>
              <Title style={Styling.primary}>Profile</Title>
            </Body>
          </Header>
          <Content padder>
            <Button
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
      </>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ authentication }, dispatch)
}

export default connect(null, mapDispatchToProps)(Profile);
