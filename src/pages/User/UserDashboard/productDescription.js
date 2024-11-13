// CarDetailsPage.js
import React, { useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './productDescription.css';
import uonlogo from "../../../assets/images/uon-logo-square.png";
import HeaderFile from '../../../components/Custom/header';
import { Card, CardBody, CardHeader } from 'reactstrap';


const ProductDescription = (props) => {
    const images = [
        uonlogo, uonlogo, uonlogo, uonlogo
        // Add all image URLs here
    ];
    useEffect=(()=>{
const id = props.location.pathname;
 
    },[]);
    console.log("---> product page",props.location.pathname)

    return (
        <React.Fragment>
            <HeaderFile />
            <div className='page-content'>
                <div className='details-page'>
                    <div className='image-profile'>
                        <div className='carousel col-md-6 col-lg-6'>
                            <Carousel showThumbs={true} >
                                {images.map((image, index) => (
                                    <div key={index}>
                                        <img src={image} alt={`Car image ${index + 1}`} />
                                    </div>
                                ))}
                            </Carousel>
                            <div>
                                <Card>
                                    <CardHeader>
                                        <h2>2003 Holden Commodore SS 4 SP Automatic 4D Sedan</h2>
                                    </CardHeader>
                                    <CardBody>
                                        <p className="price">$20,000 <span className="negotiable">Negotiable</span></p>
                                        <p className="location">Oatley, NSW</p>
                                        <div className="description">
                                            <h3>Seller's Description</h3>
                                            <p>
                                                Very regretful sale. Open to offers but in no rush to sell, so please no silly offers.
                                                Any questions please reach out! For sale is my unmolested 2003 Holden Commodore VY SS Series 1...
                                                {/* Add more description text here */}
                                            </p>
                                        </div>
                                    </CardBody>
                                </Card>
                            </div>
                        </div>
                        <div className=' col-md-6 col-lg-6'>
                            <Card>
                                <CardBody>
                                    <h3>Seller Information</h3>
                                    
                                    <h4>Dhara Bhadani</h4>
                                    <h3>Contact Information: <span>0987654322</span></h3>
                                </CardBody>
                            </Card>
                            <Card>
                                <CardBody>
                                    <div className="additional-info">
                                        <h3>Car Details</h3>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td>Date Listed</td>
                                                    <td>21/10/2024</td>
                                                </tr>
                                                <tr>
                                                    <td>Seller Type</td>
                                                    <td>Private Seller</td>
                                                </tr>
                                                <tr>
                                                    <td>Model</td>
                                                    <td>Commodore</td>
                                                </tr>
                                                <tr>
                                                    <td>Year</td>
                                                    <td>2003</td>
                                                </tr>

                                            </tbody>
                                        </table>
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                </div>

            </div>


        </React.Fragment>
    );
};

export default ProductDescription;
