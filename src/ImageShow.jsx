import {
  faChevronLeft,
  faChevronRight,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ImageShow = ({ slike, index, setIndex, setOpen }) => {
  const handleDesnoDugme = () => {
    setIndex((prevIndex) =>
      prevIndex === slike.length - 1 ? 0 : prevIndex + 1
    );
  };
  const handleClose = () => {
    document.body.style.overflow = "auto";
    setOpen(false);
  };
  const hanldeLevoDugme = () => {
    setIndex((prevIndex) =>
      prevIndex === 0 ? slike.length - 1 : prevIndex - 1
    );
  };
  return (
    <div style={{ position: "relative" }}>
      <div className="imageShowDiv">
        <div className="imageShowGasi">
          <FontAwesomeIcon
            icon={faX}
            style={{ fontSize: "25px" }}
            onClick={handleClose}
          />
        </div>
        <img src={slike[index]} className="imageShowSlika" />
        <div
          style={{
            justifyContent: "space-between",
            display: "flex",
            width: "100%",
          }}
        >
          <button className="imageSlideDugmici" onClick={hanldeLevoDugme}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <div
            style={{
              border: "none",
              color: "white",
              display: "flex",
              fontSize: "larger",
              padding: "5px",
              justifyContent: "center",
              backgroundColor: "rgb(82, 81, 81, 0.555)",
              borderRadius: "5px",
              alignItems: "center",
            }}
          >
            {index + 1} / {slike.length}{" "}
          </div>

          <button className="imageSlideDugmici" onClick={handleDesnoDugme}>
            {" "}
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>
    </div>
  );
};
export default ImageShow;