import userTypes from "../types/user";
import swal from "sweetalert";

const {
  ON_USER_INPUT,
  ON_LOGIN_FAIL,
  ON_LOGIN_SUCCESS,
  ON_LOGOUT_SUCCESS,
  ON_REGISTER_FAIL,
} = userTypes;

const init_state = {
  id: 0,
  username: "",
  fullName: "",
  address: {},
  role: "",
  errMsg: "",
  isLogged: false,
  cookieChecked: false,
};

export default (state = init_state, action) => {
  switch (action.type) {
    case ON_USER_INPUT:
      return { ...state, username: action.payload, cookieChecked: true };
    case ON_LOGIN_SUCCESS:
      swal("Yeay!", "Login berhasil", "success");
      const { username, fullName, role, id } = action.payload;
      return {
        ...state,
        username,
        fullName,
        role,
        id,
        isLogged: true,
        cookieChecked: true,
      };
    case ON_LOGIN_FAIL:
      swal("Oops...", action.payload, "error");
      return { ...state, errMsg: action.payload, cookieChecked: true };
    case ON_REGISTER_FAIL:
      swal("Oops...", action.payload, "error");
      return { ...state, errMsg: action.payload, cookieChecked: true };
    case ON_LOGOUT_SUCCESS:
      return { ...init_state, isLogged: false, cookieChecked: true };
    case "COOKIE_CHECK":
      return { ...init_state, cookieChecked: true };
    default:
      return { ...state };
  }
};
