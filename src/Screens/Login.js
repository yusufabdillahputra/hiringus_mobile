/**
 * Date : 11/12/2019
 * Time : 09:24
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

import React, { Component } from 'react';
import Styling from '../Global/StyleSheet';
import { Container, Header, Left, Icon, Content, Button, Text, View, Title } from 'native-base';
import MenuFooter from '../Global/Menu/MenuFooter';


class Login extends Component {
  render () {
    return (
      <Container>
        <Left style={{flex: 1}}>
          <Title style={Styling.primary}>Login</Title>
        </Left>
        <Content padder>
          <Text>Login</Text>
        </Content>
        <MenuFooter
          navigation={this.props.navigation}
        />
      </Container>
    );
  }
}

export default Login;
