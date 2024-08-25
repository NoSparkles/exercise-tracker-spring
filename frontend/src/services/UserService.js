import fetchRequest from "./FetchRequest";

export default class UserService {
  static create(email, password, fullName) {
    //returns Promise<str> 
    return fetchRequest('/auth/signup', "POST", { email, password, fullName })
    .then(([data, error]) => {
      if (!error) {
        return true
      }
      else {
        return false
      }
    })
  }

  static login(email, password) {
    //returns Promise<str>
    return fetchRequest('/auth/login', "POST", { email, password }).then(([data, error]) => {
      if (!error && data.token) {
        localStorage.setItem('token', data.token)
        return true
      }
      return false
    })
    .catch((err) => {
      return false
    })
  }

  static getAll() {
    // returns Promise<[data, error]>
    return fetchRequest('/users')
  }

  static me() {
    // returns Promise<[data, error]>
    return fetchRequest('/users/me', "GET", {}, {}, true)
  }
}
