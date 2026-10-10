import {  faHourglass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

const OdlozeniPrikaz=({vreme,sadrzaj})=>{
    const [prikazi,setPrikazi]=useState(false);
    useEffect(() => {
   setTimeout(()=>{
setPrikazi(true)
   },vreme)
    }, )
    
    return(
        <div>
            {prikazi?sadrzaj:<p className="ucitavanjeTekst">Učitavanje <FontAwesomeIcon icon={faHourglass}/></p>}
            
        </div>
    )
}
export default OdlozeniPrikaz;