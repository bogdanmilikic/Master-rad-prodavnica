import { faCheck, faRobot, faX } from "@fortawesome/free-solid-svg-icons";
import { faEquals } from "@fortawesome/free-solid-svg-icons/faEquals";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons/faPlusCircle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const PopUp = ({ handleClose, prviBroj, drugiBroj, setPosalji, setPrviBroj, setDrugiBroj, setOpenAlert, setPoruka, setUspesno }) => {

    const [racunaj, setRacunaj] = useState();

    const handleRacunaj = (e) => {
        setRacunaj(e.target.value);
    }


    const handleProvera = () => {
        if (racunaj === (prviBroj + drugiBroj).toString()) {
            setPoruka("Uneti broj je tacan");
            setUspesno(true);
            setPosalji(false);
            setOpenAlert(true);
            handleClose();
        }
        else {
            setPoruka("Uneti broj nije jedank zbiru prvog i drugog broja");
            setOpenAlert(true);
            setUspesno(false);
            setPrviBroj(Math.floor(Math.random() * 100));
            setDrugiBroj(Math.floor(Math.random() * 100));

            setPosalji(true);

        }
    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleProvera();
            handleClose();
        }
    }
    return (
        <div className="popUpContainer">

            <div className="popUpSadrzaj">
                <div style={{ position: "relative", width: "100%", height: "100%" }}>
                    <button onClick={handleClose} className="popUpGasi"><FontAwesomeIcon icon={faX} /></button>
                    <h1 className="tekstNaslov"><FontAwesomeIcon icon={faRobot} />{"   "}Da li ste robot ?</h1>
                    <hr />
                    <center>
                        <div style={{ display: "flex", justifyContent: "center", gap: "40px" }}>
                            <div className="popUpBroj">{prviBroj}</div>
                            <div className="popUpBroj">{<FontAwesomeIcon icon={faPlusCircle} />}</div>
                            <div className="popUpBroj">{drugiBroj}</div>
                        </div>
                        <br />
                        <div className="popUpBroj" style={{ width: "40%" }}>{<FontAwesomeIcon icon={faEquals} />}</div>
                        <br />
                        <input onChange={handleRacunaj} onKeyDown={handleKeyDown} className="formaInput" style={{ textAlign: "center", borderRadius: "10px" }} value={racunaj} placeholder="Uneti zbir dva broja"></input>
                        <br />
                        <button onClick={handleProvera} className="formaDugme">Potvrdi <FontAwesomeIcon icon={faCheck} /></button>
                    </center>
                </div>
            </div>
        </div>
    )
}
export default PopUp;