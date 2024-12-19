import { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const ResilienceRoundtableForm = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    dob: '',
    textPermission: false,
    attending: false,
    over18: false,
    discountPlan: false,
    fullPrice: false,
    bringingFriend: false,
    friendFirstName: '',
    friendLastName: '',
    friendDob: '',
    friendPhoneNumber: '',
    friendTextPermission: false,
    friendEmail: ''
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    phoneNumber: Yup.string().matches(/^\d{3}-\d{3}-\d{4}$/, 'Invalid phone number format').required('Phone number is required'),
    dob: Yup.date().required('Date of birth is required'),
    attending: Yup.boolean().required('Please indicate if you are attending'),
    over18: Yup.boolean().required('You must be over 18'),
    discountPlan: Yup.boolean(),
    fullPrice: Yup.boolean(),
    bringingFriend: Yup.boolean(),
    friendFirstName: Yup.string().when('bringingFriend', {
      is: true,
      then: Yup.string().required('Friend first name is required')
    }),
    friendLastName: Yup.string().when('bringingFriend', {
      is: true,
      then: Yup.string().required('Friend last name is required')
    }),
    friendDob: Yup.date().when('bringingFriend', {
      is: true,
      then: Yup.date().required('Friend’s date of birth is required')
    }),
    friendPhoneNumber: Yup.string().when('bringingFriend', {
      is: true,
      then: Yup.string().matches(/^\d{3}-\d{3}-\d{4}$/, 'Invalid phone number format').required('Friend’s phone number is required')
    }),
    friendEmail: Yup.string().when('bringingFriend', {
      is: true,
      then: Yup.string().email('Invalid email format').required('Friend’s email is required')
    })
  });

  const handleSubmit = (values) => {
    // Handle form submission (e.g., send data to API or display confirmation)
    console.log(values);
    setFormSubmitted(true);
  };

  return (
    <div>
      <h1>Resilience Roundtable Registration</h1>
      {formSubmitted ? (
        <div>Thank you for registering for the Resilience Roundtable!</div>
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values }) => (
            <Form>
              {/* Your personal information section */}
              <div>
                <label>First Name</label>
                <Field name="firstName" />
                <ErrorMessage name="firstName" component="div" />
              </div>

              <div>
                <label>Last Name</label>
                <Field name="lastName" />
                <ErrorMessage name="lastName" component="div" />
              </div>

              <div>
                <label>Email</label>
                <Field type="email" name="email" />
                <ErrorMessage name="email" component="div" />
              </div>

              <div>
                <label>Phone Number</label>
                <Field name="phoneNumber" />
                <ErrorMessage name="phoneNumber" component="div" />
              </div>

              <div>
                <label>Date of Birth</label>
                <Field type="date" name="dob" />
                <ErrorMessage name="dob" component="div" />
              </div>

              <div>
                <label>Do we have permission to text you?</label>
                <Field type="checkbox" name="textPermission" />
              </div>

              <div>
                <label>Are you planning to attend the Resilience Roundtable?</label>
                <Field type="checkbox" name="attending" />
                <ErrorMessage name="attending" component="div" />
              </div>

              <div>
                <label>Are you over the age of 18?</label>
                <Field type="checkbox" name="over18" />
                <ErrorMessage name="over18" component="div" />
              </div>

              <div>
                <label>Are you utilizing the discount plan pricing?</label>
                <Field type="checkbox" name="discountPlan" />
              </div>

              <div>
                <label>Are you paying full price ($30) to attend?</label>
                <Field type="checkbox" name="fullPrice" />
              </div>

              {/* Friend/Family section */}
              <div>
                <label>Are you bringing a friend/family member?</label>
                <Field type="checkbox" name="bringingFriend" />
              </div>

              {values.bringingFriend && (
                <>
                  <div>
                    <label>Friend's First Name</label>
                    <Field name="friendFirstName" />
                    <ErrorMessage name="friendFirstName" component="div" />
                  </div>

                  <div>
                    <label>Friend's Last Name</label>
                    <Field name="friendLastName" />
                    <ErrorMessage name="friendLastName" component="div" />
                  </div>

                  <div>
                    <label>Friend's Date of Birth</label>
                    <Field type="date" name="friendDob" />
                    <ErrorMessage name="friendDob" component="div" />
                  </div>

                  <div>
                    <label>Friend's Phone Number</label>
                    <Field name="friendPhoneNumber" />
                    <ErrorMessage name="friendPhoneNumber" component="div" />
                  </div>

                  <div>
                    <label>Do we have permission to text your friend/family member?</label>
                    <Field type="checkbox" name="friendTextPermission" />
                  </div>

                  <div>
                    <label>Friend's Email</label>
                    <Field type="email" name="friendEmail" />
                    <ErrorMessage name="friendEmail" component="div" />
                  </div>
                </>
              )}

              <button type="submit">Submit</button>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default ResilienceRoundtableForm;
