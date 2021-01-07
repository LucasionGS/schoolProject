import { baseUrl, Result, User, UserSQL } from "./models";

type LoginCallback = (user: User) => void;

class Auth {
  static async login(username: string, password: string, callback?: LoginCallback): Promise<Result<User>>;
  static async login(token: string, callback?: LoginCallback): Promise<Result<User>>;
  static async login(usernameOrToken: string, passwordOrCallback: string | LoginCallback, callback?: LoginCallback) {
    var formdata = new FormData();
    // formdata.append("username", usernameOrToken);
    // formdata.append("password", passwordOrCallback as string);
    if (typeof passwordOrCallback == "string") {
      formdata.append("username", usernameOrToken);
      formdata.append("password", passwordOrCallback);
    }
    else {
      formdata.append("token", usernameOrToken);
      callback = passwordOrCallback;
    }
  
    var requestOptions = {
      method: 'POST',
      body: formdata
    };
  
    return fetch(baseUrl + "/src/authorize.php", requestOptions)
      .then(response => response.json())
      .then((result: Result<UserSQL>) => {
        if (result.success) {
          var user = User.mapToUser(result.data);
          user.setAsCurrentUser();
          if (typeof callback == "function") callback(user);
        }
        return new Result<User>(result.success, result.reason, user);
      })
      .catch(error => {
        console.error('error', error);
        return new Result<User>(false, error);
      });
  }
  
  static async register(username: string, email: string, password: string, confPass: string): Promise<Result<{ token: string }>> {
    var formdata = new FormData();
    formdata.append("username", username || "");
    formdata.append("email", email || "");
    formdata.append("password", password || "");
    formdata.append("confirmPassword", confPass || "");
  
    var requestOptions = {
      method: 'POST',
      body: formdata,
    };
  
    return fetch(baseUrl + "/src/register.php", requestOptions)
      .then(response => response.json())
      .then((result: Result<{ token: string }>) => {
        return result;
      })
      .catch(error => {
        console.error(error);
        return new Result(false, error);
      });
  }
}

export default Auth;