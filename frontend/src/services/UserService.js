import fetchRequest from "./FetchRequest";

export default class UserService {
  static isLoggedIn() {
    return UserService.me().then(([data, error, requiresReLogin]) => requiresReLogin);
  }

  static create(email, password, fullName) {
    return fetchRequest('/auth/signup', "POST", { email, password, fullName });
  }

  static login(email, password) {
    return fetchRequest('/auth/login', "POST", { email, password }).then(([data, error, requiresReLogin]) => {
      if (!error && data.token) {
        localStorage.setItem('token', data.token);
      }
      return [data, error, requiresReLogin];
    });
  }

  static getAll() {
    return fetchRequest('/users/');
  }

  static me() {
    return fetchRequest('/users/me', "GET", {}, {}, true).then(([data, error, requiresReLogin]) => {
      if (requiresReLogin) {
        localStorage.removeItem('token');
      }
      return [data, error, requiresReLogin];
    });
  }
}
