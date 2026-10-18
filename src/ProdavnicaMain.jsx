import { useEffect, useState } from 'react';
import GornjiDeo from './GornjiDeo';
import './stilovi.css';
import { useNavigate } from 'react-router-dom';
import supabase from './supabaseClient';
import Proizvodi from './Proizvodi';
import PrikazProizvoda from './PrikazProizvoda';
import SideBar from './SideBar';
import Pretraga from './Pretraga';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import OdlozeniPrikaz from './OdlozenPrikaz';
import Prijava from './Prijava';
import Registracija from './Registracija';
import DonjiDeo from './DonjiDeo';
import PromenaLozinke from './PromenaLozinke';
import Korpa from './Korpa';
import Alert from './Alert';

const ProdavnicaMain = () => {
  const navigate = useNavigate();

  const [proizvodi, setProizvodi] = useState([]);
  const [prikazi, setPrikazi] = useState(false);
  const [proizvodjaci, setProizvodjaci] = useState([]);
  const [otvoriSideBar, setOtvoriSideBar] = useState(false);
  const [izabraniProizvodjaci, setIzabraniProizvodjaci] = useState([]);
  const [sortiranje, setSortiranje] = useState("");
  const [izabraniTip, setIzabraniTip] = useState("");
  const [pretragaVrednost, setPretragaVrednost] = useState("");
  const [pretraga, setPretraga] = useState("")
  const [korisnickoIme, setKorisnickoIme] = useState("");
  const [openPrijava, setOpenPrijava] = useState(false);
  const [openKorpa, setOpenKorpa] = useState(false);
  const [openRegistracija, setOpenRegistracija] = useState(false);
  const [promenaLozinkeOpen, setPromenaLozinke] = useState(false);
  const [korpaLista, setKorpaLista] = useState([]);
  const [poruka, setPoruka] = useState("");
  const [uspesno, setUspesno] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [brojac, setBrojac] = useState(0);
  const [korisnikPodaci, setKorisnikPodaci] = useState({
    korisnikId: null,
    naziv: "",
    email: "",
    brojTelefona: "",
    grad: "",
    adresa: "",
  })
  const [izabraniProizvod, setIzabraniProizvd] = useState({
    naslov: "",
    proizvodjac: "",
    slike: [],
    opis: "",
    specifikacija: "",
    popust: 0,
    cena: 0,
  }
  );
  const handleHome = () => {
    navigate("/");
  };

  const handleDodaj = (proizvod) => {
    setOpenAlert(false);

    const noviProizvod = {
      ...proizvod,
      popust: proizvod.popust ?? null
    };

    const postoji = korpaLista.find(
      (p) => p.proizvodId === noviProizvod.proizvodId
    );

    if (postoji) {
      setKorpaLista(
        korpaLista.map((p) =>
          p.proizvodId === noviProizvod.proizvodId
            ? {
              ...p,
              kolicina: p.kolicina + noviProizvod.kolicina
            }
            : p
        )
      );
    } else {
      setKorpaLista([...korpaLista, noviProizvod]);
    }
    setBrojac(brojac + 1);
    setPoruka(
      <>
        Proizvod je uspešno dodat u korpu +
        <FontAwesomeIcon icon={faShoppingCart} />
      </>
    );


    setUspesno(true);

    setTimeout(() => {
      setOpenAlert(true);
    }, 200);
  };

  const proizvodjaciSupabase = async () => {
    const { data, error } = await supabase
      .from("Proizvodjac")
      .select("*");

    if (error) {
      console.error(error);
      return;
    }

    setProizvodjaci(data);
  };

  const proizvodiSupabase = async () => {
    const { data, error } = await supabase
      .from("Proizvod")
      .select("*");

    if (error) {
      console.error(error);
      return;
    }

    setProizvodi(data);
  };
  const handleOpenKorpa = () => {
    setOpenKorpa(!openKorpa);
  }
  const handlePretraga = () => {
    setPretraga(pretragaVrednost);
    setIzabraniProizvodjaci([]);
    setIzabraniTip("");
  }
  const hanldeProizvodjaci = (proizvodjac) => {
    if (izabraniProizvodjaci.includes(proizvodjac)) {
      setIzabraniProizvodjaci(
        izabraniProizvodjaci.filter((p) => p !== proizvodjac)
      );
    }

    else {
      setIzabraniProizvodjaci([...izabraniProizvodjaci, proizvodjac]);
    }
    setPretraga("");
    setPretragaVrednost("");
  }
  const filtriraniProizvodi = proizvodi.filter((p) => {
    if (izabraniProizvodjaci.length > 0) {
      const proizvodjac = proizvodjaci.find((pr) => pr.proizvodjacId === p.proizvodjacId);
      if (!izabraniProizvodjaci.includes(proizvodjac?.naziv)) {
        return false;
      }
    }
    if (izabraniTip !== "" && p.tip !== izabraniTip) {
      return false;
    }
    if (pretraga !== "" && !p.naziv.toLowerCase().includes(pretraga.toLowerCase())) {
      return false;
    }
    return true;
  })

    .sort((a, b) => {
      if (sortiranje === "Najniža cena") {
        return a.cena - b.cena;
      }
      if (sortiranje === "Najviša cena") {
        return b.cena - a.cena;
      }
      return 0;
    });

  useEffect(() => {
    proizvodiSupabase();
    proizvodjaciSupabase();
  }, []);

  return (
    <div >
      {openAlert ? <Alert poruka={poruka} uspesno={uspesno} setOpen={setOpenAlert} /> : undefined}
      {prikazi ? <PrikazProizvoda cena={izabraniProizvod.cena} popust={izabraniProizvod.popust} slike={izabraniProizvod.slike} slikesetPrikaz={setPrikazi} naslov={izabraniProizvod.naslov} proizvodjac={izabraniProizvod.proizvodjac} setPrikaz={setPrikazi} opis={izabraniProizvod.opis} specifikacija={izabraniProizvod.specifikacija} /> : undefined}
      {openPrijava ? <Prijava setPoruka={setPoruka} setOpenAlert={setOpenAlert} setUspesno={setUspesno} handleGasi={() => setOpenPrijava(false)} setKorisnickoIme={setKorisnickoIme} setPromenaLozinke={setPromenaLozinke} setKorisnikPodaci={setKorisnikPodaci} /> : undefined}
      {openRegistracija ? <Registracija setPoruka={setPoruka} setOpenAlert={setOpenAlert} setUspesno={setUspesno} handleGasi={() => { setOpenRegistracija(false) }} /> : undefined}
      {promenaLozinkeOpen ? <PromenaLozinke setGasi={setPromenaLozinke} setOpenAlert={setOpenAlert} setPoruka={setPoruka} setUspesno={setUspesno} /> : undefined}
      {openKorpa ? <Korpa setPoruka={setPoruka} setOpenAlert={setOpenAlert} setUspesno={setUspesno} handleOpenKorpa={handleOpenKorpa} lista={korpaLista} handleIsprazni={() => { setKorpaLista([]); }} setLista={setKorpaLista} korisinickoIme={korisnickoIme} korisnikPodaci={korisnikPodaci} /> : undefined}
      <header>
        <GornjiDeo handleSlika={handleHome} korisnickoIme={korisnickoIme} setKorisnickoIme={setKorisnickoIme} setOpenPrijava={setOpenPrijava} setOpenRegistracija={setOpenRegistracija} />
      </header>
      <main className="prodavnicaMainDiv">
        <div className="pretragaDiv">
          <Pretraga vrednost={pretragaVrednost} setVrednost={setPretragaVrednost} handlePretraga={handlePretraga} />
          <button className="pretragaDugme" onClick={() => { setOtvoriSideBar(true) }}><FontAwesomeIcon icon={faFilter} /></button>
          <button className='pretragaDugme' onClick={handleOpenKorpa} style={{ display: "flex", justifyContent: "center", textAlign: "center", alignContent: "center" }}>
            <FontAwesomeIcon icon={faShoppingCart} />
          </button>
        </div>
        <div className="prodavnicaMainProizvodi">

          {filtriraniProizvodi.length === 0 ? <OdlozeniPrikaz vreme={700} sadrzaj={<p className="nemaProizvoda">Nema proizvoda</p>} /> : undefined}
          {filtriraniProizvodi.map((p) => {
            const proizvodjac = proizvodjaci.find(
              (pr) =>
                pr.proizvodjacId === p.proizvodjacId
            );
            let slike = [];
            if (p.slika1 !== null) {
              slike.push(p.slika1);
            }
            if (p.slika2 !== null) {
              slike.push(p.slika2);
            }
            if (p.slika3 !== null) {
              slike.push(p.slika3);
            }
            return (<>

              <Proizvodi slika={p.slika1} naziv={p.naziv} cena={p.cena} popust={p.popust} proizvodId={p.proizvodId} handleIzabraniProizvod={() => {
                setPrikazi(true); setIzabraniProizvd({
                  naslov: p.naziv,
                  proizvodjac: proizvodjac?.naziv,
                  slike: slike,
                  opis: p.opis,
                  specifikacija: p.specifikacija,
                  popust: p.popust,
                  cena: p.cena,
                });
              }}
                handleDodaj={handleDodaj} />
            </>)
          })}
        </div>
        <SideBar
          proizvodjaci={proizvodjaci}
          handleProizvodjac={hanldeProizvodjaci}
          izabraniProizvodjaci={izabraniProizvodjaci}
          sortiranje={sortiranje}
          setSortiranje={setSortiranje}
          izabraniTip={izabraniTip}
          setIzabraniTip={setIzabraniTip}
          otvoren={otvoriSideBar}
          handleSideBar={() => setOtvoriSideBar(false)}
        />
      </main>
      <footer style={filtriraniProizvodi.length < 10 ? { marginTop: "1000px" } : undefined}>      <DonjiDeo />
      </footer>
    </div>
  );
}

export default ProdavnicaMain;