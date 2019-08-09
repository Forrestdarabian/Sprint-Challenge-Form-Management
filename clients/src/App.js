import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';

const Onboarding = ({ errors, touched, values, handleSubmit, status }) => {
  const [users, setUsers] = useState([]);
  console.log(users);

  useEffect(() => {
    if (status) {
      setUsers([...users, status]);
    }
  }, [users, status]);

  return (
    <div className="user-form">
      <h1>User Form</h1>
      <Form>
        <Field type="text" name="Username" placeholder="Username" />
        {touched.Username && errors.Username && <p className="error">{errors.Username}</p>}

        <Field type="text" name="Password" placeholder="Password" />
        {touched.Password && errors.Password && <p className="error">{errors.Password}</p>}

        <button type="submit">Submit!</button>
      </Form>

      {users.map(user => (
        <p key={user.Username}>{user.Password}</p>
      ))}
    </div>
  );
};

const FormikOnboarding = withFormik({
  mapPropsToValues({ Username, Password }) {
    return {
      Username: 'Your Name',
      Password: 'Password'
      // error: "false",
      // message: "User created successfully",
      // token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTYzNDc2NTc0LCJleHAiOjE1NjM0ODAxNzR9.pIkjFgRRbrrg8j38YGiWpMlw0wgTWRfZmIIMAeFLQcw"
    };
  },

  validationSchema: Yup.object().shape({
    Username: Yup.string().required('Username is a required field'),
    Password: Yup.string().required(),
  }),

  handleSubmit(values, { setStatus }) {
    axios
      .post(`http://localhost:5000/api/register`, {Username: 'Forrest', Password: 'qwerty'})
      // .get('http://localhost:5000/api/restricted/users')
      .then(res => {
        setStatus(res.data);
      })
      .catch(err => console.log(err.response));
  }
})(Onboarding);

// const form = Onboarding.getByText(/Username/i);
// expect(form).toHaveTextContent(/Username/i)

export default FormikOnboarding;
