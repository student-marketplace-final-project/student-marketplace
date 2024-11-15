// Electronics.js
import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import HeaderFile from '../../../components/Custom/header';
import CustomInput from '../../../components/Custom/User/Textinput'
import Button from '../../../components/Custom/Button';
import "./product.css"
import { errorsConst as ERROR_CONST } from "../../../components/Constants/errors";
import {
  NotificationManager,
  NotificationContainer,
} from "react-notifications";
import { postAdsData } from '../../../Services/dashboardServices';

/**
 *
 *
 * @param {*} props
 * @return {*} 
 */
const Electronics = (props) => {
  
  const [initialValues, setInitialValues] = useState({
    title: '', type: '', description: '', brand: '', model: '', condition: '', price: '', image: '', phone_number: ''
  });
  const [imageBase64, setImageBase64] = useState('');

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


  const validationSchema = Yup.object({
    title: Yup.string().required(ERROR_CONST.TITLE),
    type: Yup.string().required(ERROR_CONST.TYPE),
    price: Yup.string().required(ERROR_CONST.PRICE),
    condition: Yup.string().required(ERROR_CONST.TITLE),
    description: Yup.string().required(ERROR_CONST.DESCRIPTION),
    brand: Yup.string().required(ERROR_CONST.BRAND),
    model: Yup.string().required(ERROR_CONST.MODEL),
    phone_number: Yup.string().required(ERROR_CONST.PHONE_NUMBER),
  });
  // Handle form submission
  /**
   *
   *
   * @param {*} values
   */
  const handleSubmit = (values) => {
    console.log("Form Data Submitted:", values);
    const data = {
      category_type: "Electronics",
      categoryData: {
        brand: values.brand,
        model: values.model,
        "`condition`": values.condition,
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
        console.log("=====>error", error)
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

              <h2>Electronics</h2>
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
                    <label className="Top-label">Brand*</label>
                    <CustomInput
                      type='text'
                      name='brand'
                      values={values}
                      errors={errors}
                      touched={touched}
                      handleChange={handleChange}
                      placeholder={'Enter Brand'}
                    />
                    <label className="Top-label">Model*</label>
                    <CustomInput
                      type='text'
                      name='model'
                      values={values}
                      errors={errors}
                      touched={touched}
                      handleChange={handleChange}
                      placeholder={'Enter model'}
                    />
                    <label className="Top-label">Condition*</label>
                    <CustomInput
                      type='text'
                      name='condition'
                      values={values}
                      errors={errors}
                      touched={touched}
                      handleChange={handleChange}
                      placeholder={'Describe items condition'}
                    />
                    <label className="Top-label">Price*</label>
                    <CustomInput
                      type='number'
                      name='price'
                      values={values}
                      errors={errors}
                      touched={touched}
                      placeholder={'Enter Price'}
                      handleChange={handleChange}
                    />

                    <label className="Top-label">Upload pictures here*</label>
                    <input type="file" name="image" accept="image/*" onChange={handleImageUpload} style={{ margin: "10px" }} /><br />
                    {imageBase64 && <img src={imageBase64} alt="Preview" style={{ maxWidth: '200px', margin: "10px" }} />}<br />


                    <label className="Top-label">Describe the item*</label>
                    <CustomInput
                      type='text'
                      name='description'
                      values={values}
                      errors={errors}
                      touched={touched}
                      handleChange={handleChange}
                      placeholder={"Enter Description"}
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
                        onSubmit={(values) => this.handlesubmit(values)}
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

export default Electronics;
