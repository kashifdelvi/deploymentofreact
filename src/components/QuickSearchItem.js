import React from 'react';
import Card from 'react-bootstrap/Card';
import {useNavigate} from 'react-router-dom';

function QuickSearchItem(props) {
    const navigate = useNavigate()

    return (
        <Card style={{ width: '18rem' }} onClick={()=>goToListPage(props.code)}>
            <Card.Img variant="top" src={props.image} className="test"/>
            <Card.Body>
                <Card.Title>{props.type}</Card.Title>
                <Card.Text>
                    {props.description}
                </Card.Text>
            </Card.Body>
        </Card>
    )

    function goToListPage(code){
        //if(sessionStorage.getItem('token')){
            navigate(`/resturant/list/${code}`)
        //} else {
            //alert("PLEASE LOGIN FIRST")
          //}
    }
}
export default QuickSearchItem;