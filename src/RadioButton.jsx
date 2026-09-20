import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RadioButton=({naslov,aktivno,onClick})=>{
  
    return(
<div className="radioButtonDiv">
    <p className="radioButtonNaslov">{naslov}</p>
        <div className={aktivno?"radioButtonAktivno":"raduoButtonNeaktivno"} onClick={()=>onClick(naslov)}><div><FontAwesomeIcon icon={faCircle}/></div></div>
</div>
    )
}
export default RadioButton;