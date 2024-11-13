import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader, Label, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Button, CardFooter } from 'reactstrap';
import './profile.css';
import * as Yup from "yup";

import { Formik, Form } from "formik";
import uonlogo from "../../../assets/images/uon-logo-square.png";
import HeaderFile from '../../../components/Custom/header';
import CustomButton from '../../../components/Custom/Button';
import CustomInput from "../../../components/Custom/Auth/textinput"
import { placeholderConst as PLACEHOLDER_CONST } from '../../../components/Constants/placeholder';
import { getProfileData, updateProfile } from '../../../Services/dashboardServices';
import {
    NotificationManager,
    NotificationContainer,
} from "react-notifications";

const UserProfile = () => {
 
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

        getProfileData().then((response) => {
            console.log("-----> get all ads data", response.data)
            const data = response.data;
            setInitialValues({
                name: data.name,
                email: data.email,
                address: data.address,
                contact: data.phone_number,
            })

        })
            .catch((err) => { });
    }, []);



    const handleSubmit = (values, { setFieldError, resetForm }) => {
        console.log("profile handle submit===", values)
        const data ={
                name: values.name, 
                address: values.address, 
                phone_number: values.contact, 
                email: values.email, 
                is_student: true ,
                password:values.password
        }

        updateProfile(data).then((response) => {
            console.log("-->rsponse", response.data)

            NotificationManager.success("Profile updated Successfully");
            getProfileData().then((response) => {
                console.log("-----> get all ads data", response.data)
                const data = response.data;
                setInitialValues({
                    name: data.name,
                    email: data.email,
                    address: data.address,
                    contact: data.phone_number,
                })

            })
                .catch((err) => { });
            setEditModal(false)
        })
            .catch((error) => {
                const errData =
                    error && error.data && error.data.message;
                if (errData === "Invalid email or password") {
                    NotificationManager.error("Invalid email or password", "", 404);
                } else if (errData === "Server error") {
                    NotificationManager.error("Server Error", "", 500);
                }
            });
    }

    return (
        <React.Fragment>
            <HeaderFile />
            <div className='page-content'>
                <Row>
                    <Col xs="4" >
                        <Card className='profilecard'>

                            <CardBody className='cardbody'>
                                <h2 className='name'>{initialValues.name}</h2>
                                <div>
                                    <label className='Top-label'>Email Address : </label><label className='desc-label'> {initialValues.email}</label><br />
                                    <label className='Top-label'>Contact No. : </label> <label className='desc-label'> {initialValues.contact}</label><br />
                                    <label className='Top-label'>Address : </label><label className='desc-label'> {initialValues.address}</label>
                                </div>
                            </CardBody>
                            <CardFooter>
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
                                                initialValues={{
                                                    name: initialValues.name,
                                                    email: initialValues.email,
                                                    address: initialValues.address,
                                                    contact: initialValues.phone_number,
                                                    password: initialValues.password,

                                                }}
                                                //validationSchema={editProfileSchema}
                                                enableReinitialize
                                                onSubmit={handleSubmit}
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
                                                            handleChange={handleChange}
                                                            defaultValue={initialValues.name}
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
                                                            handleChange={handleChange}
                                                            defaultValue={initialValues.email}
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
                                                            handleChange={handleChange}
                                                            defaultValue={initialValues.address}
                                                            iconname="ri-home-2-line"
                                                        ></CustomInput>
                                                        <Label className="Top-label">Contact Number</Label>
                                                        <CustomInput
                                                            type="number"
                                                            values={values}
                                                            placeholder={PLACEHOLDER_CONST.ENTER_PHONENUMBER}
                                                            name="contact"
                                                            handleChange={handleChange}
                                                            touched={touched}
                                                            errors={errors}
                                                            defaultValue={initialValues.contact}
                                                            iconname="ri-phone-line"
                                                        ></CustomInput>

                                                        <Label className="Top-label">Password</Label>
                                                        <CustomInput
                                                            type="Password"
                                                            values={values}
                                                            placeholder={PLACEHOLDER_CONST.ENTER_PASSWORD}
                                                            name="password"
                                                            handleChange={handleChange}
                                                            touched={touched}
                                                            errors={errors}
                                                            iconname="ri-lock-2-line"
                                                            isPassword
                                                        ></CustomInput>

                                                        <div className="text-center">
                                                            <Button
                                                                type="submit"
                                                                name="btn"
                                                                className="custom-btn"
                                                                onSubmit={(values) => handleSubmit(values)}
                                                            >
                                                                Edit
                                                            </Button>
                                                        </div>

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

                                    </ModalFooter>
                                </Modal>
                            </CardFooter>
                        </Card>
                    </Col>
                    <Col xs="8" className='col2'>
                        <Card className='list-card'>
                            <CardBody>

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
            <NotificationContainer />
        </React.Fragment>
    );
};

export default UserProfile;
