import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader, Label, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import './profile.css';
import * as Yup from "yup";

import { Formik, Form } from "formik";
import uonlogo from "../../../assets/images/uon-logo-square.png";
import HeaderFile from '../../../components/Custom/header';
import CustomButton from '../../../components/Custom/Button';
import CustomInput from "../../../components/Custom/Auth/textinput"
import { placeholderConst as PLACEHOLDER_CONST } from '../../../components/Constants/placeholder';

const UserProfile = () => {
    const [activeTab, setActiveTab] = useState('active');
    const [listings, setListings] = useState([]);
    const [editModal, setEditModal] = useState(false);
    const [initialValues, setInitialValues] = useState({
        name: "",
        email: "",
        address: "",
        contact: "",
        password: "",
    });

    const toggleEditModal = () => setEditModal(!editModal);



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

    const editProfileSchema = Yup.object().shape({
        apiKey: Yup.string()
          .required("API key is required")
          .max(128, "API key must be at most 128 characters")
          .min(16, "API key must be at least 20 characters"),
        totalRequest: Yup.string()
          .required("Total request value is required"),
        serviceProvider: Yup.string().required("Service provider name is required"),
      });



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
                                <Button className="editbtn" type="submit"
                                    name="btn" onClick={toggleEditModal}
                                    data-toggle="modal">
                                    Edit
                                </Button>

                                <Modal
                                    isOpen={editModal}
                                    toggle={toggleEditModal}
                                    scrollable={true}
                                    centered={true}
                                >
                                    <ModalHeader toggle={() => setEditModal(false)}>
                                        Edit Profile
                                    </ModalHeader>
                                    <ModalBody>
                                        <div>
                                            <Formik
                                                initialValues={initialValues}
                                                validationSchema={editProfileSchema}
                                            >
                                                {({ errors, touched, values, handleChange }) => (
                                                    <Form>
                                                        <Label className="Top-label">Full Name</Label>
                                                        <CustomInput
                                                            type="text"
                                                            values={values}
                                                            placeholder={PLACEHOLDER_CONST.ENTER_FULLNAME}
                                                            name="name"
                                                            touched={touched}
                                                            errors={errors}
                                                            iconname={"ri-user-line"}
                                                        ></CustomInput>
                                                        <Label className="Top-label">Email Address</Label>
                                                        <CustomInput
                                                            type="text"
                                                            values={values}
                                                            placeholder={PLACEHOLDER_CONST.ENTER_EMAIL}
                                                            name="email"
                                                            touched={touched}
                                                            errors={errors}
                                                            iconname="ri-mail-line"
                                                        ></CustomInput>
                                                        <Label className="Top-label">Address</Label>

                                                        <CustomInput
                                                            type="text"
                                                            values={values}
                                                            placeholder={PLACEHOLDER_CONST.ENTER_ADDRESS}
                                                            name="address"
                                                            touched={touched}
                                                            errors={errors}
                                                            iconname="ri-home-2-line"
                                                        ></CustomInput>
                                                        <Label className="Top-label">Contact Number</Label>
                                                        <CustomInput
                                                            type="number"
                                                            values={values}
                                                            placeholder={PLACEHOLDER_CONST.ENTER_PHONENUMBER}
                                                            name="contact"

                                                            touched={touched}
                                                            errors={errors}
                                                            iconname="ri-phone-line"
                                                        ></CustomInput>

                                                        <Label className="Top-label">Password</Label>
                                                        <CustomInput
                                                            type="Password"
                                                            values={values}
                                                            placeholder={PLACEHOLDER_CONST.ENTER_PASSWORD}
                                                            name="password"

                                                            touched={touched}
                                                            errors={errors}
                                                            iconname="ri-lock-2-line"
                                                            isPassword
                                                        ></CustomInput>



                                                    </Form>
                                                )}
                                            </Formik>
                                        </div>

                                    </ModalBody>
                                    <ModalFooter>
                                        <Button
                                            type="button"
                                            color="light"
                                            onClick={() => setEditModal(false)}
                                        >
                                            Close
                                        </Button>
                                        <Button
                                            type="submit"
                                            name="btn"
                                            className="custom-btn"

                                        >
                                            Edit
                                        </Button>
                                    </ModalFooter>
                                </Modal>

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
