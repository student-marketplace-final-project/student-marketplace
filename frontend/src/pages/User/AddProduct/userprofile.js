import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader, Label, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Button, CardFooter } from 'reactstrap';
import './profile.css';
import { Formik, Form } from "formik";
import HeaderFile from '../../../components/Custom/header';
import SweetAlert from "react-bootstrap-sweetalert";
import CustomInput from "../../../components/Custom/Auth/textinput"
import { placeholderConst as PLACEHOLDER_CONST } from '../../../components/Constants/placeholder';
import { archiveUserAds, getProfileData, getUserAdsDetails, updateProfile } from '../../../Services/dashboardServices';
import {
    NotificationManager,
    NotificationContainer,
} from "react-notifications";
import Spinner from "../../../components/Custom/customLoader"

/**
 *
 *
 * @param {*} props
 * @return {*} 
 */
const UserProfile = (props) => {

    const [listings, setListings] = useState([]);
    const [adId, setAdId] = useState('');
    const [deleteModal, setDeleteModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [initialValues, setInitialValues] = useState({
        name: "",
        email: "",
        address: "",
        contact: "",
        password: "",
    });
    const startLoading = () => {
        setIsLoading(true)
    }
    const stopLoading = () => {
        setIsLoading(false)
    }
    const toggleEditModal = () => setEditModal(!editModal);
    const toggleDeleteModal = (data) => {

        setAdId(data)
        setDeleteModal(!deleteModal);
    }

    useEffect(() => {
        startLoading()
        //get profile data api
        getProfileData().then((response) => {
            const data = response.data;
            //set the values in state
            setInitialValues({
                name: data.name,
                email: data.email,
                address: data.address,
                contact: data.phone_number,
            })
            stopLoading()
        })
            .catch((err) => { stopLoading() });
        //get all user ads details api calling
      
        getUserAdsDetails().then((response) => {
            const data = response.data;
            setListings(data)
            stopLoading()
        })
            .catch((err) => { stopLoading() });
    }, []);



    const handleSubmit = (values) => {
        const data = {
            name: values.name,
            address: values.address,
            phone_number: values.contact,
            email: values.email,
            is_student: true,
            password: values.password
        }

        updateProfile(data).then((response) => {
            NotificationManager.success("Profile updated Successfully");
            getProfileData().then((response) => {
                
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

    const deleteUserAds = () => {
//archive user ads
        archiveUserAds(adId).then((response) => {
            NotificationManager.success("Ad archived successfully", "", 500);
            startLoading()
            getUserAdsDetails().then((response) => {
                const data = response.data;
                setListings(data)
            })
            stopLoading()
                .catch((err) => { stopLoading() });
        })
            .catch((err) => { stopLoading() });
        setDeleteModal(false)
    }

    return (
        <React.Fragment>
            <HeaderFile props={props} />
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
                            {isLoading && <Spinner />}
                            <CardBody>
                                <div className="listings">
                                    {listings&&listings.map(listing => (
                                        <div key={listing.id} className="listing-card">
                                            <img src={listing.image} alt={listing.title} />
                                            <div className="listing-info">
                                                <p className="price"> ${listing.price}</p>
                                                <p className="title">{listing.title}</p>
                                                <p className="location">{listing.location}</p>
                                            </div>
                                            <button className="favorite-button" onClick={() => toggleDeleteModal(listing.ad_id)}>Delete</button>
                                        </div>
                                    ))}
                                </div>
                            </CardBody>
                        </Card>
                        <SweetAlert
                            btnSize="lg"
                            show={deleteModal}
                            showCancel
                            title={
                                <span style={{ fontSize: 20 }} className="text-center">
                                    Delete Ads
                                </span>
                            }
                            onConfirm={deleteUserAds}
                            onCancel={() => {
                                setDeleteModal(false);
                            }}
                        >
                            Are you sure you want to delete this Advertisement?
                        </SweetAlert>
                    </Col>
                </Row>
            </div>
            <NotificationContainer />
        </React.Fragment>
    );
};

export default UserProfile;
