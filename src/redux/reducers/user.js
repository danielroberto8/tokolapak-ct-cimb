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
};

export default (state = init_state, action) => {
  switch (action.type) {
    case ON_USER_INPUT:
      return { ...state, username: action.payload };
    case ON_LOGIN_SUCCESS:
      swal("Yeay!", "Login berhasil", "success");
      const { username, fullName, role, id } = action.payload;
      return {
        ...state,
        username,
        fullName,
        role,
        id,
      };
    case ON_LOGIN_FAIL:
      swal("Oops...", action.payload, "error");
      return { ...state, errMsg: action.payload };
    case ON_REGISTER_FAIL:
      swal("Oops...", action.payload, "error");
      return { ...state, errMsg: action.payload };
    case ON_LOGOUT_SUCCESS:
      return { ...init_state };
    default:
      return { ...state };
  }
};
