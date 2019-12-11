/**
 * Date : 11/12/2019
 * Time : 09:16
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

import React, { Component } from 'react';
import { Image } from 'react-native';
import Styling from '../Global/StyleSheet';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {
  Container,
  Header,
  Left,
  Right,
  Icon,
  Body,
  Content,
  Title,
  Text,
  Button,
  Footer,
  FooterTab
} from 'native-base'

/**
 * Globals
 */
import MenuFooter from '../Global/Menu/MenuFooter';

class Home extends Component {
  render () {
    return (
      <Container>
        <Header style={Styling.bgWhite} androidStatusBarColor={Styling.statusBar}>
          <Left style={{flex:0.8}} />
          <Body>
            <Image
              style={{
                width: 135,
                height:50
              }}
              source={require('../Assets/Image/Logo/logo_transparent.png')}
            />
          </Body>
          <Right/>
        </Header>
        <Content padder>

        </Content>
        <MenuFooter
          navigation={this.props.navigation}
        />
      </Container>
    );
  }
}

export default Home;
