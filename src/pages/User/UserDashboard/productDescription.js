import React, { useState, useEffect } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './productDescription.css';
import HeaderFile from '../../../components/Custom/header';
import { Card, CardBody, CardHeader } from 'reactstrap';
import { getSpecificAd } from '../../../Services/dashboardServices';

const ProductDescription = (props) => {

    const [heading, setHeading] = useState('');
    const [categoryData, setCategoryData] = useState({});

    useEffect(() => {
        switch (props.location.state.listing.category_type) {
            case "Vehicles":
                setHeading("Vehicle Details");
                break;
            case "Accommodation":
                setHeading("Accomodation Details");
                break;
            case "Services":
                setHeading("Services Details");
                break;
            case "Electronics":
                setHeading("Electronics Details");
                break;
            case "Furniture":
                setHeading("Furniture Details");
                break;
            default:
            //setHeading("");
        }
        getSpecificAd(props.location.state.listing.ad_id)
            .then((response) => {
                const data = response.data;
                setCategoryData(data)
            }).catch(() => { })
    }, []);


    return (
        <React.Fragment>
            <HeaderFile props={props} />
            <div className='page-content'>
                <div className='details-page'>
                    <div className='image-profile'>
                        <div className='carousel col-md-6 col-lg-6'>
                            <div>
                                <img src={props.location.state.listing.image} alt="product image" className=" mx-auto d-block product-img" />
                            </div>
                            <div>
                                <Card>
                                    <CardHeader>
                                        <h2>{props.location.state.listing.title}</h2>
                                    </CardHeader>
                                    <CardBody>
                                        <p className="price">{props.location.state.listing.price} <span className="negotiable">Negotiable</span></p>
                                        <p className="location">Oatley, NSW</p>
                                        <div className="description">
                                            <h3>Seller's Description</h3>
                                            <p>
                                                {props.location.state.listing.description}
                                            </p>
                                        </div>
                                    </CardBody>
                                </Card>
                            </div>
                        </div>
                        <div className=' col-md-6 col-lg-6'>
                            <Card>
                                <CardBody>
                                    <h2>Seller Information</h2>
                                    <h4 style={{ color: "#007db7" }}> Name: </h4>
                                    <h5> {props.location.state.userDetail.name} </h5><br />
                                    <h4 style={{ color: "#007db7" }}>Email: </h4>
                                    <h5>{props.location.state.userDetail.email}</h5><br />
                                    <h4 style={{ color: "#007db7" }}>Contact Information:</h4>
                                    <h5>{props.location.state.userDetail.phone_number}</h5>
                                </CardBody>
                            </Card>
                            <Card>
                                <CardBody>
                                    <div className="additional-info">
                                        <h3>{heading}</h3>
                                        {console.log("---heading---", heading)}
                                        {categoryData && categoryData.category_type === 'Vehicles' && (
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <td>Make</td>
                                                        <td>{categoryData && categoryData.category_details && categoryData.category_details.make}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Model</td>
                                                        <td>{categoryData && categoryData.category_details && categoryData.category_details.model}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Year</td>
                                                        <td>{categoryData && categoryData.category_details && categoryData.category_details.year}</td>
                                                    </tr>
                                                </tbody>
                                            </table>)}
                                        {categoryData && categoryData.category_type === 'Accommodation' && (
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <td>Bedrroms</td>
                                                        <td>{categoryData && categoryData.category_details && categoryData.category_details.make}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Bathrooms</td>
                                                        <td>{categoryData && categoryData.category_details && categoryData.category_details.model}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Available Date</td>
                                                        <td>{categoryData && categoryData.category_details && categoryData.category_details.available_date}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Parking facilities</td>
                                                        <td>{categoryData && categoryData.category_details && categoryData.category_details.parking === 1 ? "Yes" : "No"}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Smoking allowed</td>
                                                        <td>{categoryData && categoryData.category_details && categoryData.category_details.smoking === 1 ? "Yes" : "No"}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Furnished</td>
                                                        <td>{categoryData && categoryData.category_details && categoryData.category_details.furnished === 1 ? "Yes" : "No"}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Pet Friendly</td>
                                                        <td>{categoryData && categoryData.category_details && categoryData.category_details.pets === 1 ? "Yes" : "No"}</td>
                                                    </tr>
                                                </tbody>
                                            </table>)}

                                        {categoryData && categoryData.category_type === 'Services' && (
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <td>Provider</td>
                                                        <td>{categoryData && categoryData.category_details && categoryData.category_details.provider}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Model</td>
                                                        <td>{categoryData && categoryData.category_details && categoryData.category_details.opening_hours}</td>
                                                    </tr>
                                                </tbody>
                                            </table>)}

                                        {categoryData && categoryData.category_type === 'Electronics' && (
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <td>Brand</td>
                                                        <td>{categoryData && categoryData.category_details && categoryData.category_details.brand}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Model</td>
                                                        <td>{categoryData && categoryData.category_details && categoryData.category_details.model}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Type</td>
                                                        <td>{categoryData && categoryData.category_details && categoryData.category_details.type}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Condition</td>
                                                        <td>{categoryData && categoryData.category_details && categoryData.category_details.condition}</td>
                                                    </tr>
                                                </tbody>
                                            </table>)}
                                        {categoryData && categoryData.category_type === 'Furniture' && (
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <td>Material</td>
                                                        <td>{categoryData && categoryData.category_details && categoryData.category_details.material}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Type</td>
                                                        <td>{categoryData && categoryData.category_details && categoryData.category_details.type}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Condition</td>
                                                        <td>{categoryData && categoryData.category_details && categoryData.category_details.condition}</td>
                                                    </tr>
                                                </tbody>
                                            </table>)}
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
