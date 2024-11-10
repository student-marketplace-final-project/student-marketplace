// Electronics.js
import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import HeaderFile from '../../../components/Custom/header';
import CustomInput from '../../../components/Custom/User/Textinput'
import Button from '../../../components/Custom/Button';
import "./product.css"
import { errorsConst as ERROR_CONST } from "../../../components/Constants/errors";

const Electronics = () => {

  const [initialValues, setInitialValues] = useState({
    title: '', type: '', description: '', condition: '', price: '', photos: ""
  });

  const validationSchema = Yup.object({
    title: Yup.string().required(ERROR_CONST.VEHICAL_MAKE),
    type: Yup.string().required(ERROR_CONST.VEHICAL_MODEL),
    price: Yup.string().required(ERROR_CONST.VEHICAL_YEAR),
    photos: Yup.string().required(ERROR_CONST.VEHICAL_VARIENT),
    condition: Yup.string().required(ERROR_CONST.TITLE),
    description: Yup.string().required(ERROR_CONST.DESCRIPTION),
  });
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
                    <label className="Top-label">Price*</label>
                    <CustomInput
                      type='text'
                      name='Price'
                      values={values}
                      errors={errors}
                      touched={touched}
                      placeholder={'Enter Price'}
                      handleChange={handleChange}
                    />

                    <label className="Top-label">Photos*</label>
                    <CustomInput
                      type='text'
                      name='photos'
                      values={values}
                      errors={errors}
                      touched={touched}
                      handleChange={handleChange}
                      placeholder={'Enter photos'}
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
                    <label className="Top-label">Describe the item*</label>
                    <CustomInput
                      type='text'
                      name='description'
                      values={values}
                      errors={errors}
                      touched={touched}
                      handleChange={handleChange}

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
    </React.Fragment>
  );
};

export default Electronics;
