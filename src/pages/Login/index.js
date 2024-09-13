import './index.scss'
import React from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { useDispatch } from 'react-redux';
import { fetchLogin } from '@/store/modules/user';
import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async(values) => {
    console.log('Success===============', values);

    // 触发异步action fetchLogin  
    // 同样使用dispatch触发，在组件中需要用钩子函数useDispatch触发

    await dispatch(fetchLogin(values));

    // 登录之后的逻辑
    // 1. 跳转到首页
     navigate('/')

    // 2. 提示用户登陆成功
    message.success('登录成功')
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className="login-container"> 
      <div className="card">
        <Form name="basic" labelCol={{ span: 8, }} 
          wrapperCol={{ span: 16,}}
          style={{ width: '400px', marginTop: '70px', marginLeft: '-100px'}} 
          initialValues={{remember: true,}}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          validateTrigger="onBlur"
        >
          <Form.Item
            label="账号"
            name="mobile"
            // 多条校验逻辑 先校验第一条 第一条通过之后在校验第二条
            rules={[
              {
                required: true,
                message: '请输入手机号',
              },
              {
                pattern: /^1[3-9]\d{9}$/,
                message: '请输入正确的手机号格式'
              }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="验证码"
            name="code"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit" style={{width: '265px'}}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login