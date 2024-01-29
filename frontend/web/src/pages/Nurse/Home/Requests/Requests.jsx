import { useState } from "react";

import ViewRequest from "./viewRequest/viewRequest";
import Progress from "./progress/progress";
import NurseHeader from "src/components/NurseHeader/NurseHeader";

import styles from "./Requests.module.css";
import { useRedirectToLogin } from "../../../../hooks/useSession";

import data from "../../../../data.json";

export default function Requests({ session }) {
  useRedirectToLogin(session, "/nurse/login");
  const nurse = data.nurse;

  const [toggle, setToggle] = useState(true);

  const handleToggle = (i) => {
    if (i == 1) return setToggle(false);
    setToggle(true);
  };

  return (
    <>
      <NurseHeader session={session} />
      <div className={styles.top}>
        <div
          className={`${styles.toggle} ${toggle ? styles.active : ""}`}
          onClick={() => handleToggle(0)}
        >
          {nurse.nurseHomeTitleViewPatientRequests}
        </div>
        <div
          className={`${styles.toggle} ${!toggle ? styles.active : ""}`}
          onClick={() => handleToggle(1)}
        >
          {nurse.nurseHomeTitleViewPatient}
        </div>
      </div>
      <div className={styles.bottom}>
        {toggle ? (
          <ViewRequest active={toggle} session={session} />
        ) : (
          <Progress active={!toggle} />
        )}
      </div>
    </>
  );
}
