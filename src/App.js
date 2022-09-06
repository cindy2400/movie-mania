import "./App.css";
import Auth from "./components/Auth";
import "antd/dist/antd.css";
import { PageHeader } from "antd";
import { Route, Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/auth-slice";

function App() {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.auth.isLogin);

  const logoutHandler = () => {
    dispatch(authActions.logout());
  };

  return (
    <div className="site-page-header-ghost-wrapper">
      <PageHeader
        ghost={false}
        title="Movie Mania"
        extra={
          isLogin
            ? [
                <Link key="3" to="/logout" onClick={logoutHandler}>
                  Logout
                </Link>,
              ]
            : [
                <Link key="1" to="/login">
                  Login
                </Link>,
                <Link key="2" to="/register">
                  Register
                </Link>,
              ]
        }
      ></PageHeader>
      <Route path="/login">
        <Auth type="login" />
      </Route>
      <Route path="/register">
        <Auth type="register" />
      </Route>
      <Route path="/logout" exact>
        <Redirect to="/login" />
      </Route>
    </div>
  );
}

export default App;
