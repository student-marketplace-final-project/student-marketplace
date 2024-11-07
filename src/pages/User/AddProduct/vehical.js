import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import "./product.css"
import HeaderFile from '../../../components/Custom/header';
import CustomInput from '../../../components/Custom/User/Textinput'
import Button from '../../../components/Custom/Button';
import { errorsConst as ERROR_CONST } from "../../../components/Constants/errors";


const Vehical = () => {

  const initialValues = {
    make: '', model: '', year: '', variant: '', title: '',
    odometer: '', vin: '', registrationNumber: '',
    registrationState: '', registrationExpiry: '',
    color: '', description: '', price: '', contactName: '',
    location: '', phoneNumber: ''
  }
  // Yup validation schema
  const validationSchema = Yup.object({
    make: Yup.string().required(ERROR_CONST.VEHICAL_MAKE),
    model: Yup.string().required(ERROR_CONST.VEHICAL_MODEL),
    year: Yup.string().required(ERROR_CONST.VEHICAL_YEAR),
    varient: Yup.string().required(ERROR_CONST.VEHICAL_VARIENT),
    title: Yup.string().required(ERROR_CONST.TITLE),
    odometer: Yup.string().required(ERROR_CONST.ODOMETER),
    vin: Yup.string().required(ERROR_CONST.VIN),
    registrationNumber: Yup.string().required(ERROR_CONST.REGISTRATION_NUMBER),
    registrationExpiry: Yup.string().required(ERROR_CONST.REGISTRATION_EXPIRY),
    registrationState: Yup.string().required(ERROR_CONST.REGISTRATION_STATE),
    description: Yup.string().required(ERROR_CONST.DESCRIPTION),
    price:Yup.string().required(ERROR_CONST.PRICE)
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
          <h2>About my car</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched }) => (
              <Form>
                <div>
                  <label className="Top-label">Make*</label>
                  <CustomInput
                    type='text'
                    name='make'
                    values={values}
                    errors={errors}
                    touched={touched}
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
                  placeholder={'Enter model name'}
                />
                <label className="Top-label">Year*</label>
                <CustomInput
                  type='text'
                  name='year'
                  values={values}
                  errors={errors}
                  touched={touched}
                  placeholder={'Enter model year'}
                />
                <label className="Top-label">Variant*</label>
                <CustomInput
                  type='text'
                  name='Variant'
                  values={values}
                  errors={errors}
                  touched={touched}
                  placeholder={'Enter Variant'}
                />
                <h2 className='heading'>Car Details</h2>
                <label className="Top-label">Title*</label>
                <CustomInput
                  type='text'
                  name='title'
                  values={values}
                  errors={errors}
                  touched={touched}
                  placeholder={'Enter title'}
                />
                <label className="Top-label">Odometer*</label>
                <CustomInput
                  type='text'
                  name='odometer'
                  values={values}
                  errors={errors}
                  touched={touched}
                  placeholder={'Enter odometer'}
                />
                <label className="Top-label">VIN*</label>
                <CustomInput
                  type='text'
                  name='vin'
                  values={values}
                  errors={errors}
                  touched={touched}
                  placeholder={'Enter VIN number'}
                />
                <label className="Top-label">Is your car registered?*</label>
                <CustomInput
                  type='text'
                  name='Variant'
                  values={values}
                  errors={errors}
                  touched={touched}
                  placeholder={'Enter Variant'}
                />
                <label className="Top-label">Registration Number*</label>
                <CustomInput
                  type='text'
                  name='registration-number'
                  values={values}
                  errors={errors}
                  touched={touched}
                  placeholder={'Enter Registration Number'}
                />
                <label className="Top-label">Registration State*</label>
                <CustomInput
                  type='text'
                  name='registration-state'
                  values={values}
                  errors={errors}
                  touched={touched}
                  placeholder={'Enter Registration State'}
                />
                <label className="Top-label">Registration Expiry*</label>
                <CustomInput
                  type='text'
                  name='registration-expiry'
                  values={values}
                  errors={errors}
                  touched={touched}
                  placeholder={'Enter Registration Expiry Date'}
                />
                <label className="Top-label">Photo*</label>
                <CustomInput
                  type='upload'
                  name='photo'
                  values={values}
                  errors={errors}
                  touched={touched}
                  placeholder={'Enter Picture'}
                />
                <label className="Top-label">Description*</label>
                <CustomInput
                  type='text'
                  name='description'
                  values={values}
                  errors={errors}
                  touched={touched}
                  placeholder={'Enter description'}
                />
                <label className="Top-label">Price*</label>
                <CustomInput
                  type='text'
                  name='Price'
                  values={values}
                  errors={errors}
                  touched={touched}
                  placeholder={'Enter Your Price'}
                />
                <div className="text-center">
                        <Button
                          type="submit"
                          name="btn"
                          className="custom-btn"
                        //onSubmit={(values) => this.handlesubmit(values)}
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

export default Vehical;
