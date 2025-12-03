import { nanoid } from 'nanoid';
import {useState} from 'react';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faPlusCircle} from '@fortawesome/free-solid-svg-icons';

const AddStudent = (props) => {

    //id, firstName, lastName, photo
    const[firstName, setFirstName] = useState('');
    const[lastName, setLastName] = useState('');
    const[email, setEmail] = useState('');
    const[selectedFile, setSelectedFile] = useState(null);
    const[gradYear, setGradYear] = useState('');


    const addNewStudent = () => {
       const newStudent = {'id': nanoid(), 'firstName': firstName, 'lastName': lastName, 'email': email, 'image': URL.createObjectURL(selectedFile), 'gradYear': parseInt(gradYear)};
        props.addStudent(newStudent);
    }

    const imageUpdate = (event) => {
        setSelectedFile(event.target.files[0]);
    }

  return (
    <div className='mt-4 py-3' id="addStudent"> {/* Removed 'row' class and added 'mt-4' margin */}
        <h3> Add Student</h3>
        
        {/* Changed from col-md-2 to col-12 mb-3 for full width in sidebar */}
        <div className='col-12'> 
            <label htmlFor='txtFirstName' className='form-label'>First Name</label>
            <input type='text' id='txtFirstName' placeholder='First Name' className='form-control' onChange={(evt) => setFirstName(evt.currentTarget.value)} value={firstName} />
        </div>
        <div className='col-12 mb-3'>
            <label htmlFor='txtLastName' className='form-label'>Last Name</label>
            <input type='text' id='txtLastName' placeholder='Last Name' className='form-control' onChange={(evt) => setLastName(evt.currentTarget.value)} value={lastName} />
        </div>
        <div className='col-12 mb-3'>
        <label htmlFor='txtEmail' className='form-label'>Email</label>
            <input type='Email' id='txtEmail' placeholder='Email Address' className='form-control' onChange={(evt) => setEmail(evt.currentTarget.value)} value={email} />
        </div>
        <div className='col-12 mb-3'>
            <label htmlFor='fileUpload' className='form-label'>Student Image</label>
            <input type ='file' name='file' id='fileUpload' onChange={imageUpdate} />
        </div>
        <div className='col-12 mb-3'>
        <label htmlFor='txtGradYear' className='form-label'>Graduation Year</label>
            <input type='text' id='txtGradYear' placeholder='2025' className='form-control' onChange={(evt) => setGradYear(evt.currentTarget.value)} value={gradYear} />
        </div>
        {/* Added d-grid for full-width button in sidebar */}
        <div className='d-grid gap-2'> 
            <button type='button' className='btn btn-success' id='btnAdd' onClick={addNewStudent} disabled={!selectedFile}>Add Student <FontAwesomeIcon icon= {faPlusCircle}></FontAwesomeIcon></button>
        </div>
      
    </div>
  )
}

AddStudent.propTypes = {
  addStudent: PropTypes.func.isRequired
};
export default AddStudent
