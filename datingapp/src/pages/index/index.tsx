import React from 'react';
import './index.css';
import Content from '../../components/Content/Content';
import Underline from '../../components/Underline/Underline';
import Center from '../../components/Center/Center';
import { User } from '../../api/login/models';

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
              The app that is totally not a ripoff of a generic dating site and my <a title="Shameless self-promotion" href="https://toxen.net">Toxen</a> app
            </div>
          </Center>
        </Underline>
      </b>
      <br/>
      <br />
      <Center>
        <div>
          On here you will find all sorts of weird fuck shit that you would <i><Underline>never</Underline></i> imagine seeing with your own eyes!
          <br/>
          Find your dream match with our <i><Underline>flawless</Underline></i> <a href="/profiles">Profile search</a>!
        </div>

        <Underline><a href={User && User.currentUser ? "/profiles" : "/register"}><h2>{User && User.currentUser ? "Get smashing" : "Get started"}</h2></a></Underline>
      </Center>
    </Content>
  );
}

export default P_Index;
