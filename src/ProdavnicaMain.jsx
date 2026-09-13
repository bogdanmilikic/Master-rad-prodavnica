import { useEffect, useState } from 'react';
import GornjiDeo from './GornjiDeo';
import './stilovi.css';
import { useNavigate } from 'react-router-dom';
import supabase from './supabaseClient';
import Proizvodi from './Proizvodi';
import PrikazProizvoda from './PrikazProizvoda';

const  ProdavnicaMain=()=> {
  const navigate = useNavigate();

  const [proizvodi, setProizvodi] = useState([]);
  const [prikazi,setPrikazi]=useState(false);
const [proizvodjaci,setProizvodjaci]=useState([]);
const [izabraniProizvod,setIzabraniProizvd]=useState({
naslov:"",
proizvodjac:"",
slike:[],
opis:"",
specifikacija:"",
popust:0,
cena:0,
}
);
  const handleHome = () => {
    navigate("/");
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

  useEffect(() => {
    proizvodiSupabase();
    proizvodjaciSupabase();
    console.log(izabraniProizvod)
  }, [izabraniProizvod]);

  return (
    <div>
      {prikazi?<PrikazProizvoda cena={izabraniProizvod.cena} popust={izabraniProizvod.popust} slike={izabraniProizvod.slike} slikesetPrikaz={setPrikazi} naslov={izabraniProizvod.naslov} proizvodjac={izabraniProizvod.proizvodjac} setPrikaz={setPrikazi} opis={izabraniProizvod.opis} specifikacija={izabraniProizvod.specifikacija}/>:undefined}

      <header>
        <GornjiDeo handleSlika={handleHome} />
      </header>
<main className="prodavnicaMainProizvodi">
          {proizvodi.map((p) => 
            {
                 const proizvodjac = proizvodjaci.find(
            (pr) =>
              pr.proizvodjacId === p.proizvodjacId
          );
          let slike=[];
          if(p.slika1 !==null){
            slike.push(p.slika1);
          }
        if(p.slika2 !==null){
            slike.push(p.slika2);
          }
          if(p.slika3 !==null){
            slike.push(p.slika3);
          }
            return(<>
      
<Proizvodi slika={p.slika1} naziv={p.naziv} cena={p.cena} popust={p.popust} handleIzabraniProizvod={()=>{setPrikazi(true);setIzabraniProizvd({
  naslov:p.naziv,
  proizvodjac:proizvodjac?.naziv,
  slike:slike,
  opis:p.opis,
  specifikacija:p.specifikacija,
  popust:p.popust,
  cena:p.cena,
  
})}}/>
          </>)
})}
      </main>
    </div>
  );
}

export default ProdavnicaMain;