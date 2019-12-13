/**
 * Date : 11/12/2019
 * Time : 17:03
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

import React, { Component } from 'react';
import jwtDecode from 'jwt-decode'
import {
  Card,
  CardItem,
  Title,
  Body,
  Text,
  Button,
  Right,
  Left, Picker,
} from 'native-base';
import Styling from '../../Global/StyleSheet';

/**
 * Redux Actions
 */
import { connect } from 'react-redux';
import { readByIdUsersProjectEngineer } from '../../Utils/redux/actions/project/readByIdUsersProjectEngineer';
import LoadingContent from '../../Global/LoadingContent';
import BadgeGlobal from '../../Global/BadgeGlobal';

class ProjectList extends Component {

  constructor (props) {
    super(props);

    this.state = {
      isLoading : true,
      propsProject: null,
      propsProfile: null
    }
  }

  async componentDidMount () {
    const token = this.props.data.Component_Authentication.token
    const decode = await jwtDecode(token);
    const idUsers = await decode.id_users
    const propsProject = await this.setPropsProject(idUsers, token);
    await this.setState({
      isLoading: false,
      propsProject : propsProject,
      propsProfile: this.props.propsProfile
    })
  }

  async setPropsProject (idUsers, jwt) {
    const project = await this.props.dispatch(readByIdUsersProjectEngineer(idUsers, jwt));
    return project.value.data.payload.rows;
  }

  render () {
    if (this.state.isLoading) {
      return <LoadingContent
        color={'skyblue'}
      />
    } else {
      const { propsProject } = this.state
      return (
        <Card style={{
          borderRadius: 8
        }}>
          <CardItem header bordered style={{
            backgroundColor: Styling.white.color,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8
          }}>
            <Body>
              <Title
                style={{
                  color: Styling.primary.color
                }}
              >List Project</Title>
            </Body>
            <Right>
              <Text>
                {propsProject.length}
              </Text>
            </Right>
          </CardItem>
          {
            propsProject.length > 0
              ? propsProject.map((item, index) => {
                return <CardItem key={index}>
                  <Body>
                    <Button
                      transparent
                      onPress={
                        () => this.props.navigation.replace('ProjectOptionScreen', {
                          idProjectEngineer: item.id_project_engineer,
                          updatedBy: this.state.propsProfile.id_users,
                          name: item.name_project,
                          deadline: item.deadline_project,
                          jwt: this.props.data.Component_Authentication.token
                        })
                      }
                    >
                      <Text>
                        {item.name_project}
                      </Text>
                    </Button>
                  </Body>
                  <Right>
                    <BadgeGlobal
                      status={item.status_project_engineer}
                    />
                  </Right>
                </CardItem>;
              })
              : null
          }
          <CardItem
            style={{
              backgroundColor: Styling.black.color,
              borderBottomLeftRadius: 8,
              borderBottomRightRadius: 8,
              paddingBottom: 0
            }}
          />
        </Card>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    data: state,
  };
};

export default connect(mapStateToProps)(ProjectList);
