import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import ImageShow from "./ImageShow";

const ImageSlide = ({ slike }) => {
  const [index, setIndex] = useState(0);
  const [openSlide, setOpenSlide] = useState(false);

  const handleDesnoDugme = () => {
    setIndex((prevIndex) =>
      prevIndex === slike.length - 1 ? 0 : prevIndex + 1
    );
  };
  const handleImageSlide = () => {
    document.body.style.overflow = "hidden";
    setOpenSlide(true);
  };
  const hanldeLevoDugme = () => {
    setIndex((prevIndex) =>
      prevIndex === 0 ? slike.length - 1 : prevIndex - 1
    );
  };

  
  return (
    <center>
      {openSlide ? (
        <ImageShow
          slike={slike}
          index={index}
          setIndex={setIndex}
          setOpen={setOpenSlide}
        />
      ) : undefined}
      <div className="imageSlideDiv">
        <button className="imageSlideDugmici" onClick={hanldeLevoDugme}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>

        <button className="imageSlideDugmici" onClick={handleDesnoDugme}>
          {" "}
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
        <img
          src={slike[index]}
          className="imageSlideSlika"
          onClick={handleImageSlide}
        />
        <div className="divImageBroj">
          {" "}
          {index + 1} / {slike.length}{" "}
        </div>
      </div>
    </center>
  );
}
export default ImageSlide;