import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

function ResturantListCard(props) {
    const navigate = useNavigate();

    return (
        <Card className='mb30' onClick={goToDetails}>
            <Card.Img variant="top" src={'/'+props.resturant?.images?.[0]} className="resturantImage"/>
            <Card.Body>
                <Card.Title>{props.resturant?.name}</Card.Title>
                <Card.Text>
                    {props.resturant?.overview}
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
    )

    function goToDetails(){
        console.log(props)
        const resturantCode = props.resturant.code;
        navigate(`/resturant/${resturantCode}`)
    }
}

export default ResturantListCard;