import React from 'react';
import './profile.css';
import Content from '../../components/Content/Content';
import { config, Profile, ProfileSQL, Result, User } from '../../api/login/models';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import requireLogin from '../../api/login/requireLogin';
import Form, { FormInputData, FormInputElements } from '../../components/Form/Form';
const { baseLoginUrl } = config;

class P_Profile extends React.Component<{}, {profile: Profile}> {
  constructor(props: any) {
    super(props);
    this.state = {
      profile: null
    }
  }
  
  componentDidMount() {
    let identifier = window.location.pathname.split("/").pop();
    Profile.getProfile((!isNaN(+identifier) ? +identifier : identifier) as any).then(res => {
      if (res.success) {
        console.log(res.data);
        
        this.setState({
          profile: res.data
        });
      }
      else {
        requireLogin();
      }
    })
  }
  
  render() {
    const profile = this.state.profile;
    const isMyProfile = User.currentUser && profile && User.currentUser.id === profile.id;
    let formInputData: FormInputData;
    return (
      <Content className="profile_content">
        <div id="profile_infopanel">
          {profile ? (
          <ProfileCard profile={profile} />
          ) : ""}
          {isMyProfile ? (
            <>
              <p>Upload profile picture</p>
              <input type="file" onChange={e => this.uploadProfilePicture(e.target.files[0], profile).then(res => {
                if (res.success) {
                  window.location.reload();
                }
                else {
                  alert(res.reason);
                }
              })}/>
            </>
          ) : ""}
        </div>
        <div id="profile_details">
        {isMyProfile ? (
          // FIXME: Create the ability to modify your profile.
          <>
            <Form
              formData={(formInputData = {
                "fullName": {
                  value: profile.fullName,
                  type: "string"
                },
                "birthdate": {
                  value: profile.birthdate,
                  type: "date"
                },
                "bio": {
                  value: profile.bio,
                  type: "textarea"
                },
                "country": {
                  value: profile.country,
                  type: "string"
                },
                "weight": {
                  value: profile.weight,
                  type: "number"
                },
                "height": {
                  value: profile.height,
                  type: "number"
                },
              })}
              createContent={data => {
                return (
                  <>
                    <span style={{color: "gray", fontSize: 16}}>({profile.username})</span>
                    <br/>
                    {data.fullName}
                    <div><b>Birthday</b> {data.birthdate}</div>
                    <hr/>
                    {data.bio}
                    <hr/>
                    <p>Country</p>
                    {data.country}
                    <hr/>
                    <p>Weight</p>
                    {data.weight}
                    <p>Height</p>
                    {data.height}

                    <br/><br/>
                    <input type="submit" value="Update Profile" />
                  </>
                );
              }}
              onSubmit={e => {
                e.preventDefault();
                for (const key in formInputData) {
                  if (Object.prototype.hasOwnProperty.call(formInputData, key)) {
                    const v = formInputData[key];
                    (profile as any)[key] = v.value;
                  }
                }

                let pfpSplit = profile.pfp.split("/");
                profile.pfp = pfpSplit[pfpSplit.length - 1];

                profile.updateProfile().then(res => {
                  if (res.success) {
                    window.location.reload();
                  }
                });
              }}
            />
          </>
        ) : profile ? (
          <>
            <h1>{profile.fullName} <span style={{color: "gray", fontSize: 16}}>({profile.username})</span></h1>
            <div><b>Birthday</b> {profile.birthdate.toLocaleDateString()}</div>
            <hr/>
            <p>{profile.bio}</p>
            <hr/>
            <div><b>Country</b> {profile.country}</div>
            <hr/>
            <div><b>Weight</b> {profile.weight} kg</div>
            <div><b>Height</b> {profile.height} cm</div>
          </>
        ) : ""}
        </div>
      </Content>
    );
  }
  
  async uploadProfilePicture(file: File, profile: Profile): Promise<Result<Profile>> {
    if (!file) return new Result(false, "No file provided.");
    let resolve: (value?: Result<Profile> | PromiseLike<Result<Profile>>) => void;
    let promise = new Promise<Result>(res => resolve = res);

    let user = User.currentUser;
    if (!user) {
      requireLogin();
      return new Result(false, "Not logged in");
    }
    else if (user.id !== profile.id) {
      requireLogin(true);
      return new Result(false, "Not logged in as correct user.");
    }
    
    let data = new FormData();
    data.append("pfp", file);
    data.append("token", user.accessToken);
  
    let httpReq = new XMLHttpRequest();
    httpReq.open("POST", baseLoginUrl + "/api/uploadProfilePicture.php");
  
    // Request finished
    httpReq.addEventListener("load", () => {
      try {
        let res: Result<ProfileSQL> = JSON.parse(httpReq.response);

        if (res.success) {
          resolve(new Result(true, res.reason, Profile.mapToProfile(res.data)));
        }
        else {
          resolve(new Result(false, res.reason));
        }
      } catch (error) {
        console.error(httpReq.response);
        resolve(new Result(false, "An error uploading the image"));
      }
    });
  
    httpReq.send(data);
  
    return promise;
  }
}


export default P_Profile;
