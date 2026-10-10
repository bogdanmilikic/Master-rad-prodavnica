import { faArrowUpRightFromSquare, faCheck, faDoorOpen, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import supabase from "./supabaseClient";

const Prijava = ({ setPoruka, setUspesno, setOpenAlert, korisnickoIme, setKorisnickoIme, handleGasi, setPromenaLozinke, setKorisnikPodaci }) => {
    const [korisnik, setKorisinik] = useState("");
    const [sifra, setSifra] = useState("");
    const handlePrijava = async () => {
        if (korisnik === "") {
            setPoruka("Unesite korisničko ime !");
            setUspesno(false);
            setOpenAlert(true);
            return;
        }
        if (sifra === "") {
            setPoruka("Unesite lozinku !");
            setUspesno(false);
            setOpenAlert(true);
            return;
        }
        const { data, error } = await supabase
            .from("Korisnik")
            .select("korisnikId, naziv, email, brojTelefona, grad, adresa")
            .eq("naziv", korisnik)
            .eq("sifra", sifra)
            .maybeSingle();
        if (error) {
            console.error(error);
            setPoruka("Greška prilikom prijave!");
            setUspesno(false);
            setOpenAlert(true);
            return;
        }
        if (!data) {
            setPoruka("Pogrešno korisničko ime ili lozinka!");
            setUspesno(false);
            setOpenAlert(true);
            return;
        }
        setKorisnickoIme(data.naziv);
        setPoruka("Uspešna prijava !");
        setKorisnikPodaci({
            korisnikId: data.korisnikId,
            naziv: data.naziv,
            email: data.email,
            brojTelefona: data.brojTelefona,
            grad: data.grad,
            adresa: data.adresa,
        });
        setUspesno(true);
        setOpenAlert(true);
        handleGasi();
    };
    return (
        <div className="popUpContainer">
            <div className="prijavaSadrzaj">
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <h1>Prijava <FontAwesomeIcon icon={faArrowUpRightFromSquare} /></h1>
                    <button className="gasiKorisnikForme" onClick={handleGasi} ><FontAwesomeIcon icon={faX} /></button>
                </div>
                <hr />
                <input className="inputPrijava" placeholder="Unesite vaše korisničko ime" value={korisnik} onChange={(e) => { setKorisinik(e.target.value) }} />
                <input className="inputPrijava" placeholder="Unesite vašu lozinku" value={sifra} onChange={(e) => { setSifra(e.target.value) }} />
                <p className="zaboravljenaLozinka" onClick={() => { handleGasi(); setPromenaLozinke(true); }}>Zaboravili lozinku ?</p>

                <menu style={{ display: "flex", justifyContent: "center", padding: "0px", gap: "20px" }}>
                    <button className="prijavaDugmePrijavi" onClick={handlePrijava}> <FontAwesomeIcon icon={faCheck} />  Prijavi se</button>
                    <button className="prijavaDugmeOtkazi" onClick={handleGasi}>Izlaz <FontAwesomeIcon icon={faDoorOpen} /></button>
                </menu>
            </div>
        </div>
    )
}
export default Prijava;