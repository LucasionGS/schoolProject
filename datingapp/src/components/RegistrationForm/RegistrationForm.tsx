import React, { ChangeEvent, FormEvent } from 'react';
import Auth from "../../api/login/login";
import { Result } from '../../api/login/models';
import "./RegistrationForm.css"

interface Props {
  onRegistration?: (result: Result<{ token: string; }>) => void
}

class RegistrationForm extends React.Component<Props, any> {
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
    setFeedback("Checkin database...", "info");
    Auth.register(this.state.username, this.state.email, this.state.password, this.state.confirmpassword)
    .then(r => {
      setFeedback(r.reason ? r.reason : "", r.success ? "info" : "error");
      if (this.props.onRegistration) this.props.onRegistration(r);
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Feedback/>
        <label>Username</label>
        <br/>
        <input name="username" type="text" onChange={this.handleChange} />
        <br/>
        <label>Email</label>
        <br/>
        <input name="email" type="email" onChange={this.handleChange} />
        <br/>
        <label>Password</label>
        <br/>
        <input name="password" type="password" onChange={this.handleChange} />
        <br/>
        <label>Confirm Password</label>
        <br/>
        <input name="confirmpassword" type="password" onChange={this.handleChange} />
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

export default RegistrationForm;