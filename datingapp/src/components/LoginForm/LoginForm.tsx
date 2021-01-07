import React, { ChangeEvent, FormEvent } from 'react';
import Auth from "../../api/login/login";
import { Result, User } from '../../api/login/models';
import "./LoginForm.css"

interface Props {
  onLogin?: (result: Result<User>) => void
}

class LoginForm extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props);
    this.state = {};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: ChangeEvent<HTMLInputElement>) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFeedback("Logging in...", "info");
    Auth.login(this.state.username, this.state.password)
    .then(r => {
      setFeedback(r.reason ? r.reason : "", r.success ? "info" : "error");
      if (this.props.onLogin) this.props.onLogin(r);
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="loginForm">
        <Feedback/>
        <label>Username</label>
        <br/>
        <input name="username" type="text" onChange={this.handleChange} />
        <br/>
        <label>Password</label>
        <br/>
        <input name="password" type="password" onChange={this.handleChange} />
        <br/>

        <input type="submit" value="Login"/>
      </form>
    );
  }
}

type MessageType = "info" | "error";
let setFeedback: (message: string, type: MessageType) => void;

class Feedback extends React.Component<{}, {message: string, type: MessageType}> {
  constructor(props: {}) {
    super(props);
    this.state = {
      message: "",
      type: "info"
    };
  }

  componentDidMount() {
    setFeedback = (message, type) => {
      this.setState({
        message,
        type
      })
    };
  }

  render() {
    return (<div className="loginFeedback">{this.state.message}</div>);
  }
}

export default LoginForm;