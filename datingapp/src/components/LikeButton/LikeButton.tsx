import React from "react";
import { Profile, User } from "../../api/login/models";
import requireLogin from "../../api/login/requireLogin";
import "./LikeButton.css";

interface Props {
  activated?: boolean;
  profile?: Profile;
  onClick?(this: LikeButton, e: React.MouseEvent<HTMLImageElement, MouseEvent>): void;
  onMount?(this: LikeButton): void;
}

interface State {
  activated: boolean;
}

class LikeButton extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      activated: typeof props.activated === "boolean" ? props.activated : false
    }
  }

  componentDidMount() {
    if (typeof this.props.onMount == "function") this.props.onMount.bind(this)();
  }

  render() {
    return (
      <div className="likeButton">
        <img src={"/img/" + (this.state.activated ? "heart_full.png" : "heart_empty.png")} onClick={async e => {
          let activated = !this.state.activated;
          const profile = this.props.profile;
          this.setState({
            activated
          });

          if (profile) {
            let user = User.currentUser;
  
            if (!user) {
              return requireLogin();
            }

            let liked = await profile.isLikedBy(user.id);

            activated = !liked;
            profile.like(user.accessToken, activated).then(res => {
              if (res.data) {
                alert(`You have matched with ${profile.fullName}!`);
              }
            });

            if (activated) profile.likes++;
            else profile.likes--;

            this.setState({
              activated
            });
          }

          if (typeof this.props.onClick === "function") this.props.onClick.bind(this)(e);
        }} />
      </div>
    );
  }
}

export default LikeButton;