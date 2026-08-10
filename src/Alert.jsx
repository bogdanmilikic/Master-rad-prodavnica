import {
  faCircleCheck,
  faCircleExclamation,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const Alert = ({ uspesno, poruka, setOpen }) => {
  const [animacija, setAnimacija] = useState("alertObavestenjeUlaz");
  const handleOpen = () => {
    setAnimacija("alertObavestenjeIzlaz");
  };
  return (
    <div
      className={animacija}
      style={
        uspesno ? { backgroundColor: "green" } : { backgroundColor: "red" }
      }
      onAnimationEnd={() => {
        if (animacija === "alertObavestenjeIzlaz") {
          setOpen(false);
        }
      }}
    >
      {" "}
      <p style={{ width: "100%", textAlign: "left" }}>
        {uspesno ? (
          <>
            <FontAwesomeIcon
              icon={faCircleCheck}
              style={{ textAlign: "left" }}
            />{" "}
            {poruka}
          </>
        ) : (
          <>
            <FontAwesomeIcon
              icon={faCircleExclamation}
              style={{ textAlign: "left" }}
            />{" "}
            {poruka}
          </>
        )}{" "}
      </p>
      <div>
        <button className="alertDugme" onClick={handleOpen}>
          <FontAwesomeIcon icon={faX} />
        </button>
      </div>
    </div>
  );
};
export default Alert;