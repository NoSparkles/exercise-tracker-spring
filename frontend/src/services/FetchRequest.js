const fetchRequest = async (path = '/', method = 'GET', body = {}, headers = {}, needAuth = false) => {
  let url = 'http://localhost:8080'
  let response = null;
  let data = null;
  let error = null;
  let requiresRelogin = false
  const fetchOptions = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };
  if (needAuth) {
    fetchOptions.headers['Authorization'] = `Bearer ${localStorage.getItem("token")}`;
  }
  if (method !== "GET") {
    fetchOptions.body = JSON.stringify(body);
  }
  try {
    response = await fetch(url + path, fetchOptions);
    data = await response.json();
    if (!response.ok) {
      error = { status: response.status, statusText: response.statusText, data };
      if (response.status === 403 || response.status === 500) {
        requiresReLogin = true;
      }
    }
  } catch (err) {
    error = err;
  }
  return [data, error, requiresRelogin];
};

export default fetchRequest;