import "./App.css";
import Auth from "./components/Auth";
import "antd/dist/antd.css";
import { Button, Descriptions, PageHeader } from "antd";
import { Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="site-page-header-ghost-wrapper">
      <PageHeader
        ghost={false}
        // onBack={() => window.history.back()}
        title="Movie Mania"
        extra={[
          <Link to="/login">Login</Link>,
          <Link to="/register">Register</Link>,
          <Link >Logout</Link>,
        ]}
      ></PageHeader>
      <Route path="/login">
        <Auth type="login" />
      </Route>
      <Route path="/register">
        <Auth type="register" />
      </Route>
    </div>
  );
}

export default App;
