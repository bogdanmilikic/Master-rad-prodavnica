import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ImageSlide from "./ImageSlike";

const PrikazProizvoda=({setPrikaz,naslov,slike,proizvodjac,opis,specifikacija})=>{
    return(
        <div className="popUpContainer">
            <div className="prikazProizvodaDiv">
                <button className="prikazProizvodaX" onClick={()=>{setPrikaz(false)}}><FontAwesomeIcon icon={faX}/></button>
                <p className="prikazProizvodaNaslov">{naslov}/{proizvodjac}</p>
                <hr/>
                <div className="prikazProizvodaSrednjiDeo">
                <ImageSlide slike={slike}/>
                <div style={{marginTop:"15px"}}  className="prikazProizvodaTekst">
        Specifikacije:<br/>
        <hr/>
                    {specifikacija}
                </div>
            </div>
                <p className="prikazProizvodaTekst">Opis:<br/>
                <hr/>
                {opis}</p>
            </div>
        </div>
    )
}
export default PrikazProizvoda;