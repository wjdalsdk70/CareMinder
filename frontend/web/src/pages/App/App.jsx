import { useLocation } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";

import NurseHomeRequests from "src/pages/Nurse/Home/Requests/Requests";
import NurseHomePatients from "src/pages/Nurse/Home/Patients/Patients";
import Settings from "src/pages/Nurse/Admin/Settings/Settings";
import AddUser from "src/pages/Nurse/Admin/AddUser/AddUser";
import EditUser from "src/pages/Nurse/Admin/EditUser/EditUser";
import UserList from "src/pages/Nurse/Admin/UserList/UserList";
import useSession from "src/hooks/useSession";
import EditTablets from "src/pages/Nurse/Admin/EditTablets/EditTablets";
import PatientLogin from "src/pages/Patient/Login/Login";


import PatientHome from "src/pages/Patient/Home/Home";
import Agreement from "src/pages/Patient/Agreement/Agreement";
import Recording from "src/pages/Patient/Recording/Recording";
import RecordingResult from "src/pages/Patient/RecordingResult/RecordingResult";

import "src/theme/global.css";
import "src/theme/variables.css";
import NurseLogin from "src/pages/Nurse/Login/Login";

function App() {
  const session = useSession();
  const location = useLocation();

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/nurse/login" />} />

        <Route path="/nurse/*" element={<Navigate to="/nurse/login" />} />
        <Route path="/nurse" element={<Navigate to="/nurse/login" />} />
        <Route path="/nurse/login" element={<NurseLogin session={session} />} />
        <Route
          path="/nurse/home"
          element={<Navigate to="/nurse/home/requests" />}
        />
        <Route
          path="/nurse/home/requests"
          element={<NurseHomeRequests session={session} />}
        />
        <Route
          path="/nurse/home/patients"
          element={<NurseHomePatients session={session} />}
        />
        <Route
          path="/nurse/admin/settings"
          element={<Settings session={session} />}
        />
        <Route
          path="/nurse/admin/addUser"
          element={<AddUser session={session} />}
        />
        <Route
          path="/nurse/admin/editUser/:id"
          element={<EditUser session={session} />}
        />
        <Route
            path="/nurse/admin/editTablet/:id"
            element={<EditTablets session={session} />}
        />
        <Route
          path="/nurse/admin/userList"
          element={<UserList session={session} />}
        />

        <Route path="/patient/*" element={<Navigate to="/patient/login" />} />
        <Route path="/patient" element={<Navigate to="/patient/login" />} />
        <Route
          path="/patient/login"
          element={<PatientLogin session={session} />}
        />
        <Route
          path="/patient/home"
          element={<PatientHome session={session} />}
        />
        <Route path="/patient/agreement" element={<Agreement />} />
        <Route path="/patient/recording" element={<Recording />} />
        <Route path="/patient/recordingResults" element={<RecordingResult />} />
      </Routes>
    </div>
  );
}

export default App;
