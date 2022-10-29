import {Row,Col,Container} from 'react-bootstrap';
import ImageContainer from "./ImageContainer"
import QuickSearrchList from "./QuickSearrchList"

function QuickSearchContainer(props) {
    return (
        <Container>
            <Row>
                <Col lg={12}>
                    <ImageContainer/>
                </Col>
            </Row>
            <Row>
                <Col lg={12}>
                    <h4>Quick Search</h4>
                    <h6>Discover restuarants by type or meal</h6>
                </Col>
            </Row>
            <Row>
                <Col lg={12}>
                    <QuickSearrchList/>
                </Col>
            </Row>
            
        </Container>

    );
}


export default QuickSearchContainer;
