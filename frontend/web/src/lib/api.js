import useSession from "../hooks/useSession";
import { authFetch } from "../core/api";

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

export async function getRequests(session) {
  const response = await authFetch(session, `${BASE_URL}/requests/`, {
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

export async function getRequestsFiltered(
  session,
  {
    forType = "",
    isQuestion = "",
    state = "",
    tablet = "",
    staff = "",
    staffType = "",
    tabletArea = "",
  }
) {
  let url = `${BASE_URL}/requests/?for_type=${forType}&is_question=${isQuestion}&state=${state}&tablet=${tablet}&staff=${staff}&staff__type=${staffType}&tablet__area=${tabletArea}`;

  const response = await authFetch(session, url, {
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

export async function updateRequest(session, id, state, staff_id) {
  const response = await authFetch(session, `${BASE_URL}/requests/${id}/`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ state, staff_id }),
  });
  if (!response.ok) {
    return Promise.reject(response);
  }
  const data = await response.json();
  return data;
}

export async function getChatMessages(session, id) {
  const response = await authFetch(
    session,
    `${BASE_URL}/requests/${id}/chat_messages/`,
    {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    }
  );

  if (!response.ok) {
    return Promise.reject(response);
  }

  const data = await response.json();
  return data;
}

export async function postChatMessage(
  session,
  requestId,
  { text, from_patient }
) {
  const response = await authFetch(
    session,
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

export async function postTablet(session, name, area_id) {
  const response = await authFetch(session, `${BASE_URL}/tablets/`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ name, area_id }),
  });

  if (!response.ok) {
    return Promise.reject(response);
  }

  const data = await response.json();
  return data;
}

export async function patchTablet(session, id, name, area_id) {
  const response = await authFetch(session, `${BASE_URL}/tablets/${id}/`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ name, area_id }),
  });

  if (!response.ok) {
    return Promise.reject(response);
  }

  const data = await response.json();
  return data;
}

export async function postRequest(
  session,
  text,
  is_question,
  state,
  tablet_id,
  for_type
) {
  const response = await authFetch(session, `${BASE_URL}/requests/`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ text, is_question, state, tablet_id, for_type }),
  });
  if (!response.ok) {
    return Promise.reject(response);
  }
  const data = await response.json();
  return data;
}

export async function getSettings(session) {
  const response = await authFetch(session, `${BASE_URL}/settings/`, {
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

export async function updateSettings(
  session,
  hospital_title,
  hospital_description,
  notification
) {
  const response = await authFetch(session, `${BASE_URL}/settings/`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      hospital_title,
      hospital_description,
      notification,
    }),
  });
  if (!response.ok) {
    return Promise.reject(response);
  }
  const data = await response.json();
  return data;
}

export async function postStaff(
  session,
  username,
  password,
  first_name,
  last_name,
  role,
  type,
  nfc
) {
  const response = await authFetch(session, `${BASE_URL}/staffs/`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
      first_name,
      last_name,
      role,
      type,
      nfc,
    }),
  });
  if (!response.ok) {
    return Promise.reject(response);
  }
  const data = await response.json();
  return data;
}

export async function patchStaff(
    session,
    id,
    username,
    password,
    first_name,
    last_name,
    type,
) {
  const response = await authFetch(session, `${BASE_URL}/staffs/${id}/`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
      first_name,
      last_name,
      type,
    }),
  });
  if (!response.ok) {
    return Promise.reject(response);
  }
  const data = await response.json();
  return data;
}


export async function updateStaff(
  session,
  id,
  username,
  first_name,
  last_name,
  role,
  type
) {
  const response = await authFetch(session, `${BASE_URL}/staffs/${id}/`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ username, first_name, last_name, role, type }),
  });
  if (!response.ok) {
    return Promise.reject(response);
  }
  const data = await response.json();
  return data;
}

export async function getStaffs(session) {
  const response = await authFetch(session, `${BASE_URL}/staffs/`, {
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

export async function getStaff(session, id) {
  const response = await authFetch(session, `${BASE_URL}/staffs/${id}`, {
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

export async function getAreas(session) {
  const response = await authFetch(session, `${BASE_URL}/settings/areas/`, {
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
