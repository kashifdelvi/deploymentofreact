import React, { useState, useEffect } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import { Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import LocationTypeAhead from './LocationTypeahead';
import {basePath,resturant} from "../api/index"
import {axiosInstanceWithoutToken} from "../api/axios"

function ImageContainer() {
    const navigate = useNavigate();
    const [filteredRestuarants, setFilteredRestarants] = useState([]);
    const [selectedResturant, setSelectedResturant] = useState([]);

    // load first time and also every time selectedResturant changes
    useEffect(() => {
        if (selectedResturant.length > 0) {
            const resturantCode = selectedResturant[0].code;
            navigate(`/resturant/${resturantCode}`)
        }
    }, [selectedResturant])

    return (
        <div className='imageContainer'>

            <Row className='justify-content-lg-center '>
                <Col lg="4">
                    <div className='mt-100'>
                        <LocationTypeAhead callResturants={callResturants}/>
                    </div>
                </Col>

                <Col lg="4">
                    <Typeahead
                        className='mt-100'
                        labelKey="name"
                        id="restuarants"
                        options={filteredRestuarants}
                        placeholder="Choose your restuarant..."
                        onChange={setSelectedResturant}
                        selected={selectedResturant}
                    >
                    </Typeahead>
                </Col>
            </Row>
        </div>
    )

    function callResturants(selectedLocation){
        const payloadToSend = {
            'params':{
                'location_code':[selectedLocation[0].code]
            }
        }
        const URL = `${resturant.getResturants}`;
        axiosInstanceWithoutToken.get(URL,payloadToSend).then((res) => {
            setFilteredRestarants(res?.data?.data.resturants);
        })
    }
}
export default ImageContainer;