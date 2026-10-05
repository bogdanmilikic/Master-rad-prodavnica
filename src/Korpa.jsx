import { faCancel, faCheck, faDoorOpen, faEnvelope, faPerson, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import KorpaProizvod from "./KorpaProizvod";
import { useRef, useState } from "react";
import supabase from "./supabaseClient";

const Korpa = ({ lista, handleOpenKorpa, handleIsprazni, setLista, korisinickoIme, korisnikID, setPoruka, setOpenAlert, setUspesno }) => {
    const [imePrezime, setImePrezime] = useState("");
    const [eMail, setEmail] = useState("");
    const eMailRef = useRef(null);
    const [brojTelefona, setBrojTelefona] = useState("");
    const [grad, setGrad] = useState("");
    const [adresa, setAdresa] = useState("");
    const handlePotvrda = async () => {

        if (lista.length === 0) {
            setPoruka("Morate izabrati neki proizvod kako biste potvrdili porudžbinu !");
            setUspesno(false);
            setOpenAlert(true);
            return;
        }

        if (korisinickoIme === "") {
            if (
                eMail.trim() === "" ||
                eMailRef.current.checkValidity() === false
            ) {
                setPoruka("Uneti validnu e-mail adresu");
                setUspesno(false);
                setOpenAlert(true);
                return;
            }
        }

        const stavkeId = Date.now();

        const stavke = lista.map((p) => ({
            stavkeId: stavkeId,
            proizvodId: p.proizvodId,
            kolicina: p.kolicina,
            cena: p.cena
        }));

        const { data, error } = await supabase
            .from("StavkePorudzbine")
            .insert(stavke)
            .select();

        if (error) {
            console.error(error);

            setPoruka("Došlo je do greške prilikom slanja porudžbine !");
            setUspesno(false);
            setOpenAlert(true);
            return;
        }

        setPoruka("Uspešan prijem porudžbine !");
        setUspesno(true);
        setOpenAlert(true);

        setLista([]);
        setImePrezime("");
        setBrojTelefona("");
        setGrad("");
        setAdresa("");
    };
    return (
        <div className="popUpContainer">
            <div className="korpaSadrzaj">
                <h1>Korpa <FontAwesomeIcon icon={faShoppingCart} /></h1>
                <hr />
                {lista.length === 0 ?
                    <p className="nemaProizvoda">Korpa je prazna</p> :
                    <>
                        <KorpaProizvod lista={lista} setLista={setLista} />

                    </>
                }
                {korisinickoIme === "" && lista.length !== 0 ? <>
                    <h2>Informacije za pošiljku  <FontAwesomeIcon icon={faEnvelope} /></h2>
                    <hr />
                    <input className="inputPrijava" placeholder="Unesite Vaše ime i prezime" value={imePrezime} onChange={(e) => setImePrezime(e.target.value)} />
                    <input className="inputPrijava" placeholder="Unesite Vaš broj telefona" value={brojTelefona} onChange={(e) => setBrojTelefona(e.target.value)} />
                    <input className="inputPrijava" placeholder="Unesite Vašu E-mail adresu" type="email" ref={eMailRef}
                        required value={eMail} onChange={(e) => setEmail(e.target.value)} />
                    <input className="inputPrijava" placeholder="Unesite Vaš grad" value={grad} onChange={(e) => setGrad(e.target.value)} />
                    <input className="inputPrijava" placeholder="Unesite Vašu adresu " value={adresa} onChange={(e) => setAdresa(e.target.value)} />

                </> : undefined}


                <menu style={{ display: "flex", justifyContent: "space-evenly", padding: "0px", gap: "20px" }}>
                    <button className="prijavaDugmePrijavi" onClick={handlePotvrda}> <FontAwesomeIcon icon={faCheck} />  Potvrdi</button>
                    <button className="korpaDugmeIsprazni" onClick={handleIsprazni}>Isprazni <FontAwesomeIcon icon={faCancel} /></button>
                    <button className="prijavaDugmeOtkazi" onClick={handleOpenKorpa}>Izlaz <FontAwesomeIcon icon={faDoorOpen} /></button>
                </menu>
            </div>
        </div>
    )
}
export default Korpa;