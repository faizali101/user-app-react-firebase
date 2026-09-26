import {Container} from "reactstrap";
import {FaCopyright} from 'react-icons/fa';

const Footer = () => {
    return (
        <Container
          fluid 
          tag='footer'
          className='text-center bg-#111827 text-white fixed-bottom p-3'
        >
         User App with FireBase by Ali 
         {' '}
        <FaCopyright className='me-2 d-inline-block'/>
        </Container>
    );
};

export default Footer;