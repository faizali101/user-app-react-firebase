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
    NavLink
} from 'reactstrap';
import firebase from 'firebase/compat/app';
import UserContext from '../context/UserContext';
import { toast } from 'react-toastify';
import {FcGoogle} from 'react-icons/fc';
import { LuGithub } from "react-icons/lu"; 

const Log  = () => {   
    const context = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const HandleSign = () => {

        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((res) => {
                console.log(res);
                context.setUser({
                    email: res.user.email,
                    uid: res.user.uid
                });
            })
            .catch((error) => {
                console.log(error);
                toast.error(error.message, {
                    type: 'error'
                });
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        HandleSign();
    };

    if (context.user?.uid) {
        return <Navigate to="/" replace />;
    }

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card>
                        <CardHeader className="text-center">
                            <h3>Log In</h3>
                        </CardHeader>
                        <CardBody>
                            <Form onSubmit={handleSubmit}>                        
                            <FormGroup>
                                    <Label for="email">Email</Label>
                                    <Input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Label for="password">Password</Label>
                                    <Input
                                        type="password"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter your password"
                                    />
                                </FormGroup>
                                <Button color="primary" type="submit" >
                                    Log In
                                </Button>
                            </Form>
                        </CardBody>
                        <CardFooter className="text-center">
                         <FcGoogle/>   Log-In with G-Mail
                        </CardFooter>
                        <CardFooter className="text-center">
                         <LuGithub/>   Log-In with GitHub
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Log ;