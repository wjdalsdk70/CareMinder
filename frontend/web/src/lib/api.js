const BASE_URL = "http://127.0.0.1:8000/api";

export async function login(username, password) {
  const response = await fetch(`${BASE_URL}/staffs/login/`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    return Promise.reject(response);
  }

  const data = await response.json();
  return data;
}

export async function refresh({ refreshToken }) {
  const response = await fetch(`${BASE_URL}/token/refresh/`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ refresh: refreshToken }),
  });

  if (!response.ok) {
    return Promise.reject(response);
  }

  const data = await response.json();
  return data;
}

export async function logout({ refreshToken }) {
  const response = await fetch(`${BASE_URL}/token/blacklist/`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ refresh: refreshToken }),
  });

  if (!response.ok) {
    return Promise.reject(response);
  }

  const data = await response.json();
  return data;
}

export async function get_request(){
  const response = await fetch(`${BASE_URL}/requests/`,{
    method: "GET",
    headers: {
      "content-type": "application/json",
    }
  });

  if (!response.ok) {
    return Promise.reject(response);
  }

  const data = await response.json();
  return data;

}
