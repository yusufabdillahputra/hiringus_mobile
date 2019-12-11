/**
 * Date : 11/12/2019
 * Time : 12:32
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

import React, { Component } from 'react';
import Styling from '../Global/StyleSheet';
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

class Project extends Component {
  render () {
    return (
      <Container>
        <Header transparent androidStatusBarColor={Styling.statusBar}>
          <Left style={{flex: 0.55}} />
          <Body>
            <Title style={Styling.primary}>All Projects</Title>
          </Body>
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

export default Project;
