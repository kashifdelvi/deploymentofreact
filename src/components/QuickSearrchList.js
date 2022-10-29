import React, { useState,useEffect } from 'react';
import {Row,Col,Container, Button} from 'react-bootstrap';
import QuickSearchItem from './QuickSearchItem';
import {axiosInstanceWithoutToken} from "../api/axios"


function QuickSearrchList(){   
    const [quickSearchList,setQuickSearchList] = useState([])
    useEffect(() => {
        axiosInstanceWithoutToken.get(`getQuickResurantFilters`).then((res) => {
            setQuickSearchList(res.data.data)
        }).catch((error)=>{
            console.log(error)
        }); 
    },[])

    return(
         <Container>
            <Row>
                {quickSearchList.map((item,index) =>
                        <Col lg={4} key={index}>
                               <QuickSearchItem
                                    code={item.code}
                                    image={item.image}
                                    type={item.timing}
                                    description={item.description}
                               />
                        </Col>
                )}

            </Row>
         </Container>
    )

}
export default QuickSearrchList;