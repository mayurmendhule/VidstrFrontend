import { loginStart, loginSuccess, loginFailure, logout } from "./userRedux";
import axios from "axios";

export const login = async (dispatch, user) => {
  dispatch(loginStart());

  try {
    const res = await axios.post("https://backendvidstr.onrender.com/api/users/login", user);
    dispatch(loginSuccess(res.data));
    res.data && window.location.replace("/");
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const Logout = async (dispatch) => {
  dispatch(logout());
  window.location.href = "/";
};
