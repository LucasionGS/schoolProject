import React from "react";
import { DateTools } from "../../Tools";

export const config: typeof import("./config.json") = require("./config.json");
console.log(config);
const { baseLoginUrl } = config;

export interface UserSQL {
  id: number,
  username: string,
  email: string,
  accessToken: string,
}

export interface ProfileSQL {
  id: number;
  fullName: string;
  likes: number;
  pfp: string;
  bio: string;
  birthdate: {
    date: string;
    timezone: string;
    timezone_type: number;
  }
  country: string;
  height: number;
  weight: number;
  username: string;
}

export class Result<DataType = any>
{
  public success: boolean;
  public reason: string = null;
  public data: DataType = null;
  constructor(success: boolean, reason: string = null, data: DataType = null) {
    this.success = success;
    if (reason != null) this.reason = reason;

    if (data != null) {
      this.data = data;
    }
  }
}

export class User {
  private profile: Profile = null;
  public async getProfile(): Promise<Profile> {
    if (this.profile instanceof Profile) return this.profile;
    return (this.profile = await Profile.getProfile(this.id).then(res => res.success ? res.data : null));
  }
  constructor(
    public id: number,
    public username: string,
    public email: string,
    public accessToken: string,
  ) { }

  /**
   * Map a UserSQL object to a User instance
   */
  public static mapToUser(data: UserSQL) {
    return new User(
      data.id,
      data.username,
      data.email,
      data.accessToken,
    );
  }

  /**
   * Sets this user as the currently logged in user.
   */
  public setAsCurrentUser() {
    User.setCurrentUser(this);
  }

  /**
   * Sets the passed user as the currently logged in user.
   */
  public static setCurrentUser(user: User) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  public static logout() {
    window.localStorage.removeItem("user");
  }

  /**
   * Get or set the current user.
   */
  public static get currentUser(): User {
    if (this._curUsr instanceof User) {
      return this._curUsr;
    }
    return (this._curUsr = (localStorage.getItem("user") != null ? User.mapToUser(JSON.parse(localStorage.getItem("user"))) : null));
  }

  public static set currentUser(user) {
    User.setCurrentUser(user);
  }

  private static _curUsr: User = null;
}

export class Profile {
  constructor(
    /**
     * ID of the profile. Identical to ID of the user.
     */
    public id: number,
    /**
     * The full name of the profile.
     */
    public fullName: string,
    /**
     * Number of likes this profile has received.
     */
    public likes: number,
    /**
     * Name of the profile picture. All profile pictures are stored in /img/pfp/
     */
    public pfp: string,
    /**
     * Biography text. The user-defined description.
     */
    public bio: string,
    /**
     * Date of the user's birthday.
     */
    public birthdate: Date,
    /**
     * User's country.
     */
    public country: string,
    /**
     * User's height
     */
    public height: number,
    /**
     * User's weight
     */
    public weight: number,
    /**
     * Username associated with this profile.
     */
    public username: string,
  ) { }

  public get age() {
    let now = new Date();
    let alive = new Date(now.getTime() - this.birthdate.getTime());
    return alive.getFullYear() - 1970; // This returns correct year, also with day and month in mind.
    // return new Date().getFullYear() - this.birthdate.getFullYear() - 1; // This worked terribly brrr
  }

