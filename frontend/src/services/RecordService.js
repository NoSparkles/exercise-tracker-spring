import fetchRequest from "./FetchRequest";

export default class RecordService {
  static update(id, body) {
    // returns Promise<[] of Record>
    delete body.createdAt
    delete body.updatedAt
    delete body.userId
    delete body.id
    delete body.exercise
    body.set1Reps = Number(body.set1Reps)
    body.set2Reps = Number(body.set2Reps)
    body.set3Reps = Number(body.set3Reps)
    body.set4Reps = Number(body.set4Reps)
    body.set1Weight = Number(body.set1Weight)
    body.set2Weight = Number(body.set2Weight)
    body.set3Weight = Number(body.set3Weight)
    body.set4Weight = Number(body.set4Weight)
    return fetchRequest(`/records/update/${id}`, "PUT", body, {}, true)
    .then(([data, error]) => {
      if (error) {
        return {error}
      }
      return data
    })
  }
  static create(body) {
    // returns Promise<[] of Record>
    body.set1Reps = Number(body.set1Reps)
    body.set2Reps = Number(body.set2Reps)
    body.set3Reps = Number(body.set3Reps)
    body.set4Reps = Number(body.set4Reps)
    body.set1Weight = Number(body.set1Weight)
    body.set2Weight = Number(body.set2Weight)
    body.set3Weight = Number(body.set3Weight)
    body.set4Weight = Number(body.set4Weight)
    return fetchRequest(`/records/create`, "POST", body, {}, true)
    .then(([data, error]) => {
      if (error) {
        return {error}
      }
      return data
    })
  }
  static delete(id) {
    return fetchRequest(`/records/delete/${id}`, "DELETE", {}, {}, true)
    .then(([data, error]) => {
      if (error) {
        return {error}
      }
      return data
    })
  }
}
