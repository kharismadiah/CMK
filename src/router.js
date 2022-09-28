import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { connect } from 'react-redux';
import App from './containers/App/App';
import asyncComponent from './helpers/AsyncFunc';
import Auth0 from './helpers/auth0';

const RestrictedRoute = ({ component: Component, isLoggedIn, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isLoggedIn ? (
        <Component {...props} />
      ) : (
          <Redirect
            to={{
              pathname: `${process.env.PUBLIC_URL}/signin`,
              state: { from: props.location },
            }}
          />
        )
    }
  />
);
const PublicRoutes = ({ history, isLoggedIn }) => {
  return (
    <ConnectedRouter history={history}>
      <div>
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/`}
          component={asyncComponent(() => import('./containers/Page/signin'))}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/404`}
          component={asyncComponent(() => import('./containers/Page/404'))}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/500`}
          component={asyncComponent(() => import('./containers/Page/500'))}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/signin`}
          component={asyncComponent(() => import('./containers/Page/signin'))}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/signup`}
          component={asyncComponent(() => import('./containers/Page/signup'))}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/forgotPassword`}
          component={asyncComponent(() =>
            import('./containers/Page/forgotPassword')
          )}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/resetPassword`}
          component={asyncComponent(() =>
            import('./containers/Page/resetPassword')
          )}
        />

        <Route
          path={`${process.env.PUBLIC_URL}/auth0loginCallback`}
          render={props => {
            Auth0.handleAuthentication(props);
          }}
        />
        <Route
          path={`${process.env.PUBLIC_URL}/FLK1`}
          component={asyncComponent(() =>
            import('./containers/Page/FLK')
          )}
        />

        <Route
          path={`${process.env.PUBLIC_URL}/FLK2`}
          component={asyncComponent(() =>
            import('./containers/Page/FLKProHire')
          )}
        />
        <RestrictedRoute
          path={`${process.env.PUBLIC_URL}/dashboard`}
          component={App}
          isLoggedIn={isLoggedIn}
        />
      </div>
    </ConnectedRouter>
  );
};

export default connect(state => ({
  isLoggedIn: true,
}))(PublicRoutes);
