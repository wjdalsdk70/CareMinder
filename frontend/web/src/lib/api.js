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

export async function getRequests() {
  const response = await fetch(`${BASE_URL}/requests/`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  });
  if (!response.ok) {
    return Promise.reject(response);
  }
  const data = await response.json();
  return data;
}

export async function getChatMessages(id) {
  const response = await fetch(`${BASE_URL}/requests/${id}/chat_messages/`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  });

  if (!response.ok) {
    return Promise.reject(response);
  }

  const data = await response.json();
  return data;
}

export async function createTablet(name, area) {
  const response = await fetch(`${BASE_URL}/tablets/`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ name, area }),
  });
  if (!response.ok) {
    return Promise.reject(response);
  }
  const data = await response.json();
  return data;
}

export async function createChatMessage(requestId, { text, from_patient }) {
  const response = await fetch(
    `${BASE_URL}/requests/${requestId}/chat_messages/`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ text, from_patient }),
    }
  );

  if (!response.ok) {
    return Promise.reject(response);
  }

  const data = await response.json();
  return data;
}

export async function getTablets() {
  const response = await fetch(`${BASE_URL}/tablets/`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  });
  if (!response.ok) {
    return Promise.reject(response);
  }
  const data = await response.json();
  return data;
}

export async function getTablet(id) {
  const response = await fetch(`${BASE_URL}/tablets/${id}`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  });
  if (!response.ok) {
    return Promise.reject(response);
  }
  const data = await response.json();
  return data;
}
