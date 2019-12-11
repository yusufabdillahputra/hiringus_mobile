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

class Profile extends Component {
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

          </Content>
          <MenuFooter
            navigation={this.props.navigation}
          />
        </Container>
      </>
    );
  }
}

export default Profile;
