import React, { Fragment } from "react";
import { Button, Space, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { loginData, registerData } from "../store/auth-slice";

const Auth = ({ type }) => {
  const dispatch = useDispatch();
  const login = useSelector((state) => state.auth.token);

  const onFinish = (values) => {
    if (type == "login") {
      dispatch(loginData(values));
    } else {
      dispatch(registerData(values));
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Fragment>
      {login ? <p>login</p> : <p>belum login</p>}
      <Space
        direction="horizontal"
        style={{ width: "100%", justifyContent: "center" }}
      >
        <h2>{type == "login" ? "Login" : "Register"}</h2>
      </Space>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 8,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 11,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Fragment>
  );
};

export default Auth;
