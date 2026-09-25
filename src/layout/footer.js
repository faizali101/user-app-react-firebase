import {Container} from "reactstrap";
import {FaCopyright} from 'react-icons/fa';

const Footer = () => {
    return (
        <Container
          fluid 
          tag='footer'
          className='text-center bg-primary text-white fixed-bottom p-3'
        >
        <FaCopyright className='mr-2 d-inline-block'/>
        LCO User App with FireBase by Ali 
        </Container>
    );
}

export default Footer;