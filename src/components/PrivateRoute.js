import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

@inject('userStore', 'commonStore')
@observer
export default class PrivateRoute extends React.Component {
  render() {
    const { userStore, component: Component, ...restProps } = this.props;
    if (userStore.currentUser) return <Component  {...restProps} />;
    return <Redirect to="/login" />;
  }
}
