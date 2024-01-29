import { useState, useEffect, useRef } from "react";

import Filter from "src/components/Filter/Filter";

import { BiLoaderCircle } from "react-icons/bi";
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineDownloading } from "react-icons/md";

import styles from "./viewRequest.module.css";
import flw from "../Requests.module.css";
import Request from "src/components/Request/Request";
import { getRequestsFiltered, updateRequest } from "src/lib/api";
import { useRedirectToLogin } from "src/hooks/useSession";
import { wait } from "@testing-library/user-event/dist/utils";
import data from "../../../../../data.json";

export default function ViewRequest({ session }) {
  useRedirectToLogin(session, "nurse/login");
  const nurse = data.nurse;
  const [selectedOptions, setSelectedOptions] = useState({});
  const [waiting, setWaiting] = useState([]);
  const [ongoing, setOngoing] = useState([]);

  const [selItem, setSelItem] = useState({
    i: null,
    s: null,
    item: { isQuestion: false, text: "", date: new Date() },
  });
  const [holding, setHolding] = useState(false);

  const pressTimer = useRef(null);

  const handleCheckboxChange = (event) => {
    setSelectedOptions({
      ...selectedOptions,
      [event.target.name]: event.target.checked,
    });
  };

  const handleMouseDown = (i, s, item) => {
    pressTimer.current = setTimeout(() => {
      setHolding(true);
      setSelItem({ i, s, item });
    }, 500);
  };

  const handleMouseMove = (e) => {
    const item = document.querySelector(`.${styles.follow}`);

    if (item) {
      item.style.setProperty("--x", `${e.clientX}px`);
      item.style.setProperty("--y", `${e.clientY}px`);
    }
  };

  const handleMouseUp = async (e) => {
    clearTimeout(pressTimer.current);
    if (!holding) return false;

    setHolding(false);
    setSelItem({
      i: null,
      s: null,
      item: { isQuestion: false, text: "", date: new Date() },
    });
    const targetElement = e.target.getAttribute("name");

    if (!targetElement) return false;

    if (targetElement === "finishArea") {
      const item = selItem.s === "r" ? ongoing[selItem.i] : waiting[selItem.i];
      await handelStateChangeDelete(item.id).then((r) => null);

      selItem.s === "l"
        ? setWaiting(waiting.filter((_, i) => i !== selItem.i))
        : setOngoing(ongoing.filter((_, i) => i !== selItem.i));
    } else if (targetElement.charAt(0) !== selItem.s) {
      const item = selItem.s === "r" ? ongoing[selItem.i] : waiting[selItem.i];
      if (selItem.s === "l") {
        await handelStateChangeMine(item.id).then((r) => null);
        item.state = 1;
        setWaiting(waiting.filter((_, i) => i !== selItem.i));
        setOngoing([...ongoing, item]);
      } else {
        await handelStateChangeGlobal(item.id).then((r) => null);
        item.state = 0;
        setOngoing(ongoing.filter((_, i) => i !== selItem.i));
        setWaiting([...waiting, item]);
      }
    }
  };

  async function handelStateChangeMine(id) {
    try {
      const getAllRequests = await updateRequest(
        session,
        id,
        1,
        session.user.user_id
      );
    } catch (error) {
      console.error(error);
    }
  }

  async function handelStateChangeGlobal(id) {
    try {
      const getAllRequests = await updateRequest(session, id, 0, null);
    } catch (error) {
      console.error(error);
    }
  }

  async function handelStateChangeDelete(id) {
    try {
      const getAllRequests = await updateRequest(session, id, 2, null);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchRequests() {
    try {
      const getAllRequests = await getRequestsFiltered(session, {
        staff: null,
        state: 0,
      });
      setWaiting(getAllRequests);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchMyRequests() {
    try {
      const getMyRequests = await getRequestsFiltered(session, {
        staff: session.user.id,
      });

      setOngoing(getMyRequests);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [holding]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchRequests();
      fetchMyRequests();
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div
        className={`${styles.follow} ${flw.follow} ${
          holding ? "" : styles.hide
        }`}
      >
        <Request
          request={selItem.item}
          session={session}
          from_patient={false}
        />
      </div>
      <div className={styles.wrapper}>
        <div>
          <div className={styles.title}>
            <BiLoaderCircle />
            <h2>{nurse.nurseHomeGlobalRequestsHeader}</h2>
          </div>
          <div className={styles.filter}>
            <Filter
              title={nurse.filterByJob}
              options={[{ value: "name", description: "description" }]}
              selectedOptions={selectedOptions}
              handleCheckboxChange={handleCheckboxChange}
            />
            <Filter
              title={nurse.filterByPatient}
              options={[]}
              selectedOptions={selectedOptions}
              handleCheckboxChange={handleCheckboxChange}
            />
            <Filter
              title={nurse.filterByArea}
              options={[]}
              selectedOptions={selectedOptions}
              handleCheckboxChange={handleCheckboxChange}
            />
          </div>
          {holding ? <div className={styles.area} name="leftArea"></div> : ""}
          <div
            className={styles.waiting}
            style={holding ? { transform: "translateY(-100%)" } : {}}
          >
            {waiting.map((item, i) => (
              <div
                key={i}
                onMouseDown={(e) => handleMouseDown(i, "l", item)}
                className={
                  selItem.i === i && selItem.s === "l" ? styles.hide : ""
                }
              >
                <Request
                  request={item}
                  session={session}
                  from_patient={false}
                />
              </div>
            ))}
          </div>
        </div>
        <span className={styles.line}></span>
        <div className={styles.right}>
          <div className={styles.title}>
            <MdOutlineDownloading />
            <h2>{nurse.nurseHomeMyRequestHeader}</h2>
          </div>
          <div className={styles.filter}>
            <Filter
              title={nurse.filterByJob}
              options={[]}
              selectedOptions={selectedOptions}
              handleCheckboxChange={handleCheckboxChange}
            />
            <Filter
              title={nurse.filterByPatient}
              options={[]}
              selectedOptions={selectedOptions}
              handleCheckboxChange={handleCheckboxChange}
            />
            <Filter
              title={nurse.filterByArea}
              options={[]}
              selectedOptions={selectedOptions}
              handleCheckboxChange={handleCheckboxChange}
            />
          </div>
          {holding ? <div className={styles.area} name="rightArea"></div> : ""}
          <div
            className={styles.ongoing}
            style={holding ? { transform: "translateY(-100%)" } : {}}
          >
            {ongoing.map((item, i) => (
              <div
                key={i}
                onMouseDown={(e) => handleMouseDown(i, "r", item)}
                className={
                  selItem.i === i && selItem.s === "r" ? styles.hide : ""
                }
              >
                <Request
                  request={item}
                  session={session}
                  from_patient={false}
                />
              </div>
            ))}
          </div>
          {holding ? (
            <div className={styles.finishArea} name="rightArea"></div>
          ) : (
            ""
          )}
          <div className={styles.finishArea} name="finishArea"></div>
          <div className={styles.finishButton}>
            <FaCheckCircle size={90} className={styles.finishCheck} />
          </div>
        </div>
      </div>
    </>
  );
}
