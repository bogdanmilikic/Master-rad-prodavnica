import { faArrowRight, faCheck, faDoorOpen, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import supabase from "../supabaseClient";

const PromenaLozinke=({setGasi,setOpenAlert,setPoruka,setUspesno})=>{
    const handleGasi=()=>{
        setGasi(false);
    }
    const [odobrenaPromena,setOdobrenaPromena]=useState(false);
    const [korisnikId, setKorisnikId] = useState(null);
    const [korisnickoIme,setKorisnickoIme]=useState("");
    const [brojTelefona,setBrojTelefona]=useState("");
    const [eMail,setEMail]=useState("");
    const [novaLozinka,setNovaLozinka]=useState("");
const handlePromenaLozinke = async () => {

    if (
        korisnickoIme === "" ||
        brojTelefona === "" ||
        eMail === ""
    ) {
        setPoruka("Morate uneti sve podatke !");
        setUspesno(false);
        setOpenAlert(true);
        return;
    }

    const { data, error } = await supabase
        .from("Korisnik")
        .select("korisnikId")
        .eq("naziv", korisnickoIme)
        .eq("brojTelefona", brojTelefona)
        .eq("email", eMail)
        .maybeSingle();

    if (error) {
        console.error(error);
        setPoruka("Došlo je do greške prilikom provere podataka.");
        setUspesno(false);
        setOpenAlert(true);
        return;
    }

    if (!data) {
        setPoruka("Uneti podaci nisu ispravni.");
        setUspesno(false);
        setOpenAlert(true);
        return;
    }

    setKorisnikId(data.korisnikId);
    setOdobrenaPromena(true);
    setPoruka("Podaci su ispravni, unesite novu lozinku.")
    setUspesno(true);
    setOpenAlert(true);
};
const handlePotvrdiNovuLozinku = async () => {

    if (novaLozinka === "") {
        setPoruka("Morate uneti novu lozinku !");
        setUspesno(false);
        setOpenAlert(true);
        return;
    }

    const { data, error } = await supabase
        .from("Korisnik")
        .update({
            sifra: novaLozinka
        })
        .eq("korisnikId", korisnikId)
        .select();

    if (error) {
        console.error("GREŠKA:", error);
        setPoruka("Greška prilikom promene lozinke.");
        setUspesno(false);
        setOpenAlert(true);
        return;
    }

    console.log("IZMENJEN KORISNIK:", data);

    setPoruka("Lozinka je uspešno promenjena !");
    setUspesno(true);
    setOpenAlert(true);
        setNovaLozinka("");    
            handleGasi();


};
    const sadrzaj=[<>
    <input className="inputPrijava"placeholder="Uneti Vaše korisničko ime" value={korisnickoIme} onChange={(e)=>setKorisnickoIme(e.target.value)}/>
     <input className="inputPrijava" placeholder="Uneti Vaš broj telefona" value={brojTelefona} onChange={(e)=>{setBrojTelefona(e.target.value)}}/>
   <input className="inputPrijava" placeholder="Uneti Vašu E-Mail adresu" value={eMail} onChange={(e)=>setEMail(e.target.value)}/>
    <menu style={{display:"flex",justifyContent:"center",padding:"0px",gap:"20px"}}>
        <button className="prijavaDugmePrijavi" onClick={handlePromenaLozinke} >Dalje   <FontAwesomeIcon icon={faArrowRight} />  </button>
            <button className="prijavaDugmeOtkazi" onClick={handleGasi}>Izlaz <FontAwesomeIcon icon={faDoorOpen}/></button>
        
</menu></>,<> <input className="inputPrijava"placeholder="Uneti novu lozinku" value={novaLozinka} onChange={(e)=>setNovaLozinka(e.target.value)}/>
  <menu style={{display:"flex",justifyContent:"center",padding:"0px",gap:"20px"}}>
        <button className="prijavaDugmePrijavi"  onClick={handlePotvrdiNovuLozinku}><FontAwesomeIcon icon={faCheck} />  Potvrdi</button>
            <button className="prijavaDugmeOtkazi" onClick={handleGasi}>Izlaz <FontAwesomeIcon icon={faDoorOpen}/></button> 
</menu>
</>]
    return(
 <div className="popUpContainer">
<div className="promenaLozinkeStavke">
    <h1>Promena lozinke <FontAwesomeIcon icon={faLock}/></h1>
    <hr/>
    {odobrenaPromena!==true?sadrzaj[0]:sadrzaj[1]}
</div>
        </div>
    )
}
export default PromenaLozinke;