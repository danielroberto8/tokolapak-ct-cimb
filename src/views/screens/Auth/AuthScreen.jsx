import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import swal from "sweetalert";
import { loginHandler, registerHandler } from "../../../redux/actions";
import TextField from "../../components/TextField/TextField";
import ButtonUI from "../../components/Button/Button";

class AuthScreen extends React.Component {
  state = {
    users: "",
    usernameLogin: "",
    passwordLogin: "",
    usernameRegis: "",
    passwordRegis: "",
    passwordConfirm: "",
  };

  inputHandler = (e, field) => {
    this.setState({ [field]: e.target.value });
  };

  checkPassword = (pass, passconfirm) => {
    if (pass == passconfirm) {
      return true;
    }
    return false;
  };

  clearState = () => {
    this.setState({
      usernameLogin: "",
      passwordLogin: "",
      usernameRegis: "",
      passwordRegis: "",
      passwordConfirm: "",
    });
  };

  login = () => {
    const { usernameLogin, passwordLogin } = this.state;

    if (usernameLogin == "") {
      return swal("Oops...", "username tidak boleh kosong", "warning");
    }

    if (passwordLogin == "") {
      return swal("Oops...", "password tidak boleh kosong", "warning");
    }

    const userData = {
      username: usernameLogin,
      password: passwordLogin,
    };

    this.clearState();
    this.props.loginHandler(userData);
  };

  register = () => {
    const { usernameRegis, passwordRegis, passwordConfirm } = this.state;
    if (usernameRegis == "" || passwordRegis == "" || passwordConfirm == "") {
      return swal(
        "Oops...",
        "Form tidak boleh ada yang kosong hyung",
        "warning"
      );
    }
    if (!this.checkPassword(passwordRegis, passwordConfirm)) {
      return swal("Oops...", "Password tidak cucok", "error");
    }

    const userData = {
      username: usernameRegis,
      password: passwordRegis,
      role: "user",
    };

    this.clearState();
    this.props.registerHandler(userData);
  };

  render() {
    if (this.props.match.params.type == "login") {
      return (
        <div className="container">
          <div className="row mt-5">
            <div className="col-5">
              <div>
                <h3>Log In</h3>
                <p className="mt-4">
                  Welcome back.
                  <br /> Please, login to your account
                </p>
                <TextField
                  placeholder="Username"
                  className="mt-5"
                  onChange={(e) => {
                    this.inputHandler(e, "usernameLogin");
                  }}
                  value={this.state.usernameLogin}
                />
                <TextField
                  placeholder="Password"
                  className="mt-2"
                  onChange={(e) => {
                    this.inputHandler(e, "passwordLogin");
                  }}
                  value={this.state.passwordLogin}
                />
                <div className="d-flex justify-content-center">
                  <ButtonUI type="contained" className="mt-4" func={this.login}>
                    Login
                  </ButtonUI>
                </div>
              </div>
            </div>
            <div className="col-7">Picture</div>
          </div>
        </div>
      );
    } else if (this.props.match.params.type == "register") {
      return (
        <div className="container">
          <div className="row mt-5">
            <div className="col-5">
              <div>
                <h3>Register</h3>
                <p className="mt-4">Daftar dulu ya bageur</p>
                <TextField
                  placeholder="Username"
                  className="mt-5"
                  onChange={(e) => {
                    this.inputHandler(e, "usernameRegis");
                  }}
                />
                <TextField
                  placeholder="Password"
                  className="mt-2"
                  onChange={(e) => {
                    this.inputHandler(e, "passwordRegis");
                  }}
                />
                <TextField
                  placeholder="Confirm Password"
                  className="mt-2"
                  onChange={(e) => {
                    this.inputHandler(e, "passwordConfirm");
                  }}
                />
                <div className="d-flex justify-content-center">
                  <ButtonUI
                    type="contained"
                    className="mt-4"
                    func={this.register}
                  >
                    Register
                  </ButtonUI>
                </div>
              </div>
            </div>
            <div className="col-7">Picture</div>
          </div>
        </div>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, {
  loginHandler,
  registerHandler,
})(AuthScreen);
