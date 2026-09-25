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
import UserContext from '../context/UserContext'

const Header = () => {
     
    // const context = useContext(UserContext);
    const [isOpen, SetOpen] = useState(false);
    const toggle = () => SetOpen(!isOpen);
    const context = useContext(UserContext) || { user: null };
    

     
    return (
        <Navbar color='primary' light expand='md'>
            <NavbarBrand>
                <Link to='/' className='text-white'>
                 LCO UserApp 
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
                    <NavLink tag={Link} to='/' className='text-white'>Log-Out</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
        </Navbar>
    )
}
 
export default Header;