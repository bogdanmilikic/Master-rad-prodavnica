import { faFacebook, faInstagram, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DonjiDeo=()=>{
    return(
        <div className="donjiDeoDiv">
            <div>
            <img className="donjiDeoLogo" src="/Logo.png" alt="Logo" /></div>
         
            <div className="donjiDeoDugmeDiv">
                <button className="donjiDeoDugme"><a href="https://www.facebook.com/" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faFacebook}/></a></button>
                <button className="donjiDeoDugme"><a target="_blank" href="https://www.instagram.com/" rel="noreferrer"><FontAwesomeIcon icon={faInstagram}/></a></button>
                <button className="donjiDeoDugme"><a target="_blank" href="https://rs.linkedin.com/" rel="noreferrer"><FontAwesomeIcon icon={faLinkedin}/></a></button>
                <button className="donjiDeoDugme"><a target="_blank" href="https://x.com/" rel="noreferrer"><FontAwesomeIcon icon={faTwitter}/></a></button>
            </div>
        </div>
    )
}
export default DonjiDeo;