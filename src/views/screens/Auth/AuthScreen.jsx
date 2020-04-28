import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import swal from "sweetalert";
import { loginHandler, registerHandler } from "../../../redux/actions";
import TextField from "../../components/TextField/TextField";
import ButtonUI from "../../components/Button/Button";
import Cookie from "universal-cookie";

const cookieObject = new Cookie();

class AuthScreen extends React.Component {
  //rombak state!
  state = {
    usernameLogin: "",
    passwordLogin: "",
    showPasswordLogin: false,
    usernameRegis: "",
    emailRegis: "",
    passwordRegis: "",
    showPasswordRegis: false,
    passwordConfirm: "",
  };

  componentDidUpdate() {
    if (this.props.user.username != "") {
      cookieObject.set("authData", JSON.stringify(this.props.user));
    }
  }

  inputHandler = (e, field) => {
    this.setState({ [field]: e.target.value });
  };

  // checkPassword = (pass, passconfirm) => {
  //   if (pass == passconfirm) {
  //     return true;
  //   }
  //   return false;
  // };

  checkBoxHandler = (e, field) => {
    const { checked } = e.target;

    this.setState({
      [field]: checked,
    });
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
    if (usernameRegis == "" || passwordRegis == "") {
      return swal(
        "Oops...",
        "Form tidak boleh ada yang kosong hyung",
        "warning"
      );
    }
    // if (!this.checkPassword(passwordRegis, passwordConfirm)) {
    //   return swal("Oops...", "Password tidak cucok", "error");
    // }

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
                  value={this.state.usernameLogin}
                  onChange={(e) => {
                    this.inputHandler(e, "usernameLogin");
                  }}
                />
                <TextField
                  placeholder="Password"
                  className="mt-2"
                  value={this.state.passwordLogin}
                  type={this.state.showPasswordLogin ? "text" : "password"}
                  onChange={(e) => {
                    this.inputHandler(e, "passwordLogin");
                  }}
                />
                <input
                  type="checkbox"
                  className="mt-3"
                  name="showPasswordLogin"
                  onChange={(e) => {
                    this.checkBoxHandler(e, "showPasswordLogin");
                  }}
                />{" "}
                Tampilkan password
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
                  value={this.state.usernameRegis}
                  onChange={(e) => {
                    this.inputHandler(e, "usernameRegis");
                  }}
                />
                <TextField
                  placeholder="Email"
                  className="mt-2"
                  type="email"
                  // onChange={(e) => {
                  //   this.inputHandler(e, "usernameRegis");
                  // }}
                />
                <TextField
                  placeholder="Password"
                  className="mt-2"
                  value={this.state.passwordRegis}
                  type={this.state.showPasswordRegis ? "text" : "password"}
                  onChange={(e) => {
                    this.inputHandler(e, "passwordRegis");
                  }}
                />
                {/* <TextField
                  placeholder="Confirm Password"
                  className="mt-2"
                  value={this.state.passwordConfirm}
                  onChange={(e) => {
                    this.inputHandler(e, "passwordConfirm");
                  }}
                /> */}
                <input
                  type="checkbox"
                  className="mt-3"
                  name="showPasswordRegis"
                  onChange={(e) => {
                    this.checkBoxHandler(e, "showPasswordRegis");
                  }}
                />{" "}
                Tampilkan password
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

const mapDispatchToProps = {
<<<<<<< HEAD
  loginHandler: loginHandler,
  registerHandler: registerHandler,
=======
  onRegister: registerHandler,
  onLogin: loginHandler,
>>>>>>> f86fce85423ff90d22cec77cbdd6f8e9a566db3e
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);
