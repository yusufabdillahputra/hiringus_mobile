/**
 * Date : 11/12/2019
 * Time : 09:16
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

import React, { Component } from 'react';
import { Image } from 'react-native';
import Styling from '../Global/StyleSheet';
import {
  Container,
  Header,
  Left,
  Right,
  Body,
  Content,
} from 'native-base';

/**
 * Globals
 */
import MenuFooter from '../Global/Menu/MenuFooter';
import LoadingScreen from '../Global/LoadingScreen';

class Home extends Component {

  constructor (props) {
    super(props);

    this.state = {
      isLoading: true
    }
  }

  componentDidMount () {
    setTimeout(() => {
      this.setState({
        isLoading: false
      })
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
            <Left style={{flex: 0.8}}/>
            <Body>
              <Image
                style={{
                  width: 135,
                  height: 50,
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
}

export default Home;
