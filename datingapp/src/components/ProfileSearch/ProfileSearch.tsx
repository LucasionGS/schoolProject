import React from 'react';
import { Profile } from '../../api/login/models';
import ProfileCard from '../ProfileCard/ProfileCard';
import "./ProfileSearch.css";

interface Props<SearchParameters> {
  onSearch?(search: SearchParameters): void;
  onResult?(profiles: Profile[]): void;
  children?: React.ReactElement<ProfileSearchItem> | React.ReactElement<ProfileSearchItem>[]
}

class ProfileSearch<SearchParameters extends {} = {}> extends React.Component<Props<SearchParameters>, SearchParameters> {
  data: {[key: string]: ProfileSearchItem} = {};

  search(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    let data: SearchParameters = {} as SearchParameters;
    for (const key in this.data) {
      if (Object.prototype.hasOwnProperty.call(this.data, key)) {
        const v = this.data[key];
        (data as any)[key] = v.input.current.type === "number" || v.input.current.type === "range" ? v.input.current.valueAsNumber : v.input.current.value;
      }
    }

    if (typeof this.props.onSearch == "function") this.props.onSearch(data);
    // Get Profiles
    Profile.searchProfiles(data)
    .then(res => {
      if (res.success) {
        if (typeof this.props.onResult == "function") this.props.onResult(res.data);
      }
    });
    
    return data;
  }

  render() {
    return (
      <>
        <div className="profileSearch">
          {this.props.children}
        </div>
        {typeof this.props.onSearch == "function" || typeof this.props.onResult == "function" ? (<div style={{textAlign: "center"}}>
          <button onClick={this.search.bind(this)} style={{fontSize: 24}}>Search</button>
        </div>) : ""}
      </>
    );
  }
}

interface ProfileSearchItemProps {
  displayName?: string;
  name: string;
  type?: "text" | "number" | "range";
  initial?: string | number;
  unit?: string;
  parentRef: React.MutableRefObject<ProfileSearch>
  onChange?(this: ProfileSearchItem, event: React.ChangeEvent<HTMLInputElement>): void
}

interface ProfileSearchItemPropsTypeText extends ProfileSearchItemProps {
  type?: "text";
  initial?: string;
}

interface ProfileSearchItemPropsTypeNumber extends ProfileSearchItemProps {
  type: "number" | "range";
  min?: number;
  max?: number;
  initial?: number;
}

type ProfileSearchItemPropsTypes = ProfileSearchItemPropsTypeText | ProfileSearchItemPropsTypeNumber;

export class ProfileSearchItem extends React.Component<ProfileSearchItemPropsTypes, {displayValue?: number | string}> {
  constructor(props: ProfileSearchItemPropsTypes) {
    super(props);
    this.state = {
      displayValue: (typeof this.props.initial !== "undefined" ? this.props.initial : "")
    };
  }

  input: React.MutableRefObject<HTMLInputElement> = React.createRef<HTMLInputElement>();
  
  componentDidMount() {
    if (this.input.current.type === "number" || this.input.current.type === "range") {
      if (typeof this.props.initial !== "undefined") {
        this.input.current.valueAsNumber = this.props.initial as number;
      }
      else if (typeof (this.props as ProfileSearchItemPropsTypeNumber).min !== "undefined") {
        this.input.current.valueAsNumber = (this.props as ProfileSearchItemPropsTypeNumber).min
      }
    }
    else {
      if (typeof this.props.initial !== "undefined") {
        this.input.current.value = this.props.initial as string;
      }
    }
    setTimeout(() => {
      this.props.parentRef.current.data[this.props.name] = this;
    }, 0);
  }
  
  render() {
    var elm: JSX.Element;
    return (
      <div className="profileSearchItem">
        <h3>{this.props.displayName || this.props.name}</h3>
        {(() => {
          switch (this.props.type) {
            case "range":
              elm = (
                <>
                  <span>{(this.state.displayValue || 0) + " " + (this.props.unit || "")}</span>
                  <input
                    type={this.props.type}
                    name={this.props.name}
                    max={this.props.max}
                    min={this.props.min}
                    ref={this.input}
                    onChange={e => {
                      this.setState({displayValue: e.target.valueAsNumber});
                      if (typeof this.props.onChange === "function") this.props.onChange.bind(this)(e);
                    }}
                  />
                </>
              );
              return elm;
              case "number":
              elm = (
                <input
                  type={this.props.type}
                  name={this.props.name}
                  max={this.props.max}
                  min={this.props.min}
                  ref={this.input}
                  onChange={this.props.onChange.bind(this)}
                />
              );
              return elm;
              
              default:
              elm = (
              <input
                type={this.props.type}
                name={this.props.name}
                ref={this.input}
                onChange={this.props.onChange.bind(this)}
              />);
              return elm;
          }
        })()}
      </div>
    );
  }
}

interface ProfileContainerProps {
  profiles: Profile[];
}

export class ProfileContainer extends React.Component<ProfileContainerProps, ProfileContainerProps> {
  constructor(props: ProfileContainerProps) {
    super(props);
    this.state = {
      profiles: props.profiles
    };
  }
  profileCards: ProfileCard[] = [];
  
  componentDidUpdate() {
    console.log(this.profileCards);
    this.profileCards.forEach(p => {
      if (p.mounted) {
        p.setState({profile: p.props.profile})
      }
    });
    // this.profileCards = [];
  }
  
  render() {
    let elm = (
      <div className="profileContainer">
        {this.state.profiles.map(p => {
          return (
            <ProfileCard profile={p} style={{width: "20%"}} this={card => this.profileCards.push(card)}/>
          );
        })}
      </div>
    );
    return elm;
  }
}

export default ProfileSearch;