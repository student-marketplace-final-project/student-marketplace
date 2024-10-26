import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import "./product.css"
import HeaderFile from '../../../components/Custom/header';

const CarForm = () => {
 

  // Yup validation schema
  const validationSchema = Yup.object({
    make: Yup.string().required('Make is required'),
    model: Yup.string().required('Model is required'),
    year: Yup.string().required('Year is required'),
    title: Yup.string().required('Title is required'),
    odometer: Yup.string().required('Odometer is required'),
    price: Yup.string().required('Price is required'),
    contactName: Yup.string().required('Contact name is required'),
    location: Yup.string().required('Location is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
  });

  // Handle form submission
  const handleSubmit = (values) => {
    console.log("Form Data Submitted:", values);
     // Navigate to home page after submission
  };

  return (
    <React.Fragment>
        <HeaderFile/>
    <div className=" page-content">
        <div className='form-container'>
      <h2>About my car</h2>
      <Formik
        initialValues={{
          make: '', model: '', year: '', variant: '', title: '',
          odometer: '', vin: '', registrationNumber: '',
          registrationState: '', registrationExpiry: '',
          color: '', description: '', price: '', contactName: '',
          location: '', phoneNumber: ''
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <div>
              <label>Model*</label>
              <Field name="model" type="text" />
              <ErrorMessage name="model" component="div" className="error" />
            </div>

            <div>
              <label>Year*</label>
              <Field name="year" type="text" />
              <ErrorMessage name="year" component="div" className="error" />
            </div>

            <div>
              <label>Title*</label>
              <Field name="title" type="text" />
              <ErrorMessage name="title" component="div" className="error" />
            </div>

            <div>
              <label>Odometer*</label>
              <Field name="odometer" type="text" />
              <ErrorMessage name="odometer" component="div" className="error" />
            </div>
            <div>
              <label>Is your car Registered?</label>
              <Field name="odometer" type="text" />
              <ErrorMessage name="odometer" component="div" className="error" />
            </div>
            <div>
              <label>Registration Number*</label>
              <Field name="regoNumber" type="text" />
              <ErrorMessage name="regoNumber" component="div" className="error" />
            </div>
            <div>
              <label>Registration State*</label>
              <Field name="regoState" type="text" />
              <ErrorMessage name="regoState" component="div" className="error" />
            </div>
            <div>
              <label>Registration Expiry*</label>
              <Field name="regoExpiry" type="text" />
              <ErrorMessage name="regoExpiry" component="div" className="error" />
            </div>

            <div>
              <label>Price*</label>
              <Field name="price" type="text" />
              <ErrorMessage name="price" component="div" className="error" />
            </div>
            <div>
              <label>Description*</label>
              <Field name="Description" type="text" />
              <ErrorMessage name="Description" component="div" className="error" />
            </div>
            <div>
              <label>Upload a photo*</label>
              <Field name="photo" type="text" />
              <ErrorMessage name="photo" component="div" className="error" />
            </div>
            <button type="submit">Post</button>
          </Form>
        )}
      </Formik>

    </div>
    </div>
    </React.Fragment>
  );
};

export default CarForm;
