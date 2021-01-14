import React from 'react';
import './register.css';
import Content from '../../components/Content/Content';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import Auth from '../../api/login/login';
import Center from '../../components/Center/Center';

function P_Register() {
  return (
    <Content>
      <Center>
        <div>
          <RegistrationForm onRegistration = {(r) => {
            if (r.success) {
              Auth.login(r.data.token).then(r => {
                if (r.success) {
                  let params = new URLSearchParams(window.location.search);
                  if (params.has("ref")) {
                    window.location.href = params.get("ref");
                  }
                  else {
                    window.location.href = "/profile/" + r.data.id;
                  }
                }
              });
            }
          }}/>
          <a href="/login">Already have an account?</a>
        </div>
      </Center>
    </Content>
  );
}

export default P_Register;
