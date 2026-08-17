import GornjiDeo from './GornjiDeo';


import './stilovi.css';

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
