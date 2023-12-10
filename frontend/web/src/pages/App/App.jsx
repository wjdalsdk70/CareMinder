import { useLocation } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "src/pages/Nurse/Home/Home";
import Admin from "src/pages/Nurse/Admin/Admin";
import useSession from "src/hooks/useSession";
import Login from "src/pages/Nurse/Login/Login";
import NurseHeader from "src/components/NurseHeader/NurseHeader";

import "src/theme/global.css";
import "src/theme/variables.css";

function App() {
  const session = useSession();
  const location = useLocation();

  return (
    <div className="App">
      <Routes>
        {/* <Route path="/" element={} /> Setup Page */}
        <Route
          path="/nurse"
          element={<Navigate to="/nurse/login?next=/nurse/home" />}
        />
        <Route path="/nurse/login" element={<Login session={session} />} />
        <Route path="/nurse/home" element={<Home session={session} />} />
        <Route path="/nurse/admin" element={<Admin session={session} />} />
      </Routes>
    </div>
  );
}

export default App;
