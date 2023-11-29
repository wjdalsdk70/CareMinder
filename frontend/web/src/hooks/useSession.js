import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { refresh } from "src/lib/api";

const STORAGE_KEY = "session";
const defaultModel = { user: null, accessToken: null, refreshToken: null };

export default function useSession() {
  const [session, setSession] = useState(defaultModel);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const savedSession = localStorage.getItem(STORAGE_KEY);
    if (savedSession) {
      try {
        const value = savedSession;
        const { exp } = jwtDecode(value.accessToken);
        const expirationDate = new Date(0);
        expirationDate.setUTCSeconds(exp);
        const now = new Date();
        setSession(now >= expirationDate ? defaultModel : value);
      } catch (e) {
        console.error(e);
      }
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (session.user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [session]);

  const refresh = async () => {
    try {
      const response = await refresh(session);
      login({
        user: session.user,
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
      });
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
    refreshToken: refresh,
  };
}

export function useRedirectToLogin(session, access) {
  const navigate = useNavigate();

  useEffect(() => {
    if (session.ready && (!session.user || session.user.access < access))
      navigate("/login");
  }, [session, navigate]);
}

export function useRedirectToHome(session) {
  const navigate = useNavigate();

  useEffect(() => {
    if (session.ready && session.user) navigate("/");
  }, [session, navigate]);
}
