import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GornjiDeo from './GornjiDeo';
import ONama from './ONama';

import './stilovi.css';
import { faAddressCard, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import Kontakt from './Kontakt';
import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons/faMapLocationDot';
import DonjiDeo from './DonjiDeo';
import {  Route, Routes, useNavigate } from 'react-router-dom';
import ProdavnicaMain from './ProdavnicaMain';
import { useEffect, useState } from 'react';


const GlavnaStrana=()=> {
  const navigate=useNavigate();
  const [trenutniScroll, setTrenutniScroll] = useState(0);
  const [oNamaScroll,setONamaScroll]=useState(0);
  const [kontaktScroll,setKontaktScroll]=useState(0);
  const [aktivnoDugme,setAktivnoDugme]=useState(0);
  const [scroll, setScroll] = useState(true);

  const handleProdavnica=()=>{
    navigate("/prodavnica");}
    useEffect(() => {
    const handleScroll = () => {
      setTrenutniScroll(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    const oNama = document.getElementById("oNama");
    const kontakt = document.getElementById("kontakt");
    const oNamaPozicija = oNama.getBoundingClientRect().top;
    const kontaktPozicija = kontakt.getBoundingClientRect().top;
    setONamaScroll(oNamaPozicija);
    setKontaktScroll(kontaktPozicija);
  
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      setTrenutniScroll(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (scroll) {
      if (trenutniScroll < oNamaScroll) {
        setAktivnoDugme(0);
      }
      if (trenutniScroll >= oNamaScroll || trenutniScroll < kontaktScroll) {
        setAktivnoDugme(1);
      }
      if (
        trenutniScroll >= kontaktScroll ||
        (trenutniScroll > oNamaScroll)
      ) {
        setAktivnoDugme(2);
      }
     
    }
  }, [scroll,oNamaScroll, kontaktScroll, trenutniScroll]);


  
  return (
    <body onScroll={(e) => setTrenutniScroll(e.currentTarget.scrollTop)}>
      <header>
        <GornjiDeo aktivno={aktivnoDugme} setAktivno={setAktivnoDugme} handleProdavnica={handleProdavnica}vidjliviDugmici={true} handleSlika={()=>navigate("/")} kontaktScroll={kontaktScroll} aktivnoDugme={aktivnoDugme} prviId={'oNama'} drugiId={'kontakt'} oNamaScroll={oNamaScroll} setScroll={setScroll} setTrenutnaPozicija={setTrenutniScroll} />
      </header>
     <main className="mainDiv">
     <div id='oNama' className='oNamaDiv'>
      <ONama naslov="O nama" ikonica={<FontAwesomeIcon icon={faInfoCircle} />} tekst="Naša prodavnica je mesto gde ljubitelji biciklizma mogu pronaći sve što im je potrebno – od kvalitetnih novih i polovnih bicikala do profesionalnog servisa i stručnih saveta. Bez obzira da li vozite rekreativno, svakodnevno ili se bavite sportskim biciklizmom, trudimo se da svakom kupcu ponudimo najbolje rešenje.

U našoj ponudi nalazi se širok izbor novih i pažljivo proverenih polovnih bicikala različitih tipova i brendova. Svaki polovni bicikl prolazi detaljan pregled i servis kako bi bio potpuno ispravan i spreman za bezbednu vožnju.

Pored prodaje, pružamo i kompletne servisne usluge. Naš stručni tim obavlja redovno održavanje, dijagnostiku kvarova, zamenu delova, podešavanje kočnica i menjača, centriranje točkova, zamenu guma i sve ostale popravke koje će vaš bicikl održati u vrhunskom stanju.

Naš cilj je da svakom kupcu pružimo kvalitetnu uslugu, pouzdane proizvode i profesionalnu podršku. Verujemo da je svaki bicikl početak nove avanture, zbog čega se trudimo da pronađemo idealno rešenje za vaše potrebe i budžet.

Posetite nas i uverite se zašto nam veliki broj zadovoljnih kupaca ukazuje poverenje. Bilo da kupujete svoj prvi bicikl, tražite kvalitetan polovni model ili vam je potreban brz i pouzdan servis, tu smo da vam pomognemo." /></div>
<div id='kontakt' className='kontaktDiv'>  <Kontakt ikonicaMapa={<FontAwesomeIcon icon={faMapLocationDot}/>} naslov="Kontakt" ikonicaNaslov={<FontAwesomeIcon icon={faAddressCard}/>} tekst="Kontaktirajte nas putem e-maila ili telefona za više informacija o našim proizvodima i uslugama."/></div>
     </main>
     <footer>
      <DonjiDeo/>
     </footer>
    </body>
    
  );
}
const App=()=>{
  return(
    <Routes>
      <Route path="/" element={<GlavnaStrana/>}/>
      <Route path="/prodavnica" element={<ProdavnicaMain/>}/>
    </Routes>
  )
}
export default App;
