import axios from "axios";
import { authActions } from "./auth-slice";

export const registerData = (registerData) => {
  return async () => {
    const fetchData = async () => {
      const response = await axios.post(
        "https://reqres.in/api/register",
        registerData
      );
      const data = response.status;
      return data;
    };

    try {
      console.log(await fetchData());
    } catch (error) {
      console.log(error);
    }
  };
};

export const loginData = (loginData) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await axios.post(
        "https://reqres.in/api/login",
        loginData
      );
      const data = await response.data;
      return data;
    };

    try {
      const dataLogin = await fetchData();
      localStorage.setItem('loginToken', dataLogin.token)
      dispatch(authActions.login(localStorage.getItem('loginToken')));
    } catch (error) {
      console.log(error);
    }
  };
};