import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GornjiDeo from './GornjiDeo';
import ONama from './ONama';

import './stilovi.css';
import { faAddressCard, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import Kontakt from './Kontakt';
import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons/faMapLocationDot';
import DonjiDeo from './DonjiDeo';
import { useNavigate } from 'react-router-dom';

function ProdavnicaMain() {
    const navigate=useNavigate();
    const handleHome=()=>{
        navigate("/");
    }
  return (
    <div >
        <header>    <GornjiDeo handleSlika={handleHome}/>
    </header>
<main>
komentar za brisanje
</main>

    </div>
    
  );
}

export default ProdavnicaMain;
