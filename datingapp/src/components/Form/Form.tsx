import React, { ChangeEvent, FormEvent, ReactNode } from 'react';

interface Props {
  onSubmit(event: FormEvent<HTMLFormElement>): void | boolean;
  children: React.ReactElement<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>>[];
}

class Form extends React.Component<Props, any> {
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
    if (typeof this.props.onSubmit == "function") return this.props.onSubmit(event);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.props.children.map(e => {
          e.props.onChange = this.handleChange;
        })}
      </form>
    );
  }
}

export default Form;