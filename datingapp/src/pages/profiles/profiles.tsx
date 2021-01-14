import React from 'react';
import './profiles.css';
import Content from '../../components/Content/Content';
import Center from '../../components/Center/Center';
import ProfileSearch, {ProfileContainer, ProfileSearchItem} from '../../components/ProfileSearch/ProfileSearch';
import ProfileCard from '../../components/ProfileCard/ProfileCard';

interface SearchParameters {
  minAge: number;
  maxAge: number;
  minHeight: number;
  maxHeight: number;
  minWeight: number;
  maxWeight: number;
}

function P_Profiles() {
  let ps = React.createRef<ProfileSearch<SearchParameters>>();
  let pc = React.createRef<ProfileContainer>();
  return (
    <Content>
      <Center><h1>Search profiles!</h1></Center>
      {/* Minimum */}
      <ProfileSearch<SearchParameters>>
        <ProfileSearchItem
          onChange={function(e) {
            let obj = this.props.parentRef.current.data["maxAge"];
            if (obj.input.current.valueAsNumber < this.input.current.valueAsNumber) {
              obj.input.current.valueAsNumber = this.input.current.valueAsNumber;
              obj.setState({displayValue: obj.input.current.valueAsNumber});
            }
          }}
          parentRef={ps} displayName="Min Age" name="minAge" type="range" min={18} max={99} initial={18} unit="years" />
        <ProfileSearchItem
          onChange={function(e) {
            let obj = this.props.parentRef.current.data["maxHeight"];
            if (obj.input.current.valueAsNumber < this.input.current.valueAsNumber) {
              obj.input.current.valueAsNumber = this.input.current.valueAsNumber;
              obj.setState({displayValue: obj.input.current.valueAsNumber});
            }
          }}
          parentRef={ps} displayName="Min Height" name="minHeight" type="range" min={0} max={1000} initial={0} unit="cm"/>
        <ProfileSearchItem
          onChange={function(e) {
            let obj = this.props.parentRef.current.data["maxWeight"];
            if (obj.input.current.valueAsNumber < this.input.current.valueAsNumber) {
              obj.input.current.valueAsNumber = this.input.current.valueAsNumber;
              obj.setState({displayValue: obj.input.current.valueAsNumber});
            }
          }}
          parentRef={ps} displayName="Min Weight" name="minWeight" type="range" min={0} max={1000} initial={0} unit="kg"/>
      </ProfileSearch>

      {/* Maximum */}
      <ProfileSearch<SearchParameters>
        ref={ps}
        onSearch={search => {
          console.log(search);
        }}
        onResult={profiles => {
          console.log(profiles);
          pc.current.setState({
            profiles: profiles
          })
        }}
      >
        <ProfileSearchItem
          onChange={function(e) {
            let obj = this.props.parentRef.current.data["minAge"];
            if (obj.input.current.valueAsNumber > this.input.current.valueAsNumber) {
              obj.input.current.valueAsNumber = this.input.current.valueAsNumber;
              obj.setState({displayValue: obj.input.current.valueAsNumber});
            }
          }}
          parentRef={ps} displayName="Max Age" name="maxAge" type="range" min={18} max={99} initial={99} unit="years" />
        <ProfileSearchItem
          onChange={function(e) {
            let obj = this.props.parentRef.current.data["minHeight"];
            if (obj.input.current.valueAsNumber > this.input.current.valueAsNumber) {
              obj.input.current.valueAsNumber = this.input.current.valueAsNumber;
              obj.setState({displayValue: obj.input.current.valueAsNumber});
            }
          }}
          parentRef={ps} displayName="Max Height" name="maxHeight" type="range" min={0} max={1000} initial={300} unit="cm"/>
        <ProfileSearchItem
          onChange={function(e) {
            let obj = this.props.parentRef.current.data["minWeight"];
            if (obj.input.current.valueAsNumber > this.input.current.valueAsNumber) {
              obj.input.current.valueAsNumber = this.input.current.valueAsNumber;
              obj.setState({displayValue: obj.input.current.valueAsNumber});
            }
          }}
          parentRef={ps} displayName="Max Weight" name="maxWeight" type="range" min={0} max={1000} initial={300} unit="kg"/>
      </ProfileSearch>
      
      <ProfileContainer ref={pc} profiles={[]} />
    </Content>
  );
}

export default P_Profiles;
