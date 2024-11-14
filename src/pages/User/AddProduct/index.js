// Vehicles.js
import React from 'react';
import ProductModal from "./model"
import { Container } from 'reactstrap';

const Vehicles = (props) => {
    return (
        <React.Fragment>
            <div className='page-content' style={{backgroundColor:"black"}}>
                <Container fluid>
                    <ProductModal props={props}/>
                </Container>
            </div>
        </React.Fragment>

    );
};

export default Vehicles;
