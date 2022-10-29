import React, { useState, useEffect } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import {axiosInstanceWithoutToken} from '../api/axios';

function LocationTypeAhead(props) {
    const [selectedLocation, setSelectedLocation] = useState([]);
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        axiosInstanceWithoutToken.get(`http://localhost:9191/getLocations`).then((res) => {
            setLocations(res.data.data)
        });
    }, [])

    // load first time and also every time selectedLocation changes
    useEffect(() => {
        console.log("Location changed")
        /*if (selectedLocation.length > 0) {
            axios.get(`http://localhost:9191/getResturants?location_code=${selectedLocation[0].code}`).then((res) => {
                setFilteredRestarants(res?.data?.data)
            })
        }*/
        if(selectedLocation.length >0 ){
            props.callResturants(selectedLocation);
        }
    }, [selectedLocation])

    return (
            <Typeahead
                labelKey="name"
                id="locations"
                options={locations}
                placeholder="Choose your location..."
                selected={selectedLocation}
                onChange={setSelectedLocation}
            >
            </Typeahead>
    )
}
export default LocationTypeAhead;