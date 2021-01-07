import React from 'react';
import './login.css';
import Content from '../../components/Content/Content';
import LoginForm from '../../components/LoginForm/LoginForm';
import Center from '../../components/Center/Center';

function P_Login() {
  return (
    <Content>
      <Center>
        <div>
          <LoginForm onLogin = {r => {
            if (r.success) {
              let params = new URLSearchParams(window.location.search);
              if (params.has("ref")) {
                window.location.href = params.get("ref");
              }
              else {
                window.location.href = "/";
              }
            }
          }}/>
          <a href="/register">Don't have an account?</a>
        </div>
      </Center>
    </Content>
  );
}

export default P_Login;
