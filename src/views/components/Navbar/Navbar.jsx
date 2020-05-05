import React from "react";
import { connect } from "react-redux";
import { logoutHandler, searchHandler } from "../../../redux/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons/";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import {
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";

import "./Navbar.css";
import { Link } from "react-router-dom";
import ButtonUI from "../Button/Button.tsx";

const CircleBg = ({ children }) => {
  return <div className="circle-bg">{children}</div>;
};

class Navbar extends React.Component {
  state = {
    searchBarIsFocused: false,
    searchBarInput: "",
    dropdownOpen: false,
  };

  // componentDidMount = () => {
  //   this.loadCartQty();
  // };

  // loadCartQty = () => {
  //   Axios.get(`${API_URL}/cart`, {
  //     params: {
  //       userId: this.props.user.id,
  //     },
  //   })
  //     .then((res) => {
  //       let cartQtyTemp = 0;
  //       res.data.map((val) => {
  //         cartQtyTemp += val.quantity;
  //       });
  //       this.setState({
  //         cartQty: cartQtyTemp,
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  searchBarInputHandler = (e) => {
    const res = e.target.value.toLowerCase();
    this.setState({
      searchBarInput: res,
    });
    this.props.searchHandler(res);
  };

  onFocus = () => {
    this.setState({ searchBarIsFocused: true });
  };

  onBlur = () => {
    this.setState({ searchBarIsFocused: false });
  };

  toggleDropdown = () => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  };

  render() {
    return (
      <div className="d-flex flex-row justify-content-between align-items-center py-4 navbar-container">
        <div className="logo-text">
          <Link style={{ textDecoration: "none", color: "inherit" }} to="/">
            LOGO
          </Link>
        </div>
        <div
          style={{ flex: 1 }}
          className="px-5 d-flex flex-row justify-content-start"
        >
          <input
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            className={`search-bar ${
              this.state.searchBarIsFocused ? "active" : null
            }`}
            type="text"
            placeholder="Cari produk impianmu disini"
            onChange={(e) => {
              this.searchBarInputHandler(e);
            }}
          />
        </div>
        <div
          className="d-flex flex-row align-items-center"
          style={{ cursor: "pointer" }}
        >
          {this.props.user.id ? (
            <>
              <Dropdown
                toggle={this.toggleDropdown}
                isOpen={this.state.dropdownOpen}
              >
                <DropdownToggle tag="div" className="d-flex">
                  <FontAwesomeIcon icon={faUser} style={{ fontSize: 24 }} />
                  <p className="small ml-3 mr-4">{this.props.user.username}</p>
                </DropdownToggle>
                <DropdownMenu className="mt-2">
                  {this.props.user.role === "admin" ? (
                    <>
                      <DropdownItem>
                        <Link
                          style={{ color: "inherit", textDecoration: "none" }}
                          to="/dashboard"
                        >
                          Dashboard
                        </Link>
                      </DropdownItem>
                      <DropdownItem>
                        <Link
                          style={{ color: "inherit", textDecoration: "none" }}
                          to="/member"
                        >
                          Members
                        </Link>
                      </DropdownItem>
                      <DropdownItem>
                        <Link
                          style={{ color: "inherit", textDecoration: "none" }}
                          to="/payment"
                        >
                          Payments
                        </Link>
                      </DropdownItem>
                      <DropdownItem>
                        <Link
                          style={{ color: "inherit", textDecoration: "none" }}
                          to="/report"
                        >
                          Report
                        </Link>
                      </DropdownItem>
                    </>
                  ) : (
                    <>
                      <DropdownItem>
                        <Link
                          style={{ color: "inherit", textDecoration: "none" }}
                          to="/wishlist"
                        >
                          Wishlist
                        </Link>
                      </DropdownItem>
                      <DropdownItem>
                        <Link
                          style={{ color: "inherit", textDecoration: "none" }}
                          to="/history"
                        >
                          History
                        </Link>
                      </DropdownItem>
                    </>
                  )}
                </DropdownMenu>
              </Dropdown>
              <Link to="/cart">
                <FontAwesomeIcon
                  className="mr-2"
                  icon={faShoppingCart}
                  style={{ fontSize: 24 }}
                />
              </Link>
              <CircleBg>
                <small style={{ color: "#3C64B1", fontWeight: "bold" }}>
                  {this.props.cart.cartQty}
                </small>
              </CircleBg>
              <Link to="/auth/login">
                <ButtonUI
                  className="ml-3"
                  type="textual"
                  func={this.props.logoutHandler}
                >
                  Logout
                </ButtonUI>
              </Link>
            </>
          ) : (
            <>
              <Link to="/auth/login">
                <ButtonUI className="mr-3" type="textual">
                  Sign in
                </ButtonUI>
              </Link>
              <Link to="/auth/register">
                <ButtonUI type="contained">Sign up</ButtonUI>
              </Link>
            </>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    search: state.search,
    cart: state.cart,
  };
};

export default connect(mapStateToProps, { logoutHandler, searchHandler })(
  Navbar
);
