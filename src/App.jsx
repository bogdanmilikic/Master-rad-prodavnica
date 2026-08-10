import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GornjiDeo from './GornjiDeo';
import ONama from './ONama';

import './stilovi.css';
import { faAddressCard, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import Kontakt from './Kontakt';
import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons/faMapLocationDot';

function App() {
  return (
    <div >
      <header>
        <GornjiDeo/>
      </header>
     <main>
     
      <ONama naslov="O nama" ikonica={<FontAwesomeIcon icon={faInfoCircle} />} tekst="Naša prodavnica je mesto gde ljubitelji biciklizma mogu pronaći sve što im je potrebno – od kvalitetnih novih i polovnih bicikala do profesionalnog servisa i stručnih saveta. Bez obzira da li vozite rekreativno, svakodnevno ili se bavite sportskim biciklizmom, trudimo se da svakom kupcu ponudimo najbolje rešenje.

U našoj ponudi nalazi se širok izbor novih i pažljivo proverenih polovnih bicikala različitih tipova i brendova. Svaki polovni bicikl prolazi detaljan pregled i servis kako bi bio potpuno ispravan i spreman za bezbednu vožnju.

Pored prodaje, pružamo i kompletne servisne usluge. Naš stručni tim obavlja redovno održavanje, dijagnostiku kvarova, zamenu delova, podešavanje kočnica i menjača, centriranje točkova, zamenu guma i sve ostale popravke koje će vaš bicikl održati u vrhunskom stanju.

Naš cilj je da svakom kupcu pružimo kvalitetnu uslugu, pouzdane proizvode i profesionalnu podršku. Verujemo da je svaki bicikl početak nove avanture, zbog čega se trudimo da pronađemo idealno rešenje za vaše potrebe i budžet.

Posetite nas i uverite se zašto nam veliki broj zadovoljnih kupaca ukazuje poverenje. Bilo da kupujete svoj prvi bicikl, tražite kvalitetan polovni model ili vam je potreban brz i pouzdan servis, tu smo da vam pomognemo." />
  <Kontakt ikonicaMapa={<FontAwesomeIcon icon={faMapLocationDot}/>} naslov="Kontakt" ikonicaNaslov={<FontAwesomeIcon icon={faAddressCard}/>} tekst="Kontaktirajte nas putem e-maila ili telefona za više informacija o našim proizvodima i uslugama."/>
     </main>
    </div>
    
  );
}

export default App;
