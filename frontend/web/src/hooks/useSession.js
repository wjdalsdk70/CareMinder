import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { refresh as apiRefresh } from "src/lib/api";
import useLocalStorage from "./useLocalStorage";

const STORAGE_KEY = "session";
const defaultModel = { user: null, accessToken: null, refreshToken: null };

export default function useSession() {
  const [session, setSession] = useLocalStorage(STORAGE_KEY, defaultModel);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (session.accessToken) {
      try {
        const { exp } = jwtDecode(session.accessToken);
        const expirationDate = new Date(0);
        expirationDate.setUTCSeconds(exp);
        const now = new Date();
        setSession(now >= expirationDate ? defaultModel : session);
      } catch (e) {
        console.error(e);
      }
    }
    setReady(true);
  }, [session]);

  const refresh = async () => {
    try {
      const response = await apiRefresh(session);
      login({
        user: session.user,
        accessToken: response.access,
        refreshToken: response.refresh,
      });
      return response.access;
    } catch (e) {
      logout();
    }
  };

  function login(value) {
    setSession(value);
  }

  function logout() {
    setSession(defaultModel);
  }

  return {
    ...session,
    ready,
    login,
    logout,
    refresh,
  };
}

export function useRedirectToLogin(session, url) {
  const navigate = useNavigate();

  useEffect(() => {
    if (session.ready && !session.user) navigate(url);
  }, [session, navigate]);
}

export function useRedirectToHome(session, url) {
  const navigate = useNavigate();

  useEffect(() => {
    if (session.ready && session.user) navigate(url);
  }, [session, navigate]);
}
