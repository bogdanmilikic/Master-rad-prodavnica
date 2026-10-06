import { faArrowRightToBracket, faArrowUpRightFromSquare, faFileContract, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DropDown = ({ korisnickoIme, handleOdjava, handlePrijava, handleRegistracija }) => {

  return (
    <div class="dropdown">
      <button class="dropbtn">{korisnickoIme !== "" ? <>{korisnickoIme}</> : <>Korisnik</>} <FontAwesomeIcon icon={faUser} /></button>
      <div class="dropdown-content">
        {korisnickoIme === "" ? <><button className="dropDownDugme" onClick={handlePrijava}>Prijava <FontAwesomeIcon icon={faArrowUpRightFromSquare} /></button>
          <button className="dropDownDugme" onClick={handleRegistracija}>Registracija <FontAwesomeIcon icon={faFileContract} /></button></> :
          <button className="dropDownDugme" onClick={() => { handleOdjava(); }} >Odjavi se <FontAwesomeIcon icon={faArrowRightToBracket} /></button>}


      </div>
    </div>

  )
}
export default DropDown;    