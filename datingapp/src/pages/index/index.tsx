import React from 'react';
import './index.css';
import Content from '../../components/Content/Content';
import Strike from '../../components/Strike/Strike';
import Underline from '../../components/Underline/Underline';
import Center from '../../components/Center/Center';

function P_Index() {
  return (
    <Content>
      <Center>
        <h1>Welcome to Toxinder!</h1>
      </Center>
      <b>
        <Underline>
          <Center>
            <div>
              The app that is totally not a ripoff of Tinder and my <a title="Shameless self-promotion" href="https://toxen.net">Toxen</a> app
            </div>
          </Center>
        </Underline>
      </b>
      <br/>
      <br/>
      On here you will find all sorts of weird fuck shit that you would <i><Underline>never</Underline></i> imagine seeing with your own eyes!
    </Content>
  );
}

export default P_Index;
