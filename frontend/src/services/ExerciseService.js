import fetchRequest from "./FetchRequest";

export default class ExerciseService {
  static getAll() {
    // returns Promise<[] of exercises>
    return fetchRequest('/exercises', "GET", {}, {}, true)
    .then(([data, error]) => {
      if (error) {
        return []
      }
      return data
    })
  }
  static get(id) {
    // returns Promise<{} of exercise>
    return fetchRequest(`/exercises/${id}`, "GET", {}, {}, true)
    .then(([data, error]) => {
      if (error) {
        return {error: true}
      }
      return data
    })
  }
  static create(name) {
    // returns Promise<{} of exercise>
    return fetchRequest(`/exercises/create`, "POST", {name}, {}, true)
    .then(([data, error]) => {
      if (error) {
        return {error: true}
      }
      return data
    })
  }
}
