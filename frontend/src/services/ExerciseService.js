import fetchRequest from "./FetchRequest";

export default class ExerciseService {
  static getAll() {
    // returns Promise<[] of exercises>
    return fetchRequest('/exercises')
    .then(([data, error]) => {
      if (error) {
        return []
      }
      return data
    })
  }
  static get(id) {
    // returns Promise<{} of exercise>
    return fetchRequest(`/exercises/${id}`)
    .then(([data, error]) => {
      if (error) {
        return {error: true}
      }
      return data
    })
  }
}
