import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function FoodCard(props) {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
                <Card.Title>{props.name}</Card.Title>
                <Card.Text>
                    {props.cuisine}
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
    );
}
export default FoodCard;