  /**
   * Map a ProfileSQL object to a Profile instance
   */
  public static mapToProfile(data: ProfileSQL) {    
    var t = data.birthdate.date.split(/[- :]/) as unknown as number[];
    const birthdate = new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3], t[4], t[5]));

    return new Profile(
      data.id,
      data.fullName,
      data.likes,
      baseLoginUrl + "/img/pfp/" + (data.pfp || "__default.png"),
      data.bio,
      birthdate,
      data.country,
      data.height,
      data.weight,
      data.username,
    );
  }

  public async updateProfile(): Promise<Result<null>> {
    var formdata = new FormData();
    var requestOptions = {
      method: 'POST',
      body: formdata
    };
    let user = User.currentUser;
    if (!(user && user.id == this.id)) {
      return new Result(false, "Logged in user not matching.");
    }

    formdata.append("token", user.accessToken);
    for (const key in this) {
      if (Object.prototype.hasOwnProperty.call(this, key)) {
        const v = this[key];
        formdata.append(key, v instanceof Date ? DateTools.dateToValue(v) : v + "");
      }
    }

    formdata.forEach(v => {
      console.log(v);
    })
    return fetch(baseLoginUrl + "/api/updateProfile.php", requestOptions)
    .then(response => response.json())
    .then((result: Result<null>) => {
      console.log(result);
      
      return result;
    });
  }

  public static async getProfile(username: string): Promise<Result<Profile>>;
  public static async getProfile(usernames: string[]): Promise<Result<Profile[]>>;
  public static async getProfile(id: number): Promise<Result<Profile>>;
  public static async getProfile(ids: number[]): Promise<Result<Profile[]>>;
  public static async getProfile(id: number | string | number[] | string[]) {
    var formdata = new FormData();
    var requestOptions = {
      method: 'POST',
      body: formdata
    };
    let key = typeof id == "string" ? "username" : "id"
    if (Array.isArray(id)) formdata.append(key, id.join(","));
    else formdata.append(key, id.toString());

    return fetch(baseLoginUrl + "/api/getProfile.php", requestOptions)
    .then(response => response.json())
    .then((result: Result<ProfileSQL | ProfileSQL[]>) => {
      if (result.success) {
        let res: Profile | Profile[];
        if (Array.isArray(result.data)) {
          res = result.data.map(data => Profile.mapToProfile(data))
        }
        else {
          res = Profile.mapToProfile(result.data);
        }
        let data: Result<Profile | Profile[]> = {
          success: result.success,
          data: res,
          reason: result.reason
        }
        return data;
      }
      else {
        let data: Result<Profile> = {
          success: result.success,
          data: null,
          reason: result.reason
        }
        return data;
      }
    });
  }

  public async likedBy() {
    var formdata = new FormData();
    var requestOptions = {
      method: 'POST',
      body: formdata
    };
    formdata.append("id", this.id.toString());

    return fetch(baseLoginUrl + "/api/likedBy.php", requestOptions)
    .then(response => response.json())
    .then((result: Result<ProfileSQL[]>) => {
      if (result.success) {
        let res = result.data.map(data => Profile.mapToProfile(data))
        let data: Result<Profile[]> = {
          success: result.success,
          data: res,
          reason: result.reason
        }
        return data;
      }
      else {
        let data: Result<Profile[]> = result as any;
        return data;
      }
    });
  }

  public async isLikedBy(id: number) {
    return this.likedBy().then(res => res.data.some(p => p.id === id));
  }

  public async like(likerToken: string, state: boolean) {
    var formdata = new FormData();
    var requestOptions = {
      method: 'POST',
      body: formdata
    };
    formdata.append("token", likerToken);
    formdata.append("id", this.id.toString());
    formdata.append("state", state ? "1" : "0");

    return fetch(baseLoginUrl + "/api/setLike.php", requestOptions)
    .then(response => response.json())
    .then((result: Result<boolean>) => {
      return result;
    });
  }
    
  public static async searchProfiles(query: {
    minAge?: number;
    maxAge?: number;
    minHeight?: number;
    maxHeight?: number;
    minWeight?: number;
    maxWeight?: number;
  }) {
    var formdata = new FormData();
    var requestOptions = {
      method: 'POST',
      body: formdata
    };
    for (const key in query) {
      if (Object.prototype.hasOwnProperty.call(query, key)) {
        const v = (query as any)[key];
        if (typeof v != "undefined") {
          formdata.append(key, v + "");
        }
      }
    }

    return fetch(baseLoginUrl + "/api/searchProfiles.php", requestOptions)
    .then(response => response.json())
    .then((result: Result<ProfileSQL[]>) => {
      if (result.success) {
        let res: Profile[];
        res = result.data.map(data => Profile.mapToProfile(data))
        let data: Result<Profile[]> = {
          success: result.success,
          data: res,
          reason: result.reason
        }
        return data;
      }
      else {
        let data: Result<Profile[]> = {
          success: result.success,
          data: null,
          reason: result.reason
        }
        return data;
      }
    });
  }
}
