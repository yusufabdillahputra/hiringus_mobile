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
  Title
} from 'native-base';
import Styling from '../../Global/StyleSheet';
import LoadingScreen from '../../Global/LoadingScreen';

/**
 * Redux Actions
 */
import { connect } from 'react-redux';
import EmptySearch from '../../Global/EmptySearch';
import ProjectCard from './ProjectCard';
import { readByCreatedBy } from '../../Utils/redux/actions/project/readByCreatedBy';

class ProjectSearch extends Component {
  constructor (props) {
    super(props);

    this.state = {
      isSearching: false,
      propsProject: null,
      searchKeyword: null,
    };
  }

  async componentDidUpdate (prevProps, prevState) {
    if (prevState.isSearching !== this.state.isSearching) {
      const jwt = await this.props.data.Component_Authentication.token;
      const propsProject = await this.setPropsProject(jwt, 'name_project', this.state.searchKeyword);
      await this.setState({
        isSearching: false,
        propsProject: propsProject,
      });
    }
  }

  async setPropsProject (jwt = null, fieldName = null, fieldValue = null) {
    const project = await this.props.dispatch(readByCreatedBy(jwt, fieldName, fieldValue));
    return project.value.data.payload.rows;
  }

  async searchHandle () {
    await this.setState({
      isSearching: true,
    });
  }

  render () {
    if (this.state.isSearching) {
      return <LoadingScreen
        color={'skyblue'}
      />;
    } else {
      const {propsProject} = this.state;
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
              }}>Search Project</Title>
            </Body>
          </Header>
          <Header transparent androidStatusBarColor={Styling.statusBar}>
            <Body>
              <Item rounded>
                <Input
                  style={{
                    paddingLeft: 30,
                  }}
                  placeholder='By name.....'
                  onChangeText={
                    async value => {
                      await this.setState({
                        searchKeyword: value,
                      });
                    }
                  }
                />
                <Button
                  transparent
                  onPress={
                    () => this.searchHandle()
                  }
                >
                  <Icon active name='search'/>
                </Button>
              </Item>
            </Body>
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
                : <EmptySearch />
            }
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

export default connect(mapStateToProps)(ProjectSearch);
