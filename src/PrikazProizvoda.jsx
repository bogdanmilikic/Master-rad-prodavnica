import { faInfoCircle, faMoneyBill1, faTruckFast, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ImageSlide from "./ImageSlike";
import { faTrello } from "@fortawesome/free-brands-svg-icons";

const PrikazProizvoda=({setPrikaz,naslov,slike,proizvodjac,opis,specifikacija,cena,popust})=>{
    return(
        <div className="popUpContainer">
            <div className="prikazProizvodaDiv">
                <button className="prikazProizvodaX" onClick={()=>{setPrikaz(false)}}><FontAwesomeIcon icon={faX}/></button>
                <p className="prikazProizvodaNaslov">{naslov}/{proizvodjac}</p>
                <hr/>
                <div className="prikazProizvodaSrednjiDeo">
                <ImageSlide slike={slike}/>
                <div style={{marginTop:"15px"}}  className="prikazProizvodaTekst">
                    <h2 className="prikazProizvodaPodNaslov">
      <FontAwesomeIcon icon={faTrello}/>  Specifikacije:</h2>
        <hr/>
                    {specifikacija}
                    <h2 className="prikazProizvodaPodNaslovCena" ><FontAwesomeIcon icon={faMoneyBill1}/>  Cena:</h2>
                    <hr/>
                    <menu className="prikazProizvodaCena">
 {popust!==null?<><p className="proizvodiCenaBezPopusta">{cena} RSD</p><p className="proizvodiCena">{popust} RSD</p>
</>:<><p className="proizvodiCena"> {cena} RSD</p></>} <img className="karticaLogo"src="\Visa logo.png"/><img className="karticaLogo" src="\MasterCard logo.png"/></menu>
<FontAwesomeIcon icon={faTruckFast}/>   Dostava do 3 radna dana
                </div>
                
            </div>
                 <h2 className="prikazProizvodaPodNaslovCena"><FontAwesomeIcon icon={faInfoCircle}/>  Opis:</h2>
                <hr/>
                <p className="prikazProizvodaTekst" >
                {opis}</p>
            </div>
        </div>
    )
}
export default PrikazProizvoda;