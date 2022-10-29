import React, { useEffect, useState } from 'react';
import { Carousel, Tab, Tabs, Container, Row, Col, Button } from 'react-bootstrap';
//import { GoogleMap, Marker } from "react-google-maps"
import { axiosInstanceWithoutToken } from "../api/axios"
import { useParams } from 'react-router-dom';
import LoginModal from "./LoginModal";

function RestuarantDetail() {
    let { code } = useParams();

    const [show, handleShow] = useState(false);
    const [resturant, setResturant] = useState(null);

    useEffect(() => {
        fetchResturantDetails();
    }, []);

    return (
        <Container>
            {show && <LoginModal 
                        handleClose={handleClose} 
                        handleAuthenticated={handleAuthenticated}
                        handleSetDecodeToken={handleSetDecodeToken}
            />}
            <Row>
                <Col lg={9}>
                    {resturant && 
                        <Carousel>

                        <Carousel.Item>
                            <img
                                src={'/' + resturant.images[0]}
                                height={600}
                                alt='idly'
                            />

                            <Carousel.Caption>
                                <h4>Restuarant Name</h4>
                                <p>Food Item Detail</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        </Carousel>
                    }
                </Col>
                <Col lg={3}>
                    <Button onClick={placeOrder}>Place Order</Button>
                </Col>
            </Row>
            <Row>
                <Col lg={12}>
                    <Tabs
                        defaultActiveKey='Overview'
                        id="tab"
                        className='mb-3'
                    >
                        <Tab title="Overview" eventKey="Overview">
                            <h3>{resturant?.overview}</h3>
                        </Tab>
                        <Tab title="Contact" eventKey="Contact">
                            <h3>{resturant?.address}</h3>
                        </Tab>
                    </Tabs>
                </Col>
            </Row>
        </Container>
    )

    function placeOrder(){
        //If am not eligible please ask me to login
        if(!sessionStorage.getItem('token'))
        {
            handleShow(true)
        }
    }

    function fetchResturantDetails() {
        const payload = {
            'params': {
                code
            }
        }
        axiosInstanceWithoutToken.get('/getResturantDetails', payload).then((res) => {
            setResturant(res.data.data)
        });
    }

    function handleAuthenticated(status){
        // setAuthenticated(status)
    }

    function handleSetDecodeToken(token){
        //setDecodedToken(token)
        //sessionStorage.setItem('user',token)
        sessionStorage.setItem('user',token.userDetails.userName)

    }

    function handleClose() {
        handleShow(false);
    }
}
export default RestuarantDetail;