import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import Cookie from "universal-cookie";
import { connect } from "react-redux";

import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

import Home from "./views/screens/Home/Home";
import Navbar from "./views/components/Navbar/Navbar";
import AuthScreen from "./views/screens/Auth/AuthScreen";
import { userKeepLogin, cookieChecker } from "./redux/actions";
import ProductDetails from "./views/screens/ProductDetails/ProductDetails";
import Cart from "./views/screens/Cart/Cart";
import AdminDashboard from "./views/screens/AdminDashboard/AdminDashboard";
import PaymentDetails from "./views/screens/Payment/PaymentDetails";
import Payment from "./views/screens/Payment/Payment";
import Member from "./views/screens/Members/Member";
import Wishlist from "./views/screens/Wishlist/Wishlist";
import History from "./views/screens/History/History";
import HistoryDetails from "./views/screens/History/HistoryDetails";
import PathNotFound from "./views/screens/NotFound/PathNotFound";
import Report from "./views/screens/Report/Report";

const cookieObj = new Cookie();

class App extends React.Component {
  componentDidMount() {
    let cookieResult = cookieObj.get("authData");
    if (cookieResult) {
      this.props.keepLogin(cookieResult);
    }
    this.props.cookieCheck();
  }

  renderAdminRoutes() {
    if (this.props.user.role === "admin") {
      return (
        <>
          <Route exact path="/dashboard" component={AdminDashboard} />
          <Route exact path="/member" component={Member} />
          <Route exact path="/report" component={Report} />
          <Route exact path="/payment" component={Payment} />
          <Route
            exact
            path="/payment/details/:transId"
            component={PaymentDetails}
          />
        </>
      );
    }
  }

  renderUserRoutes() {
    if (this.props.user.role === "user") {
      return (
        <>
          <Route exact path="/wishlist" component={Wishlist} />
          <Route exact path="/history" component={History} />
          <Route
            exact
            path="/history/detail/:transactionId"
            component={HistoryDetails}
          />
        </>
      );
    }
  }

  render() {
    if (this.props.user.cookieChecked) {
      return (
        <>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/auth/:type" component={AuthScreen} />
            <Route
              exact
              path="/product/:productId"
              component={ProductDetails}
            />
            <Route exact path="/cart" component={Cart} />
            {this.renderAdminRoutes()}
            {this.renderUserRoutes()}
            <Route path="*" component={PathNotFound} />
          </Switch>
          <div style={{ height: "120px" }} />
        </>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  keepLogin: userKeepLogin,
  cookieCheck: cookieChecker,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
