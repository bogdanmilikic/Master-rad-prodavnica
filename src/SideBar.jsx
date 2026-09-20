import { faFilter, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ComboBox from "./ComboBox";
import RadioButton from "./RadioButton";

const SideBar=({   proizvodjaci,
    izabraniProizvodjaci,
    handleProizvodjac,
    sortiranje,
    setSortiranje,
    izabraniTip,
    setIzabraniTip,
    handleSideBar,
    otvoren})=>{
    return(

<div className={`sideBarContainer ${otvoren ? "sideBarOtvoren" : ""}`}>
    <div className="sideBarDiv">
    <div className="sideBarGornjiDeo"><button className="gasiSideBar" onClick={handleSideBar}><FontAwesomeIcon icon={faX}/></button> <div><p>Filter  <FontAwesomeIcon icon={faFilter}/></p></div></div>
  <p >Sortiranje: </p> <ComboBox opcije={ ["","Najniža cena","Najviša cena"]} vrednost={sortiranje} setVrednost={setSortiranje}/>
  <hr />
  <p >Vrsta proizvoda: </p> <ComboBox opcije={ ["","Bicikl","Dodatna oprema"]} vrednost={izabraniTip} setVrednost={setIzabraniTip}/>
  <hr />
  <p>Brendovi</p>
  <div className="sideBarRadioButtonDivContainer">
{proizvodjaci?.map(p=>{
    return(
 <RadioButton
              key={p.proizvodjacId || p.id || p.naziv}
              naslov={p.naziv}
              aktivno={izabraniProizvodjaci.includes(p.naziv)}
              onClick={handleProizvodjac}
            />
    )
})}
           
  
</div>
</div>
</div>
    );
}
export default SideBar;