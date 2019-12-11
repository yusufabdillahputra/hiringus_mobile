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
              <Col size={40} />
              <Col size={10}>
                <Icon style={Styling.primary} type="FontAwesome5" name="search" />
              </Col>
              <Col size={50}>
                <Icon style={Styling.primary} type="FontAwesome5" name="smile" />
              </Col>
            </Row>
            <Row>
              <Col size={2} />
              <Col size={98}>
                <Title style={Styling.primary}>Please fill search keyword</Title>
              </Col>
            </Row>
            <Row>
              <Col size={2} />
              <Col size={98}>
                <Title style={Styling.primary}>If result empty</Title>
              </Col>
            </Row>
            <Row>
              <Col size={2} />
              <Col size={98}>
                <Title style={Styling.primary}>Fell free to use search again</Title>
              </Col>
            </Row>
          </Grid>
        </Content>
      </Container>
    );
  }
}

export default LoadingScreen;
