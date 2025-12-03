import PropTypes from 'prop-types';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEraser, faWarning } from '@fortawesome/free-solid-svg-icons';

const Student = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [tempStudent, setTempStudent] = useState(props.student);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempStudent((prevStudent) => ({
      ...prevStudent,
      [name]: name === 'gradYear' ? parseInt(value, 10) : value,
    }));
  };
  const saveStudent = () => {
    props.updateStudent(tempStudent);
    setEditMode(false);
  };

  if (!editMode) {
    return (
      <div className='card'>
          <img src={props.student.image} className='card-image-top mx-auto'/>
          <ul className='list-group list-flush'>
                <li className='list-group-item text-center'>{props.student.firstName}</li>
                <li className='list-group-item text-center'>{props.student.lastName}</li>
                <li className='list-group-item text-center'>{props.student.email}</li>
                <li className='list-group-item text-center'>{props.student.gradYear}</li>
              <button type='button' className='btn btn-warning w-100' onClick={() => setEditMode(true)}>
              Edit Student <FontAwesomeIcon icon={faEraser}></FontAwesomeIcon>
            </button>
            <button type='button' className='btn btn-danger w-100' onClick={() => props.removeStudent(props.student)}>
              Delete Student <FontAwesomeIcon icon={faWarning}></FontAwesomeIcon>
            </button>
              </ul>
          </div>
    )
  }
    return (
    <div className='card bg-light border-warning'>
      <img src={tempStudent.image} className='card-image-top mx-auto' alt={`Image of ${tempStudent.firstName}`} />
      <ul className='list-group list-flush'>
        <li className='list-group-item'>
          <input
            type='text'
            name='firstName'
            value={tempStudent.firstName}
            onChange={handleInputChange}
            className='form-control'
          />
        </li>
        <li className='list-group-item'>
          <input
            type='text'
            name='lastName'
            value={tempStudent.lastName}
            onChange={handleInputChange}
            className='form-control'
          />
        </li>
        <li className='list-group-item'>
          <input
            type='email'
            name='email'
            value={tempStudent.email}
            onChange={handleInputChange}
            className='form-control'
          />
        </li>
        <li className='list-group-item'>
          <input
            type='number'
            name='gradYear'
            value={tempStudent.gradYear}
            onChange={handleInputChange}
            className='form-control'
          />
        </li>
        <li className='list-group-item'>
          {/* The Save Button */}
          <button id='btnSave' className='btn btn-secondary w-100' onClick={saveStudent}>
            Save
          </button>
        </li>
      </ul>
    </div>
  );
};

Student.propTypes = {
  student: PropTypes.shape({
    image: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    gradYear: PropTypes.number.isRequired,
    removeStudent: PropTypes.func.isRequired,
    updateStudent: PropTypes.func.isRequired,
  }).isRequired,
};

export default Student;
