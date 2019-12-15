/**
 * Date : 11/12/2019
 * Time : 17:45
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

import React, { Component } from 'react';
import Styling from '../Global/StyleSheet';
import { Col, Row, Grid } from "react-native-easy-grid";
import {
  Container,
  Header,
  Title,
  Icon,
  Content,
} from 'native-base';

class LoadingScreen extends Component {
  render () {
    return (
      <Container>
        <Header transparent androidStatusBarColor={Styling.statusBar} />
        <Content padder>
          <Grid>
            <Row>
              <Col size={45} />
              <Col size={55}>
                <Icon style={Styling.primary} type="FontAwesome5" name="smile" />
              </Col>
            </Row>
            <Row>
              <Col size={2} />
              <Col size={98}>
                <Title style={Styling.primary}>{this.props.message}</Title>
              </Col>
            </Row>
          </Grid>
        </Content>
      </Container>
    );
  }
}

export default LoadingScreen;
