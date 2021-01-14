import React from "react";
import { Profile, User } from "../../api/login/models";
import Center from "../Center/Center";
import LikeButton from "../LikeButton/LikeButton";
import "./ProfileCard.css"

interface ProfileCardProps {
  profile: Profile,
  style?: React.CSSProperties,
  this?: (card: ProfileCard) => void;
}

export class ProfileCard extends React.Component<ProfileCardProps, ProfileCardProps> {
  constructor(props: ProfileCardProps) {
    super(props);
    this.state = {
      profile: props.profile,
      style: props.style || {},
      this: props.this
    };
  }

  componentDidMount() {
    this.mounted = true;
    if (typeof this.props.this == "function") this.props.this(this);
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  public mounted: boolean = false;
  
  render() {
    const { age, bio, fullName, height, id, likes, pfp, weight } = (this.state.profile || {
      age: 0,
      bio: "Loading..."
    });
    const maxBioLength = 50;
    const profile = this.state.profile;
    const user = User.currentUser;
    return (
      <div className="profileCard" style={this.props.style}>
        <a href={"/profile/" + id}><img src={pfp} className="pfp" alt="Profile pfp"/></a>
        <Center>
          <div>
            <h2>{fullName}</h2>
            <i>{bio.length < maxBioLength ? bio : bio.substring(0, maxBioLength - 3) + "..."}</i>
            <hr/>
            <span>{likes} yikes</span>
            <div style={{display: "flex", justifyContent: "center"}}>
              {!(user && user.id === id) ? (<LikeButton profile={profile} onMount={async function() {
                if (user) {
                  let activated = await profile.isLikedBy(user.id);
                  
                  this.setState({
                    activated
                  });
                }
              }} onClick={() => {
                this.setState({});
              }} />) : ""}
            </div>
            <br/>
            <span>{age} years old</span>
            <br/>
            <span>{height || "Unset"} cm</span>
            <br/>
            <span>{weight || "Unset"} kg</span>
          </div>
        </Center>
      </div>
    );
  }
}

export default ProfileCard;