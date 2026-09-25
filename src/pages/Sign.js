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


const Sign = () => {
    const context = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const HandleSign = () => {
        if (password !== confirmPassword) {
            toast('Passwords do not match', {
                type: 'error'
            });
            return;
        }

        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((res) => {
                console.log(res);
                context.setUser({
                    email: res.user.email,
                    uid: res.user.uid
                });
            })
            .catch((error) => {
                console.log(error);
                toast(error.message, {
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
                            <h3>Sign Up</h3>
                        </CardHeader>
                        <CardBody>
                            <Form onSubmit={handleSubmit}>

                                <FormGroup>
                                    <Label for="username">Username</Label>
                                    <Input
                                        type="username"
                                        id="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder="Enter your useername"
                                    />
                                </FormGroup>

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

                                <FormGroup>
                                    <Label for="confirmPassword">Confirm Password</Label>
                                    <Input
                                        type="password"
                                        id="confirmPassword"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Confirm your password"
                                    />
                                </FormGroup>
                                

                                <Button color="primary" type="submit" block>
                                    Sign Up
                                </Button>
                            </Form>
                        </CardBody>
                        <CardFooter className="text-center">
                            Already have an account? Log-In
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Sign;