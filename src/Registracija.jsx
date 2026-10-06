import {  faCheck, faDoorOpen, faFileContract } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import supabase from "./supabaseClient";
import { useRef, useState } from "react";

const Registracija=({handleGasi,setUspesno,setPoruka,setOpenAlert})=>{
    const [korisnickoIme,setKorisnickoIme]=useState("");
    const [sifra,setSifra]=useState("");
    const [brojTelefona,setBrojTelefona]=useState("");
    const [eMail,setEmail]=useState("");
    const eMailRef = useRef(null);
    const [grad,setGrad]=useState("");
    const [adresa,setAdresa]=useState();

 const handleRegistracija = async () => {

        if (
            korisnickoIme === "" ||
            sifra === "" ||
            brojTelefona === "" ||
            eMail === ""
            ||
            adresa===""||
            grad===""
        ) {
            alert("Popunite sva polja!");
            return;
        }

        const { data, error } = await supabase
            .from("Korisnik")
            .insert([
                {
                    naziv: korisnickoIme,
                    email: eMail,
                    brojTelefona: brojTelefona,
                    sifra: sifra,
                    adresa: adresa,
                    grad: grad,
                }
            ])
            .select();
    if (eMail.trim() === "" || eMailRef.current.checkValidity() === false) {
      setPoruka(
      "Uneti validnu e-mail adresu" );
      setUspesno(false);
      setOpenAlert(true);
      return;
    }
        if (error) {
            console.error(error);
            setPoruka("Greška prilikom ! ~Moguće da je korisničko ime, e-mail ili broj telefona već u upotrebi~");
            setUspesno(false);
            setOpenAlert(true);
            return;
        }

        console.log("Korisnik uspešno registrovan:", data);
        setPoruka("Uspešno ste se registrovali!");
        setUspesno(true);
        setOpenAlert(true);
        setKorisnickoIme("");
        setSifra("");
        setEmail("");
        setBrojTelefona("");
        setGrad("");
        setAdresa("");
        handleGasi();

    };
    return(
 <div className="popUpContainer">
<div className="prijavaSadrzaj">

    <h1>Registracija <FontAwesomeIcon icon={faFileContract}/></h1>
    <hr/>
    <input className="inputPrijava" placeholder="Unesite korisničko ime" value={korisnickoIme} onChange={(e)=>{setKorisnickoIme(e.target.value)}} />
    <input className="inputPrijava" placeholder="Unesite lozinku" value={sifra} onChange={(e)=>{setSifra(e.target.value)}}/>
    <input className="inputPrijava" placeholder="Unesite Vaš broj telefona" value={brojTelefona} onChange={(e)=>{setBrojTelefona(e.target.value)}}/>
    <input className="inputPrijava" placeholder="Unesite Vašu email adresu" value={eMail} onChange={(e)=>{setEmail(e.target.value)}} type="email" ref={eMailRef}
        required/>
            <input className="inputPrijava" placeholder="Unesite grad" value={grad} onChange={(e)=>{setGrad(e.target.value)}} />
    <input className="inputPrijava" placeholder="Unesite Vašu adresu" value={adresa} onChange={(e)=>{setAdresa(e.target.value)}}/>

    <menu style={{display:"flex",justifyContent:"center",padding:"0px",gap:"20px"}}>
        <button className="prijavaDugmePrijavi" onClick={handleRegistracija}> <FontAwesomeIcon icon={faCheck} />  Prijavi se</button>
    <button className="prijavaDugmeOtkazi" onClick={handleGasi}>Izlaz <FontAwesomeIcon icon={faDoorOpen}/></button>
    </menu>
</div>
        </div>

    )
}
export default Registracija;