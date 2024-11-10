import React, { useState, useCallback } from 'react';
import { Formik, Form } from 'formik';
import { Card, CardBody, Col, Row } from "reactstrap";
import * as Yup from 'yup';
import "./product.css"
import HeaderFile from '../../../components/Custom/header';
import CustomInput from '../../../components/Custom/User/Textinput';
import Button from '../../../components/Custom/Button';
import { errorsConst as ERROR_CONST } from "../../../components/Constants/errors";
import Dropzone from "react-dropzone";
import { Link } from "react-router-dom";


const Accommodation = () => {

    // State to hold the selected option
    const [selectedParking, setSelectedParking] = useState("parking_yes");
    const [selectedSmoking, setSelectedSmoking] = useState("smoking_yes");
    const [selectedFurnished, setSelectedFurnished] = useState("furnished_yes");
    const [selectedPets, setSelectedPets] = useState("pets_yes");
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [initialValues, setInitialValues] = useState({
        title: '', type: '', price: '', availableDate: '', no_of_bedrooms: '',
        no_of_bathrooms: '', parking: '', smoking: '',
        furnished: '', pets: '',
        description: ''
    });

    const formatBytes = (bytes, decimals = 2) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
    };

    const handleAcceptedFiles = useCallback(files => {
        const mappedFiles = files.map(file =>
            Object.assign(file, {
                preview: URL.createObjectURL(file),
                formattedSize: formatBytes(file.size),
            })
        );
        setSelectedFiles(mappedFiles);
    }, []);

    // Yup validation schema
    const validationSchema = Yup.object({
        title: Yup.string().required(ERROR_CONST.TITLE),
        type: Yup.string().required(ERROR_CONST.TYPE),
        price: Yup.string().required(ERROR_CONST.PRICE),
        availableDate: Yup.string().required(ERROR_CONST.AVAILABLE_DATE),
        no_of_bedrooms: Yup.string().required(ERROR_CONST.NO_OF_BEDROOMS),
        no_of_bathrooms: Yup.string().required(ERROR_CONST.NO_OF_BATHROOMS),
        parking: Yup.string().required(ERROR_CONST.PARKING),
        smoking: Yup.string().required(ERROR_CONST.SMOKING),
        furnished: Yup.string().required(ERROR_CONST.FURNISHED),
        pets: Yup.string().required(ERROR_CONST.PETS),
        description: Yup.string().required(ERROR_CONST.DESCRIPTION),

    });



    // Function to handle the change in radio button selection
    const handleParkingChange = (event) => {
        setSelectedParking(event.target.value);
    };
    const handleSmokingChange = (event) => {
        setSelectedSmoking(event.target.value);
    };
    const handleFurnishedChange = (event) => {
        setSelectedFurnished(event.target.value);
    };
    const handlePetsChange = (event) => {
        setSelectedPets(event.target.value);
    };
    // Handle form submission
    const handleSubmit = (values) => {
        console.log("Form Data Submitted:", values);
        // Navigate to home page after submission
    };


    return (
        <React.Fragment>
            <HeaderFile />
            <div className=" page-content container-fluid">
                <div className="row vh-100 align-items-center justify-content-center">
                    <div className="col-md-12 col-lg-4 bg-white rounded">
                        <div className="innerContent">
                            <h2>Accommodation Details</h2>
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                            >
                                {({ values, errors, touched, handleChange }) => (
                                    <Form>
                                        <div>
                                            <label className="Top-label">Title*</label>
                                            <CustomInput
                                                type='text'
                                                name='title'
                                                values={values}
                                                errors={errors}
                                                touched={touched}
                                                handleChange={handleChange}
                                                placeholder={'Enter title'}
                                            />

                                        </div>
                                        <label className="Top-label">Type*</label>
                                        <CustomInput
                                            type='text'
                                            name='type'
                                            values={values}
                                            errors={errors}
                                            touched={touched}
                                            handleChange={handleChange}
                                            placeholder={'Enter type'}
                                        />
                                        <label className="Top-label">Price*</label>
                                        <CustomInput
                                            type='text'
                                            name='price'
                                            values={values}
                                            errors={errors}
                                            touched={touched}
                                            handleChange={handleChange}
                                            placeholder={'Enter Price'}
                                        />

                                        <label className="Top-label">Available Date*</label>
                                        <CustomInput
                                            type='text'
                                            name='availableDate'
                                            values={values}
                                            errors={errors}
                                            touched={touched}
                                            handleChange={handleChange}
                                            placeholder={'Enter Available Date'}
                                        />
                                        <label className="Top-label">Number of Bedrooms*</label>
                                        <CustomInput
                                            type='text'
                                            name='no_of_bedrooms'
                                            values={values}
                                            errors={errors}
                                            touched={touched}
                                            handleChange={handleChange}
                                            placeholder={'Enter Number of Bedrooms'}
                                        />
                                        <label className="Top-label">Number of Bathrooms*</label>
                                        <CustomInput
                                            type='text'
                                            name='no_of_bathrooms'
                                            values={values}
                                            errors={errors}
                                            touched={touched}
                                            handleChange={handleChange}
                                            placeholder={'Enter Number of Bathrooms'}
                                        />
                                        <label className="Top-label">Does your accommodation has parking facility?*</label>

                                        <div className='radiodiv'>
                                            <div className='container'>
                                                <label className='label'>  Yes </label>
                                                <input
                                                    type="radio"
                                                    value="parking_yes"
                                                    checked={selectedParking === "parking_yes"}
                                                    onChange={handleParkingChange}
                                                    className='radioButton'
                                                    id="parking_yes"
                                                />
                                            </div>
                                            <div className='container'>
                                                <label className='label'>No
                                                </label>
                                                <input
                                                    className='radioButton'
                                                    type="radio"
                                                    value="parking_no"
                                                    id="parking_no"
                                                    checked={selectedParking === "parking_no"}
                                                    onChange={handleParkingChange}
                                                />
                                            </div>
                                        </div>


                                        <label className="Top-label">Does your accomodation allow smoking?*</label>
                                        <div className='radiodiv'>
                                            <div className='container'>
                                                <label className='label'>  Yes </label>
                                                <input
                                                    type="radio"
                                                    value="smoking_yes"
                                                    id="smoking_yes"

                                                    checked={selectedSmoking === "smoking_yes"}
                                                    onChange={handleSmokingChange}
                                                    className='radioButton'
                                                />
                                            </div>
                                            <div className='container'>
                                                <label className='label'>No
                                                </label>
                                                <input
                                                    className='radioButton'
                                                    type="radio"
                                                    value="smoking_no"
                                                    id="smoking_no"

                                                    checked={selectedSmoking === "smoking_no"}
                                                    onChange={handleSmokingChange}
                                                />
                                            </div>
                                        </div>
                                        <label className="Top-label">Is your accommodation fully Furnished*</label>
                                        <div className='radiodiv'>
                                            <div className='container'>
                                                <label className='label'>  Yes </label>
                                                <input
                                                    type="radio"
                                                    value="furnished_yes"
                                                    id="furnished_yes"

                                                    checked={selectedFurnished === "furnished_yes"}
                                                    onChange={handleFurnishedChange}
                                                    className='radioButton'
                                                />
                                            </div>
                                            <div className='container'>
                                                <label className='label'>No
                                                </label>
                                                <input
                                                    className='radioButton'
                                                    type="radio"
                                                    value="furnished_no"
                                                    id="furnished_no"

                                                    checked={selectedFurnished === "furnished_no"}
                                                    onChange={handleFurnishedChange}
                                                />
                                            </div>
                                        </div>
                                        <label className="Top-label">Is your accomodation pet friendly?*</label>
                                        <div className='radiodiv'>
                                            <div className='container'>
                                                <label className='label'>  Yes </label>
                                                <input
                                                    type="radio"
                                                    value="pets_yes"
                                                    id="pets_yes"
                                                    checked={selectedPets === "pets_yes"}
                                                    onChange={handlePetsChange}
                                                    className='radioButton'
                                                />
                                            </div>
                                            <div className='container'>
                                                <label className='label'>No
                                                </label>
                                                <input
                                                    className='radioButton'
                                                    type="radio"
                                                    value="pets_no"
                                                    id="pets_no"
                                                    checked={selectedPets === "pets_no"}
                                                    onChange={handlePetsChange}
                                                />
                                            </div>
                                        </div>

                                        <label className="Top-label">Upload pictures here*</label>

                                        <Card>
                                            <CardBody>

                                                <Form>
                                                    <Dropzone onDrop={handleAcceptedFiles}>
                                                        {({ getRootProps, getInputProps }) => (
                                                            <div className="dropzone">
                                                                <div className="dz-message needsclick mt-2" {...getRootProps()}>
                                                                    <input {...getInputProps()} />
                                                                    <div className="mb-3">
                                                                        <i className="display-4 text-muted ri-upload-cloud-2-line"></i>
                                                                    </div>
                                                                    <h4>Drop files here or click to upload.</h4>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </Dropzone>
                                                    <div className="dropzone-previews mt-3" id="file-previews">
                                                        {selectedFiles.map((f, i) => (
                                                            <Card
                                                                className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                                                                key={i + "-file"}
                                                            >
                                                                <div className="p-2">
                                                                    <Row className="align-items-center">
                                                                        <Col className="col-auto">
                                                                            <img
                                                                                data-dz-thumbnail=""
                                                                                height="80"
                                                                                className="avatar-sm rounded bg-light"
                                                                                alt={f.name}
                                                                                src={f.preview}
                                                                            />
                                                                        </Col>
                                                                        <Col>
                                                                            <Link to="#" className="text-muted font-weight-bold">
                                                                                {f.name}
                                                                            </Link>
                                                                            <p className="mb-0">
                                                                                <strong>{f.formattedSize}</strong>
                                                                            </p>
                                                                        </Col>
                                                                    </Row>
                                                                </div>
                                                            </Card>
                                                        ))}
                                                    </div>
                                                </Form>
                                            </CardBody>
                                        </Card>

                                        <label className="Top-label">Describe your place*</label>
                                        <CustomInput
                                            type='text'
                                            name='description'
                                            values={values}
                                            errors={errors}
                                            touched={touched}
                                            handleChange={handleChange}
                                            placeholder={"Enter description"}
                                        />

                                        <div className="text-center">
                                            <Button
                                                type="submit"
                                                name="btn"
                                                className="custom-btn"
                                                onSubmit={(values) => handleSubmit(values)}
                                            >
                                                Post
                                            </Button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>

                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Accommodation;
