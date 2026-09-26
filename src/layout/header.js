import React, {useState, useContext} from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarText
} from 'reactstrap';
import {Link} from 'react-router-dom';
import UserContext from '../context/UserContext';
import firebase from 'firebase/compat/app';

const Header = () => {
     
    const [isOpen, setOpen] = useState(false);
    const toggle = () => setOpen(!isOpen);
    const context = useContext(UserContext) || { user: null };
    
    const handleLogout = () => {
        firebase.auth().signOut();
        context.setUser(null);
    };

    return (
        <Navbar color='#111827' dark expand='md'>
            <NavbarBrand>
                <Link to='/' className='text-white'>
                 UserApp 
                </Link>
            </NavbarBrand>
            <NavbarText className="text-white">{context.user?.email ? context.user.email : ''}</NavbarText>
            <NavbarToggler onClick={toggle}/>
            <Collapse isOpen={isOpen} navbar>
              <Nav className="ms-auto" navbar>
                <NavItem>
                    <NavLink tag={Link} to='/signup' className='text-white'>Sign-Up</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} to='/login' className='text-white'>Log-In</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink onClick={handleLogout} className='text-white' style={{cursor: 'pointer'}}>Log-Out</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
        </Navbar>
    );
};
 
export default Header;