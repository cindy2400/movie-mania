import { createSlice, configureStore } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLogin: false,
  token: "",
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialState,
  reducers: {
    login(state, action) {
      state.isLogin = true;
      state.token = action.payload;
    },
    logout(state) {
      state.isLogin = false;
      state.token = "";
    },
  },
});

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
      dispatch(authActions.login(dataLogin.token));
    } catch (error) {
      console.log(error);
    }
  };
};

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export const authActions = authSlice.actions;
export default store;
