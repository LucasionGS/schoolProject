import React, { ChangeEvent, FormEvent, ReactNode } from 'react';
import {DateTools} from "../../Tools";

interface Props {
  onSubmit(event: FormEvent<HTMLFormElement>): void | boolean;
  /**
   * Form inputs to generate
   */
  formData: FormInputData,
  createContent(
    formInputElements: FormInputElements
  ): JSX.Element
  // children: React.ReactElement<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>>[];
}

class Form extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props);
    this.state = {};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const target = event.target;
    const name = target.name;
    const value = target.tagName == "TEXTAREA" ?
      (target as HTMLTextAreaElement).value
      : (this.props.formData[name].type == "date" ? (target as HTMLInputElement).valueAsDate : (target as HTMLInputElement).value);

    try {
      this.props.formData[name].value = value;
    } catch (error) {
      console.error(`Unable to assign "${name}"`);
    }

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event: FormEvent<HTMLFormElement>) {
    if (typeof this.props.onSubmit == "function") return this.props.onSubmit(event);
  }

  componentDidMount() {
    if (this.onMount) this.onMount();
  }

  onMount: () => void;

  formInputElements: FormInputElements;

  render() {

    return (
      <form onSubmit={this.handleSubmit}>
        {(() => {
          let data: { [name: string]: React.ReactElement<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>> } = {};
          for (const key in this.props.formData) {
            if (Object.prototype.hasOwnProperty.call(this.props.formData, key)) {
              const value = this.props.formData[key];
              if (value.type == "textarea") data[key] = (
                <textarea
                  style={{
                    maxWidth: "100%",
                    width: "100%",
                    height: 320,
                    resize: 'none'
                  }}
                  name={key}
                  onChange={this.handleChange}
                  defaultValue={value.value as string}
                />
              );
              else data[key] = (
                <input
                  name={key}
                  defaultValue={value.type == "date" ? DateTools.dateToValue(value.value as Date) : value.value as string}
                  type={value.type}
                  onChange={this.handleChange}
                />
              );
            }
          }
          this.formInputElements = data;
          return this.props.createContent(data);
        })()}
      </form>
    );
  }
}

export interface FormInputData {
  [name: string]: {
    value: number | string | Date,
    type: "number" | "string" | "date" | "textarea"
  }
}

export interface FormInputElements {
  [name: string]: React.ReactElement<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>>
}

export default Form;