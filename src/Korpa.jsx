import { faCancel, faCheck, faDoorOpen, faEnvelope, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import KorpaProizvod from "./KorpaProizvod";
import { useRef, useState } from "react";
import supabase from "./supabaseClient";

const Korpa = ({ lista, handleOpenKorpa, handleIsprazni, setLista, korisinickoIme, korisnikPodaci, setPoruka, setOpenAlert, setUspesno, setBrojac }) => {
    const [imePrezime, setImePrezime] = useState("");
    const [eMail, setEmail] = useState("");
    const eMailRef = useRef(null);
    const [brojTelefona, setBrojTelefona] = useState("");
    const [grad, setGrad] = useState("");
    const [adresa, setAdresa] = useState("");
    let ukupnaCena = 0;

    lista.forEach((p) => {
        ukupnaCena += p.cena * p.kolicina;
    });
    const handlePotvrda = async () => {

        if (lista.length === 0) {
            setPoruka("Morate izabrati neki proizvod kako biste potvrdili porudžbinu !");
            setUspesno(false);
            setOpenAlert(true);
            return;
        }

        if (korisinickoIme === "") {

            if (
                imePrezime.trim() === "" ||
                brojTelefona.trim() === "" ||
                eMail.trim() === "" ||
                grad.trim() === "" ||
                adresa.trim() === ""
            ) {
                setPoruka("Morate popuniti sve podatke za dostavu !");
                setUspesno(false);
                setOpenAlert(true);
                return;
            }

            if (eMailRef.current.checkValidity() === false) {
                setPoruka("Uneti validnu e-mail adresu");
                setUspesno(false);
                setOpenAlert(true);
                return;
            }
        }

        let ukupnaCena = 0;

        lista.forEach((p) => {
            ukupnaCena += p.cena * p.kolicina;
        });


        let podaciPorudzbine;

        if (korisinickoIme === "") {
            podaciPorudzbine = {
                korisnikId: null,
                cena: ukupnaCena,
                grad: grad,
                adresa: adresa,
                brojTelefona: brojTelefona,
                email: eMail
            };
        } else {
            podaciPorudzbine = {
                korisnikId: korisnikPodaci.korisnikId,
                cena: ukupnaCena,
                grad: korisnikPodaci.grad,
                adresa: korisnikPodaci.adresa,
                brojTelefona: korisnikPodaci.brojTelefona,
                email: korisnikPodaci.email
            };
        }

        const { data: porudzbina, error: greskaPorudzbine } = await supabase
            .from("Porudzbina")
            .insert([podaciPorudzbine])
            .select("porudzbinaId")
            .single();

        if (greskaPorudzbine) {
            console.error(greskaPorudzbine);

            setPoruka("Došlo je do greške prilikom kreiranja porudžbine !");
            setUspesno(false);
            setOpenAlert(true);
            return;
        }

        const { data: poslednjaStavka, error: greskaStavkeId } = await supabase
            .from("StavkePorudzbine")
            .select("stavkeId")
            .order("stavkeId", { ascending: false })
            .limit(1)
            .maybeSingle();

        if (greskaStavkeId) {
            console.error(greskaStavkeId);

            setPoruka("Došlo je do greške prilikom određivanja ID-a stavke !");
            setUspesno(false);
            setOpenAlert(true);
            return;
        }

        let sledeciStavkeId = 1;

        if (poslednjaStavka) {
            sledeciStavkeId = poslednjaStavka.stavkeId + 1;
        }

        const stavke = lista.map((p, index) => ({
            stavkeId: sledeciStavkeId + index,
            proizvodId: p.proizvodId,
            kolicina: p.kolicina,
            cena: p.cena,
            porudzbinaId: porudzbina.porudzbinaId
        }));

        console.log("STAVKE ZA SLANJE:", stavke);

        const { error: greskaStavki } = await supabase
            .from("StavkePorudzbine")
            .insert(stavke);

        if (greskaStavki) {
            console.error(greskaStavki);

            setPoruka("Porudžbina je kreirana, ali je došlo do greške prilikom dodavanja stavki !");
            setUspesno(false);
            setOpenAlert(true);
            return;
        }
        console.log("LISTA:", lista);

        lista.forEach((p) => {
            console.log("PROIZVOD:", p.naziv, "ID:", p.proizvodId);
        });
        setPoruka("Uspešan prijem porudžbine !");
        setUspesno(true);
        setOpenAlert(true);

        setLista([]);
        setImePrezime("");
        setEmail("");
        setBrojTelefona("");
        setGrad("");
        setAdresa("");
        setBrojac(0);
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
                        <h3>Ukupna cena svih izabranih proizvoda je: <u>{ukupnaCena}</u> RSD</h3>
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