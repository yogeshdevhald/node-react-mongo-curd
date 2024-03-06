import { Modal, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import validationSchema from './validations/validationSchema';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";


const EditPopup = ({ showModal, closeModal, edtd}) => {
  console.log(edtd)
  const navigate = useNavigate();
  const [successmsg,Setsucessmsg] = useState()
  const formik = useFormik({
    initialValues: {
      id:edtd._id,
      firstname: edtd.firstName,
      Lastname:edtd.lastName,
      email: edtd.email,
      phone: edtd.phone,
    },
    validationSchema: validationSchema, // Importing the validation schema
    onSubmit: values => {
      console.log('-------------------------on submit value-------------------------'+JSON.stringify(values));
      update(values)
    },
  });
 async function update(values)
  {
    console.log('.....................innnnnnn update..................'+values._id)
    try {
      const response = await fetch('http://localhost:3000/app/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({'id':values.id,'firstname': values.firstname,'Lastname':values.Lastname,'email': values.email,'phone': values.phone}),
    });
    if (!response.ok) {
      console.log(`HTTP error! Status: ${response.status}`);
    }
      var json = await response.json();
      console.log(json.datae);
      Setsucessmsg(json.datae)
      navigate("/Home");
     } catch (e) {
      console.error(e);
  }
  }
  return (
    <Modal show={showModal} onHide={closeModal}>
    <Modal.Header closeButton>
      <Modal.Title>{successmsg}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <form onSubmit={formik.handleSubmit}>
    <input
      type="text"
      className="form-control"
      id="_id"
      placeholder="Enter Lastname"
      name="_id"
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value = {formik.values.id}
    />  
  <div className="form-group">
    <label htmlFor="email">First name:</label>
    <input
      type="text"
      className="form-control"
      id="firstname"
      placeholder="Enter email"
      name="firstname"
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values.firstname}
    />
     {formik.touched.firstname && formik.errors.firstname ? (
          <div>{formik.errors.firstname}</div>
        ) : null}
  </div>
  <div className="form-group">
    <label htmlFor="email">Last name:</label>
    <input
      type="text"
      className="form-control"
      id="Lastname"
      placeholder="Enter Lastname"
      name="Lastname"
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value = {formik.values.Lastname}
    />
     {formik.touched.Lastname && formik.errors.Lastname ? (
          <div>{formik.errors.Lastname}</div>
        ) : null}
  </div>
  <div className="form-group">
    <label htmlFor="email">Email:</label>
    <input
      type="email"
      className="form-control"
      id="email"
      placeholder="Enter email"
      name="email"
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values.email}
    />
     {formik.touched.email && formik.errors.email ? (
          <div>{formik.errors.email}</div>
        ) : null}
  </div>
  <div className="form-group">
    <label htmlFor="email">Phone:</label>
    <input
      type="text"
      className="form-control"
      id="phone"
      placeholder="Enter email"
      name="phone"
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values.phone}
    />
     {formik.touched.phone && formik.errors.phone ? (
          <div>{formik.errors.phone}</div>
        ) : null}
  </div>
  <div className="checkbox">
    <label>
      <input type="checkbox" name="remember" /> Remember me
    </label>
  </div>
  <button type="submit" className="btn btn-default">
    Submit
  </button>
</form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant = "secondary" onClick ={ closeModal }>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
  );
};

export default EditPopup;