import { useLocation } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";
import Nurse from "src/pages/Nurse/Nurse";
import Secretary from "src/pages/Secretary/Secretary";
import useSession from "src/hooks/useSession";
import Login from "src/pages/Login/Login";
import Header from "src/components/Header/Header";

import "src/theme/global.css";
import "src/theme/variables.css";

function App() {
  const session = useSession();
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname != "/login" && <Header />}
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/login?next=/nurse" />} />
          <Route path="/login" element={<Login session={session} />} />
          <Route path="/nurse" element={<Nurse session={session} />} />
          <Route path="/secretary" element={<Secretary session={session} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
