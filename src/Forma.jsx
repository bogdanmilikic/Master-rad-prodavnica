import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faRobot } from "@fortawesome/free-solid-svg-icons/faRobot";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import PopUp from "./PopUp";
import emailjs from "@emailjs/browser";
import Alert from "./Alert";


const Forma=()=>{
const [posalji,setPosalji]=useState(true);
const [openPopUp,setOpenPopUp]=useState(false);
const [poruka,setPoruka]=useState("");
const [ime,setIme]=useState("");
const [eMail,setEMail]=useState("");
const [pitanje,setPitanje]=useState("");
 const eMailRef = useRef(null);
  const [obavestenje, setObavestenje] = useState(false);
  const [uspesno, setUspesno] = useState(false);

 const prviBroj=Math.floor(Math.random() * 100);
    const drugiBroj=Math.floor(Math.random() * 100);
 const handleOpenProvera=()=>{
    setOpenPopUp(true);
 }
 const handleClose=()=>{
    setOpenPopUp(false);
 }
  const handlePitanje = (e) => {
    e.preventDefault();

    if (eMail.trim() === "" || eMailRef.current.checkValidity() === false) {
      setPoruka(
      "Uneti validnu e-mail adresu" );
      setUspesno(false);
      setObavestenje(true);
      return;
    }
    if (ime.trim() === "" || ime.trim() === undefined) {
      setPoruka(
        "'Ime i prezime' polje mora biti popunjeno da bi se poslalo Vaše pitanje"
      );
      setUspesno(false);
      setObavestenje(true);
      return;
    }
    if (pitanje.trim() === "" || pitanje.trim() === undefined) {
      setPoruka("'Pitanje' polje mora biti popunjeno da bi se poslalo Vaše pitanje"
      );
      setUspesno(false);
      setObavestenje(true);
      return;
    }
    const templateParams = {
      name: ime,
      email: eMail,
      message: pitanje,
    };

    emailjs
      .send(
        "service_y6nw619", 
        "template_8c8g3a2", 
        templateParams, 
        "wZnVJXd8aNkTqP1ik" ,
      )
      .then(
        (response) => {
          console.log("Uspešno poslato!", response.status, response.text);

          setPoruka("Pitanje je uspešno poslato!"
          );
          setUspesno(true);
          setObavestenje(true);
          setIme("");
          setEMail("");
          setPitanje("");
          setPosalji(true)
        },
        (error) => {
          console.error("Greška pri slanju emaila:", error);
          setPoruka("Došlo je do greške pri slanju pitanja"
          );
          setUspesno(false);
          setObavestenje(true);
        }
      );
  };
    return(
        <>
        {obavestenje ? (
        <Alert
          setOpen={setObavestenje}
          uspesno={uspesno}
          poruka={poruka}
        />
      ) : undefined}
        {openPopUp?<PopUp prviBroj={prviBroj} drugiBroj={drugiBroj} handleClose={handleClose} setPosalji={setPosalji}/>:null}
        <div className="formaDiv">
            
            <input className="formaInput" placeholder="Unesite vaše ime i prezime" value={ime} onChange={(e)=>{setIme(e.target.value)}} required/>
                        <input className="formaInput" placeholder="Unesite vaše email" value={eMail} onChange={(e)=>{setEMail(e.target.value)}}  type="email" ref={eMailRef}
        required/>
                        <textarea className="formaPolje" placeholder="Unesite vaše pitanje" value={pitanje} onChange={(e)=>{setPitanje(e.target.value)}} required/>
                        <menu style={{display:"flex",justifyContent:"space-between",margin:"0px",padding:"0px",gap:"10px",width:"98.7%"}}>
               <button title={!posalji ? "Niste robot :)" : ""} disabled={!posalji}onClick={handleOpenProvera} className="formaDugmeCapcha" style={!posalji ? {backgroundColor:"green"} : null}>Provera <FontAwesomeIcon icon={faRobot}/></button>
   <button disabled={posalji} title={posalji ? "Prvo provera" : ""} className="formaDugme" style={posalji ? {backgroundColor:"gray"} : null} onClick={handlePitanje}>Pošalji <FontAwesomeIcon icon={faPaperPlane} /></button>
 </menu>
        </div></>
    )
}
export default Forma;