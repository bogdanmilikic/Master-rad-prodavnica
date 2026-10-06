import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Forma from "./Forma";
import KontaktPolje from "./KontaktPolje";
import { faClock, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons/faPhone";
import { faStreetView } from "@fortawesome/free-solid-svg-icons/faStreetView";

const Kontakt = ({ naslov, ikonicaNaslov, ikonicaMapa }) => {
    return (
        <div className="tekstDiv">
            <div style={{ width: "100%" }}>
                <h1 className="tekstNaslov">{ikonicaNaslov}{"   "}{naslov}</h1>
                <hr />
                <div className="kontaktSadrzaj">
                    <KontaktPolje ikonica={<FontAwesomeIcon icon={faEnvelope} />} tekst={<>draganmilikic53@gmail.com<br />bogdanmilikic53@gmail.com</>} />
                    <KontaktPolje ikonica={<FontAwesomeIcon icon={faPhone} />} tekst={<>+381 64 154 9377<br />+381 64 555 4776</>} />
                    <KontaktPolje ikonica={<FontAwesomeIcon icon={faClock} />} tekst={<>Ponedeljak-Petak: 09:00-18:00<br />Subota-Nedelja: zatvoreno</>} />
                    <KontaktPolje ikonica={<FontAwesomeIcon icon={faStreetView} />} tekst={<>Mesto: Čačak<br />Adresa: Ulica Milutina Vujovića 16</>} />

                </div>

                {/* Mapa i forma */}
                <div className="kontaktDiv">
                    <div className="kontaktMapa">
                        <h1 className="tekstNaslov">{ikonicaMapa}{"   "}Lokacija</h1>

                        <iframe title="Mapa" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d718.9005569272729!2d20.3288192774516!3d43.88479243266455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47577226854be8b1%3A0x911d186e0fae3d7d!2z0JzQuNC70YPRgtC40L3QsCDQktGD0ZjQvtCy0LjRm9CwIDE2LCDQp9Cw0YfQsNC6!5e0!3m2!1ssr!2srs!4v1786046781972!5m2!1ssr!2srs" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>
                    </div>

                    <div >
                        <h1 className="tekstNaslov">{ikonicaMapa}{"   "}Postavite pitanje</h1>
                        <Forma />
                    </div></div></div>
        </div>

    )
}
export default Kontakt;
