import useSession from "../hooks/useSession";
import {authFetch} from "../core/api";

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

export async function getRequestsFiltered(id) {
  const response = await fetch(`${BASE_URL}/requests/?tablet=${id}`, {
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

export async function postTablet(name, area_id) {
  const response = await fetch(
    `${BASE_URL}/tablets/`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ name, area_id }),
    }
  );

  if (!response.ok) {
    return Promise.reject(response);
  }

  const data = await response.json();
  return data;
}

export async function postRequest(text, is_question, state, tablet_id, for_role) {
  const response = await fetch(`${BASE_URL}/requests/`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ text, is_question, state, tablet_id, for_role }),
  });
  if (!response.ok) {
    return Promise.reject(response);
  }
  const data = await response.json();
  return data;
}

export async function getSettings() {
  const response = await fetch(`${BASE_URL}/settings/`, {
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

export async function postStaff(session, username, password, first_name, last_name, role, type, nfc) {
  const response = await authFetch(session,`${BASE_URL}/staffs/`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({username, password, first_name, last_name, role, type, nfc}),
  });
  if (!response.ok) {
    return Promise.reject(response);
  }
  const data = await response.json();
  return data;
}

export async function updateStaff(session, id, username, first_name, last_name, role, type) {
  const response = await authFetch(session,`${BASE_URL}/staffs/${id}/`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ username, first_name, last_name, role, type}),
  });
  if (!response.ok) {
    return Promise.reject(response);
  }
  const data = await response.json();
  return data;
}


export async function getStaffs() {
  const response = await fetch(`${BASE_URL}/staffs/`, {
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

export async function getStaff(id) {
  const response = await fetch(`${BASE_URL}/staffs/${id}`, {
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