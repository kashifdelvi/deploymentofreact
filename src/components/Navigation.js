import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import LoginModal from "./LoginModal";

function Navigation() {
    const [authenticated,setAuthenticated] = useState(false);
    const [show, handleShow] = useState(false);
    // const [decodedToken,setDecodedToken] = useState(null);
    return (
        <Navbar className='navigationContainer'>

            {show && <LoginModal 
                        handleClose={handleClose} 
                        handleAuthenticated={handleAuthenticated}
                        handleSetDecodeToken={handleSetDecodeToken}
            />}
            <Container>
                {!authenticated && <Button onClick={handleLogin}>Login</Button>}
                {authenticated && <p><h3>Welcome {JSON.stringify(sessionStorage.getItem('user'))}</h3><Button className="pullRight" onClick={handleLogout}>Logout</Button></p>}
            </Container>
        </Navbar>
    )

    function handleClose() {
        handleShow(false);
    }

    function handleLogin() {
        handleShow(true);
    }

    function handleAuthenticated(status){
        setAuthenticated(status)
    }

    function handleSetDecodeToken(token){
        // setDecodedToken(token)
        console.log(token.userDetails.userName)
        sessionStorage.setItem('user',token.userDetails.userName)
    }

    function handleLogout(){
        sessionStorage.clear();
        reset()
    }

    function reset(){
        setAuthenticated(false);
        handleShow(false);
        //setDecodedToken(null);
    }
}

export default Navigation;