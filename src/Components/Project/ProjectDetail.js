/**
 * Date : 11/12/2019
 * Time : 22:36
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

import React, { Component } from 'react';
import {
  Container,
  Header,
  Left,
  Icon,
  Button,
  Content,
  Item,
  Input,
  Body,
  Title, CardItem, Text, Card,
} from 'native-base';
import Styling from '../../Global/StyleSheet';
import LoadingScreen from '../../Global/LoadingScreen';

/**
 * Redux Actions
 */
import { connect } from 'react-redux';
import ProjectCard from './ProjectCard';
import moment from 'moment';

class ProjectDetail extends Component {
  constructor (props) {
    super(props);

    this.state = {
      isLoading: true,
      propsProject: null
    };
  }

  async componentDidMount () {
    await this.setState({
      isLoading: false,
      propsProject: this.props.navigation.state.params.propsProject
    })
  }

  render () {
    if (this.state.isLoading) {
      return <LoadingScreen
        color={'skyblue'}
      />;
    } else {
      const { propsProject } = this.state
      return (
        <Container>
          <Header transparent androidStatusBarColor={Styling.statusBar}>
            <Left>
              <Button
                iconLeft
                transparent
                onPress={
                  () => this.props.navigation.replace('ProjectScreen')
                }
              >
                <Icon style={Styling.primary} type="MaterialIcons" name="chevron-left"/>
              </Button>
            </Left>
            <Body>
              <Title style={{
                color: Styling.primary.color,
                marginLeft: 14,
              }}>Detail Project</Title>
            </Body>
          </Header>
          <Content padder>
            <Card
              style={{
                borderRadius: 8,
              }}
            >
              <CardItem
                header
                bordered
                style={{
                  backgroundColor: Styling.white.color,
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8,
                }}>
                <Body>
                  <Title
                    style={{
                      color: Styling.primary.color,
                    }}
                  >
                    {propsProject.name_project}
                  </Title>
                </Body>
              </CardItem>
              <CardItem
                bordered
              >
                <Left>
                  <Text>
                    Expires
                  </Text>
                </Left>
                <Body>
                  <Text>
                    {moment(propsProject.deadline_project, "YYYYMMDD").fromNow()}
                  </Text>
                </Body>
              </CardItem>
              <CardItem
                bordered
              >
                <Left>
                  <Text>
                    Fee
                  </Text>
                </Left>
                <Body>
                  <Text>
                    Rp. {propsProject.fee_project}
                  </Text>
                </Body>
              </CardItem>
              <CardItem
                bordered
              >
                <Left>
                  <Title
                    style={{
                      color: Styling.primary.color,
                    }}
                  >
                    Description
                  </Title>
                </Left>
              </CardItem>
              <CardItem
                bordered
                style={{
                  borderBottomLeftRadius: 8,
                  borderBottomRightRadius: 8,
                }}
              >
                <Body>
                  <Text>
                    {propsProject.description_project}
                  </Text>
                </Body>
              </CardItem>
            </Card>
            <Title
              style={{
                color: Styling.primary.color,
                marginTop: 20
              }}
            >
              Engineer
            </Title>
          </Content>
        </Container>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    data: state,
  };
};

export default connect(mapStateToProps)(ProjectDetail);
