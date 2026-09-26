import React, { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import {
    Container,
    Form,
    Button,
    FormGroup,
    Label,
    Col,
    Input,
    Row,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    NavLink,
    InputGroup,
    InputGroupText
} from 'reactstrap';
import firebase from 'firebase/compat/app';
import UserContext from '../context/UserContext';
import { toast } from 'react-toastify';
import {FcGoogle} from 'react-icons/fc';
import { LuGithub } from "react-icons/lu"; 
import UserCard from '../components/UserCard';
import Repo from '../components/repo';
import Axios from 'axios';


const Home = () => {
 
    const context = useContext(UserContext);
    const [query, setQuery] = useState('');
    const [user, setUser] = useState(null);
     
    const fetchDetails = async () => {
        try {
            const { data } = await Axios.get(`https://api.github.com/users/${query}`);
            setUser(data);
            toast.success('User fetched successfully!');
        } catch (error) {
            toast.error('Not able to locate user');
        }
    };
 
    const handleSubmit = (e) => {
        e.preventDefault();
    };
 
    return (
        <Container>
            <Row className="mt-3">
                <Col md='5'>
                 <InputGroup>
                 <Input
                  type='text'
                  id='username'
                  value={query}
                  onChange={e=> setQuery(e.target.value)}
                  placeholder='Please provide the username'
                  />
                  <InputGroupText addonType='append'>
                   <Button color='primary'
                           onClick={fetchDetails}>
                     Fetch User
                    </Button>
                  </InputGroupText>
                 </InputGroup>
                </Col>
            </Row>

            {user && (
                <Row className="mt-4 align-items-start">
                    <Col md='4'>
                        <div style={{ position: 'sticky', top: '20px' }}>
                            <UserCard user={user} />
                        </div>
                    </Col>
                    <Col md='8'>
                        <Repo repos_url={user.repos_url} />
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default Home;

