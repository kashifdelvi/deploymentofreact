import React, { useState , useEffect} from 'react';
import {Card,Container,Row,Col,Alert,Pagination} from 'react-bootstrap';
import {useParams} from 'react-router-dom';
import ResturantListCard from "./ResturantListCard";
import {axiosInstanceWithToken} from "../api/axios"
import LocationTypeAhead from './LocationTypeahead';
import Form from 'react-bootstrap/Form';


function RestuarantList(){
    let   {timingFilter} = useParams();
    const [filteredResturants,setFilteredResturants] = useState([]);
    const timings = {
        'BRF':'Breakfast',
        'LCH':'Lunch',
        'DNR':'Dinner',
        'NGT':'Night',
        'SKS':'Snacks',
        'DRK':'Drink',
    };
    const [selectedCuisines,setSelectedCuisines] = useState([]);
    const [cuisines] = useState([
        {
            'name':'South Indian',
            'code':'SI'
        },
        {
            'name':'North Indian',
            'code':'NI'
        },
        {
            'name':'Chinese',
            'code':'CHN'
        }
    ]);

    const [payload,setPayload] = useState({'timing_codes':[timingFilter]});

    const limit = 2;
    const [totalPages,setTotalPages] = useState([]);
    const [activePage,setActivePage] = useState(1);

    useEffect(() => {
        getResturants();
    },[payload,activePage])

    
    useEffect(() => {
        setPayload({...payload,'selectedCuisine':selectedCuisines})  
    },[selectedCuisines])


    return(
         <Container>
            <Row>
                <h3 className='mb30'>Resturant list who serves {timings[timingFilter]}</h3>
            </Row>
            <Row>
                <Col lg={3}>
                    <Card className='p30'>
                        <h5>Locations</h5>
                        <LocationTypeAhead callResturants={getLocationPayload}/>                        
                    </Card>
                    <Card className='p30'>
                        
                        <div className='mb30'>
                            <h5 >Cuisines</h5>
                            <Form>
                                {
                                    cuisines.map((item,index)=>
                                        <Form.Check 
                                            key={index}
                                            type='checkbox'
                                            id={index+1}
                                            label={item.name}
                                            value={item.code}
                                            onClick={handleCuisineCheck}
                                        />
                                    )
                                }
                            </Form>
                        </div>
                    </Card>
                    

                </Col>

                <Col lg={9}>
                    {
                        filteredResturants.length === 0 && <Alert key='error' variant='danger'>Sorry no records found</Alert>
                    }
                    {filteredResturants.length>0 && filteredResturants.map((filteredResturant,index) =>
                            <ResturantListCard key={index} resturant={filteredResturant}/>
                    )}
                    <Pagination>
                        {
                            totalPages.map((item,index)=>
                            <Pagination.Item 
                                key={index} 
                                active={activePage=== item+1} 
                                onClick={()=>updateActivePage(item+1)}>
                                {item+1}
                            </Pagination.Item>
                        )}
                    </Pagination>
                </Col>
            </Row>
         </Container>
    )

    function getResturants(){
        const defaultPayload = {
            'limit':limit,
            'page':activePage
        }
        const payloadToSend = {
            'params':{...defaultPayload,...payload}
        }
        axiosInstanceWithToken.get(`/getResturants`,payloadToSend).then((res) => {
            setFilteredResturants(res?.data?.data?.resturants)
            const totalPagesArray = [];
            const totalPages = res?.data?.data?.total/limit;
            for(var i=0;i<totalPages;i++){
                totalPagesArray.push(i)
            }
            setTotalPages(totalPagesArray);
        })
    }

    function updateActivePage(activePage){
        setActivePage(activePage)
    }

    function getLocationPayload(locationPayload){
        setPayload({...payload,'location_code':[locationPayload?.[0].code]})
    }

    function handleCuisineCheck(event){
        if(event.target.checked){
            // push to array
            setSelectedCuisines([...selectedCuisines,event.target.value])
        } else{
            // remove from array
            const cloneSelectedCuisines = [...selectedCuisines];
            const selectedIndex = cloneSelectedCuisines.findIndex((item)=>{
                return item === event.target.value
            })
            cloneSelectedCuisines.splice(selectedIndex,1);
            setSelectedCuisines(cloneSelectedCuisines)
        }
    }
}

export default RestuarantList;