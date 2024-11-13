// Vehicles.js
import React from 'react';
import ProductModal from "./model"
import { Container } from 'reactstrap';
import HeaderFile from '../../../components/Custom/header';

const Vehicles = (props) => {
    console.log("==========================>", props)
    return (
        <React.Fragment>
            <HeaderFile/>
            
            <div className='page-content' style={{backgroundColor:"black"}}>
                <Container fluid>
                    <ProductModal />
                </Container>
            </div>
        </React.Fragment>

    );
};

export default Vehicles;
