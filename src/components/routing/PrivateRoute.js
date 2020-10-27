// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { Route, Redirect } from 'react-router-dom';
// import { connect } from 'react-redux';
// import auth from '../../reducers/auth';

// // interface IPrivateRoute {
// //   component: Component;
// //   auth: {
// //     isAuthenticated: boolean;
// //     loading: boolean;
// //   };
// //   rest: any;
// // }
// const PrivateRoute: React.FC<{
//   component: React.FC;
//   path: string;
//   exact: boolean;
//   auth: {
//     isAuthenticated: boolean;
//     loading: boolean;
//   };
// }> = (props) => {
//   const performValidationHere = () => {
//     if (!props.auth.isAuthenticated && !props.auth.loading) {
//       return false;
//     } else {
//       return true;
//     }
//   };

//   const condition = performValidationHere();

//   return condition ? (
//     <Route path={props.path} exact={props.exact} component={props.component} />
//   ) : (
//     <Redirect to='/' />
//   );
// };

// // PrivateRoute.propTypes = {
// //   auth: PropTypes.object,
// // };

// const mapStateToProps = (state: any) => ({
//   auth: state.auth,
// });

// export default connect(mapStateToProps)(PrivateRoute);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import auth from '../../reducers/auth';

const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading },
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      !isAuthenticated && !loading ? (
        <Redirect to='/' />
      ) : (
        <Component {...props} />
      )
    }
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
