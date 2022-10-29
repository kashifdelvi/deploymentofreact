import {axiosInstanceWithoutToken} from "../api/axios"
import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import {authentication} from "../api/index"
import jwt_decode from "jwt-decode";


function LoginModal(props) {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    return (
        <Modal show={true} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Label>Username/email</Form.Label>
                <Form.Control 
                    value={userName}
                    type="email" 
                    placeholder="Enter email" 
                    onChange={handleEmailChange}/>
                <Form.Label>Password</Form.Label>
                <Form.Control 
                    value={password}
                    type="password" 
                    placeholder="Password" 
                    onChange={handlePasswordChange}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={callAuthenticate}>
                    Submit
                </Button>
                <Button variant="secondary" onClick={props.handleClose}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    )


    function callAuthenticate(){
        const payload = {
            'username':userName,
            'password':password
        };
        const URL =`${authentication.login}`;
        axiosInstanceWithoutToken.post(URL,payload).then((res)=>{
            if(res.status === 200){
                const encodedToken = res.data.data.token;
                sessionStorage.setItem('token',encodedToken);
                props.handleClose();
                props.handleAuthenticated(true);
                const decoded = jwt_decode(encodedToken);
                console.log(decoded)
                props.handleSetDecodeToken(decoded)
            }
        })
    }

    function handleEmailChange(event){
        console.log(event.target.value);
        setUserName(event.target.value);
    }

    function handlePasswordChange(event){
        console.log(event.target.value);
        setPassword(event.target.value)
    }
}

export default LoginModal;