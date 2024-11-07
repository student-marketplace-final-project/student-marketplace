import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader, Label, Row, Col } from 'reactstrap';
import './profile.css';
import uonlogo from "../../../assets/images/uon-logo-square.png";
import HeaderFile from '../../../components/Custom/header';

const UserProfile = () => {
    const [activeTab, setActiveTab] = useState('active');
    const [listings, setListings] = useState([]);

    // Example data, replace with API data 
    useEffect(() => {
        setListings([
            { id: 1, title: '2003 HOLDEN COMMODORE SS', location: 'Oatley, NSW', price: '$20,000', image: uonlogo },
            { id: 2, title: 'Jadore Paige Dress', location: 'Rockdale, NSW', price: '$150', image: uonlogo },
            { id: 3, title: 'Bianca and Bridgett Dress', location: 'Rockdale, NSW', price: '$30', image: uonlogo },
            { id: 4, title: 'ZU SHOES', location: 'Rockdale, NSW', price: '$5', image: uonlogo },
            { id: 5, title: 'ZU SHOES', location: 'Rockdale, NSW', price: '$5', image: uonlogo },
            { id: 6, title: 'ZU SHOES', location: 'Rockdale, NSW', price: '$5', image: uonlogo },
        ]);
    }, []);

    return (
        <React.Fragment>
            <HeaderFile />
            <div className='page-content'>
                <Row>
                    <Col xs="4" >
                        <Card className='profilecard'>
                            <CardHeader className='profileheader'>
                                <img
                                    className="avatar"
                                    alt="Sample"
                                    src="https://picsum.photos/300/200" />
                            </CardHeader>
                            <CardBody className='cardbody'>
                                <h2 className='name'>Dhara Bhadani</h2>
                                <div>
                                    <label className='Top-label'>Email Address : </label><label className='desc-label'> dharabhadani@gmail.com</label><br />
                                    <label className='Top-label'>Contact No. : </label> <label className='desc-label'> 0987654321</label><br />
                                    <label className='Top-label'>Address : </label><label className='desc-label'> Sydney, Australia </label>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xs="8" className='col2'>
                        <Card className='list-card'>
                            <CardBody>
                                <div className="tabs">
                                    <button onClick={() => setActiveTab('active')} className={activeTab === 'active' ? 'active' : ''}>Active listings</button>
                                    <button onClick={() => setActiveTab('sold')} className={activeTab === 'sold' ? 'active' : ''}>Recently sold</button>
                                </div>
                                <div className="listings">
                                    {listings.map(listing => (
                                        <div key={listing.id} className="listing-card">
                                            <img src={listing.image} alt={listing.title} />
                                            <div className="listing-info">
                                                <p className="price">{listing.price}</p>
                                                <p className="title">{listing.title}</p>
                                                <p className="location">{listing.location}</p>
                                            </div>
                                            <button className="favorite-button">♡</button>
                                        </div>
                                    ))}
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </React.Fragment>
    );
};

export default UserProfile;
