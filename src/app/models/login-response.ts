// this is local storage and will be data that is stored in the browser and can be accessed across different sessions.

// it is used to store the token received from the backend after a successful login, 
// allowing the user to remain authenticated across different pages and sessions until they log out or the token expires.
export interface LoginResponse {
  token: string;
}