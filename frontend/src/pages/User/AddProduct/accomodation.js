import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import "./product.css"
import HeaderFile from '../../../components/Custom/header';
import CustomInput from '../../../components/Custom/User/Textinput';
import Button from '../../../components/Custom/Button';
import { errorsConst as ERROR_CONST } from "../../../components/Constants/errors";
import { postAdsData } from '../../../Services/dashboardServices';
import {
    NotificationManager,
    NotificationContainer,
} from "react-notifications";

/**
 *
 *
 * @param {*} props
 * @return {*} 
 */
const Accommodation = (props) => {

    // State to hold the selected option
    const [selectedParking, setSelectedParking] = useState("parking_yes");
    const [selectedSmoking, setSelectedSmoking] = useState("smoking_yes");
    const [selectedFurnished, setSelectedFurnished] = useState("furnished_yes");
    const [selectedPets, setSelectedPets] = useState("pets_yes");

    const [imageBase64, setImageBase64] = useState('');

    const [initialValues, setInitialValues] = useState({
        title: '', type: '', price: '', availableDate: '', no_of_bedrooms: '',
        no_of_bathrooms: '', parking: true, smoking: true,
        furnished: true, pets: true,
        description: '', phone_number: ''
    });

    const handleImageUpload = (e) => {
        const file = e.target.files[0]; // Get the uploaded file
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageBase64(reader.result); // Save Base64 string to state
            };
            reader.readAsDataURL(file); // Convert image to Base64
        }
    };


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
        phone_number:Yup.number().required(ERROR_CONST.PHONE_NUMBER)

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

        const data = {
            category_type: "Accommodation",
            categoryData: {
                bedrooms: values.no_of_bedrooms,
                bathrooms: values.no_of_bathrooms,
                available_date: values.availableDate,
                parking: values.parking,
                smoking: values.smoking,
                furnished: values.furnished,
                pets: values.pets,
                type: values.type
            },
            adData: {
                title: values.title,
                description: values.description,
                price: values.price,
                image: imageBase64,
                phone_number: values.phone_number,
                location_lat: 35.712776,
                location_lon: -74.005974
            }
        }
        postAdsData(data)
            .then((response) => {
               props.history.push('/dashboard');
            })
            .catch((error) => {
                
                const errData =
                    error && error.data && error.data.message;
                if (errData === "Invalid email or password") {
                    NotificationManager.error("Invalid email or password", "", 400);
                }
            });
        // Navigate to home page after submission
    };


    return (
        <React.Fragment>
            <HeaderFile props={props}/>
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
                                            type='number'
                                            name='price'
                                            values={values}
                                            errors={errors}
                                            touched={touched}
                                            handleChange={handleChange}
                                            placeholder={'Enter Price'}
                                        />

                                        <label className="Top-label">Available Date*</label>
                                        <CustomInput
                                            type='date'
                                            name='availableDate'
                                            values={values}
                                            errors={errors}
                                            touched={touched}
                                            handleChange={handleChange}
                                            placeholder={'Enter Available Date'}
                                        />
                                        <label className="Top-label">Number of Bedrooms*</label>
                                        <CustomInput
                                            type='number'
                                            name='no_of_bedrooms'
                                            values={values}
                                            errors={errors}
                                            touched={touched}
                                            handleChange={handleChange}
                                            placeholder={'Enter Number of Bedrooms'}
                                        />
                                        <label className="Top-label">Number of Bathrooms*</label>
                                        <CustomInput
                                            type='number'
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
                                        <input type="file" name="image" accept="image/*" onChange={handleImageUpload} style={{ margin: "10px" }} /><br />
                                        {!imageBase64 ? (
                                            <div style={{ color: "red", marginLeft: "10px" }}>Please select an image</div>
                                        ) : null}
                                        {imageBase64 && <img src={imageBase64} alt="Preview" style={{ maxWidth: '200px', margin: "10px" }} />}<br />


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
                                        <label className="Top-label">Contact Details*</label>
                                        <CustomInput
                                            type='text'
                                            name='phone_number'
                                            values={values}
                                            errors={errors}
                                            touched={touched}
                                            handleChange={handleChange}
                                            placeholder={"Enter contact number"}
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
            <NotificationContainer />
        </React.Fragment>
    );
};

export default Accommodation;
