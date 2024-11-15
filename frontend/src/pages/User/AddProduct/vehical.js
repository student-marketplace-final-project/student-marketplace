import React, { useState, useRef } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import "./product.css"
import HeaderFile from '../../../components/Custom/header';
import CustomInput from '../../../components/Custom/User/Textinput'
import Button from '../../../components/Custom/Button';
import { errorsConst as ERROR_CONST } from "../../../components/Constants/errors";
import {
  NotificationManager,
  NotificationContainer,
} from "react-notifications";
import { postAdsData } from '../../../Services/dashboardServices';
import { useLocation } from 'react-router-dom';
//vehicle file
/**
 *
 *
 * @param {*} props
 * @return {*} 
 */
const Vehical = (props) => {
  const formRef = useRef(null);
  const location = useLocation();
  const [imageBase64, setImageBase64] = useState('');
  const [initialValues, setInitialValues] = useState({
    make: '',
    model: '',
    year: '',
    title: '',
    description: '',
    price: '',
    phone_number: '',
    image: ''

  });

  // Yup validation schema
  const validationSchema = Yup.object({
    make: Yup.string().required(ERROR_CONST.VEHICAL_MAKE),
    model: Yup.string().required(ERROR_CONST.VEHICAL_MODEL),
    year: Yup.number().required(ERROR_CONST.VEHICAL_YEAR),
    title: Yup.string().required(ERROR_CONST.TITLE),
    description: Yup.string().required(ERROR_CONST.DESCRIPTION),
    price: Yup.number().required(ERROR_CONST.PRICE),
    phone_number: Yup.number().required(ERROR_CONST.PHONE_NUMBER),

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

  // Handle form submission
  const handleSubmit = (values) => {
   
    const data = {
      category_type: "Vehicles",
      categoryData: {
        make: values.make,
        model: values.model,
        year: values.year
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
        props.history.push("/dashboard")
      })
      .catch((error) => {
        const errData =
          error && error.data && error.data.message;
        if (errData === "Invalid email or password") {
          NotificationManager.error("Invalid email or password", "", 400);
        }
      });

  };

  return (
    <React.Fragment>
      <HeaderFile props={props}/>
      <div className=" page-content container-fluid">
        <div className="row vh-100 align-items-center justify-content-center">
          <div className="col-md-12 col-lg-4 bg-white rounded">
            <div className="innerContent">
              <h2>About my car</h2>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ values, errors, touched, handleChange }) => (
                  <Form>
                    <div>
                      <label className="Top-label">Make*</label>
                      <CustomInput
                        type='text'
                        name='make'
                        values={values}
                        errors={errors}
                        touched={touched}
                        handleChange={handleChange}
                        placeholder={'Enter make'}
                      />

                    </div>
                    <label className="Top-label">Model*</label>
                    <CustomInput
                      type='text'
                      name='model'
                      values={values}
                      errors={errors}
                      touched={touched}
                      handleChange={handleChange}
                      placeholder={'Enter model name'}
                    />
                    <label className="Top-label">Year*</label>
                    <CustomInput
                      type='number'
                      name='year'
                      values={values}
                      errors={errors}
                      touched={touched}
                      handleChange={handleChange}
                      placeholder={'Enter model year'}
                    />

                    <h2 className='heading'>Car Details</h2>
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
                    <label className="Top-label">Upload pictures here*</label>
                    <input type="file" name="image" accept="image/*" onChange={handleImageUpload} style={{ margin: "10px" }} /><br />
                    {!imageBase64 ? (
                      <div style={{ color: "red", marginLeft: "10px" }}>Please select an image</div>
                    ) : null}
                    {imageBase64 && <img src={imageBase64} alt="Preview" style={{ maxWidth: '200px', margin: "10px" }} />}<br />

                    <label className="Top-label">Description*</label>
                    <CustomInput
                      type='text'
                      name='description'
                      values={values}
                      errors={errors}
                      touched={touched}
                      handleChange={handleChange}
                      placeholder={'Enter description'}
                    />
                    <label className="Top-label">Price*</label>
                    <CustomInput
                      type='text'
                      name='price'
                      values={values}
                      errors={errors}
                      touched={touched}
                      handleChange={handleChange}
                      placeholder={'Enter Your Price'}
                    />
                    <label className="Top-label">Contact Number*</label>
                    <CustomInput
                      type='text'
                      name='phone_number'
                      values={values}
                      errors={errors}
                      touched={touched}
                      handleChange={handleChange}
                      placeholder={'Enter Phone Number'}
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

export default Vehical;
