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

/**
 * Redux Actions
 */
import { connect } from 'react-redux';
import { readByCreatedBy } from '../Utils/redux/actions/project/readByCreatedBy';
import LoadingScreen from '../Global/LoadingScreen';
import EmptyResponse from '../Global/EmptyResponse';
import ProjectCard from '../Components/Project/ProjectCard';

class Project extends Component {
  constructor (props) {
    super(props);

    this.state = {
      isUnauthorized: false,
      isLoading: true,
      propsProject: null,
    }
  }

  async componentDidMount () {
    const jwt = await this.props.data.Component_Authentication.token;
    if (jwt !== null) {
      const propsProject = await this.setPropsProject(jwt);
      const statusApi = await propsProject.status;
      if (statusApi === 200) {
        await this.setState({
          isUnauthorized: true,
          isLoading: false,
          propsProject: propsProject.payload.rows,
        });
      } else {
        this.setState({
          isLoading: false,
          isUnauthorized: false
        })
        this.props.navigation.replace('LoginScreen')
      }
    }
    if (jwt === null) {
      this.setState({
        isLoading: false,
        isUnauthorized: false
      })
      this.props.navigation.replace('LoginScreen')
    }
  }

  async setPropsProject (jwt = null) {
    const project = await this.props.dispatch(readByCreatedBy(jwt));
    return project.value.data;
  }


  render () {
    if (this.state.isLoading) {
      return <LoadingScreen color={'skyblue'}/>;
    } else {
      const { propsProject } = this.state
      return (
        <Container>
          <Header transparent androidStatusBarColor={Styling.statusBar}>
            <Left style={{flex: 0.77}} >
              <Button
                iconRight
                transparent
                onPress={
                  () => this.props.navigation.replace('ProjectCreate')
                }
              >
                <Icon style={Styling.primary} type="FontAwesome5" name="plus" />
              </Button>
            </Left>
            <Body>
              <Title style={Styling.primary}>All Projects</Title>
            </Body>
            <Right style={{flex: 0.35}}>
              <Button
                iconRight
                transparent
                onPress={
                  () => this.props.navigation.replace('ProjectSearchScreen')
                }
              >
                <Icon style={Styling.primary} type="FontAwesome5" name="search" />
              </Button>
            </Right>
          </Header>
          <Content padder>
            {
              propsProject !== null
                ? propsProject.map((item, index) => {
                  return <ProjectCard
                    id={item.id_project}
                    name={item.name_project}
                    deadline={item.deadline_project}
                    navigation={this.props.navigation}
                    key={index}
                  />
                })
                : <EmptyResponse />
            }
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
  console.log(state)
  return {
    data: state,
  };
};

export default connect(mapStateToProps)(Project);
