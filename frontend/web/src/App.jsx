import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Nurse from "src/pages/Nurse/Nurse";
import Secretary from "src/pages/Secretary/Secretary";
import useSession from "src/hooks/useSession";
import Login from "src/pages/Login/Login";

function App() {
  const session = useSession();

  return (
    <BrowserRouter>
      <div className="App">
        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/login?next=nurse" />} />
            <Route path="/login" element={<Login session={session} />} />
            <Route path="/nurse" element={<Nurse session={session} />} />
            <Route
              path="/secretary"
              element={<Secretary session={session} />}
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
