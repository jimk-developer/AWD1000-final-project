import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid';

import Student from './components/Student';
import AddStudent from './components/AddStudent';

import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faWarning } from '@fortawesome/free-solid-svg-icons';

const STORAGE_KEY = 'studentData';

const students = [{

    id: nanoid(),
    firstName: "Anya",
    lastName: "Patel",
    email: "anya.patel98@example.com",
    image: "images/student1.jpg",
    gradYear: 2024
  }, {
    id: nanoid(),
    firstName: "Chloe",
    lastName: "Reed",
    email: "c.reed@example.com",
    image: "images/student2.jpg",
    gradYear: 2025

  }, {
    id: nanoid(),
    firstName: "Jordan",
    lastName: "Morgan",
    email: "jordan.morgan@example.com",
    image: "images/student3.jpg",
    gradYear: 2024

  }, {
    id: nanoid(),
    firstName: "Eliza",
    lastName: "Schmidt",
    email: "eliza_schmidt@example.com",
    image: "images/student4.jpg",
    gradYear: 2024

  }, {
    id: nanoid(),
    firstName: "Sofia",
    lastName: "Gonzales",
    email: "sofia.gonzales@example.com",
    image: "images/student5.jpg",
    gradYear: 2025

  }, {
    id: nanoid(),
    firstName: "Jasmine",
    lastName: "Lee",
    email: "jasmine.lee@example.com",
    image: "images/student6.jpg",
    gradYear: 2025

  }, {
    id: nanoid(),
    firstName: "Ruby",
    lastName: "Chen",
    email: "ruby.chen@example.com",
    image: "images/student7.jpg",
    gradYear: 2026

  }, {
    id: nanoid(),
    firstName: "Violet",
    lastName: "King",
    email: "violet.king@example.com",
    image: "images/student8.jpg",
    gradYear: 2025

  }, {
    id: nanoid(),
    firstName: "Kale",
    lastName: "O'Scannill",
    email: "koscannill8@skype.com",
    image: "images/student9.jpg",
    gradYear: 2024

  }, {
    id: nanoid(),
    firstName: "Seraphina",
    lastName: "Rossi",
    email: "seraphina.rossi@example.com",
    image: "images/student10.jpg",
    gradYear: 2026

  }];


const initializeState = () => {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY);
    if (serializedState === null) {
      return students;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Error loading state from localStorage:', err);
    return students;
  }
};

function App() {
    const [allStudents, setAllStudents] = useState(initializeState);
    const [searchResults, setSearchResults] = useState(initializeState);
    const [keywords, setKeyWords] = useState('');
    const [gradYear, setGradYear] = useState('');

    const searchStudents = () => {
    let results = allStudents;
    if (keywords) {
      const keywordsArray = keywords.toLowerCase().split(' ').filter(Boolean);
      console.log(keywordsArray);
      results = results.filter((student) => {
        return keywordsArray.some(
          (word) => student.firstName.toLowerCase().includes(word) || student.lastName.toLowerCase().includes(word)
        );
      });
    }
    if (gradYear) {
      const yearAsNumber = parseInt(gradYear, 10);
      results = results.filter((student) => {
        return student.gradYear === yearAsNumber;
      });
    }
    setSearchResults(results);
  };

  const clearSearch = () => {
    setKeyWords('');
    setGradYear('');
    setSearchResults(allStudents);
  };

  const updateStudent = (updatedStudent) => {
    setAllStudents((prevStudents) => {
      const newStudents = prevStudents.map((student) =>
        student.id === updatedStudent.id ? updatedStudent : student
      );
      return newStudents;
    });
  };

  const removeStudent = (studentToRemove) => {
  setAllStudents((prevStudents) => {
    const newStudents = prevStudents.filter(
      (student) => student.id !== studentToRemove.id
    );
    return newStudents;
  });
  };
const addStudent = (newStudent) => {
  setAllStudents((prevStudents) => {
    // Add the new student to the beginning of the array
    return [newStudent, ...prevStudents]; 
  });
};

  useEffect(() => {
    try {
      const serializedState = JSON.stringify(allStudents);
      localStorage.setItem(STORAGE_KEY, serializedState);
    } catch (err) {
      console.error('Error saving state to localStorage:', err);
    }
  }, [allStudents]);

  
  useEffect(() => {
      searchStudents();
  }, [allStudents, keywords, gradYear]);


  return (
    <>
      <div className='container-fluid'> {/* CHANGED: Using container-fluid for full width */}
        <div className='row'> {/* Main row for two-column layout */}
                      <h1 className='text-center'>Student Directory</h1>

          {/* Column 1: Student Cards (9/12 width) */}
          <div className='col-md-9 mt-4'>
            <div className='row mt-0 pt-1' id='allStudents'>
              {searchResults &&
                searchResults.map((student) => (
                  <div className='col-md-2' key={student.id}> {/* Changed from col-md-2 to col-md-3 to fit 4 cards in a col-md-9 parent */}
                    <Student
                      student={student}
                      removeStudent={removeStudent}
                      updateStudent={updateStudent}
                    />
                  </div>
                ))}
            </div>
          </div>
          
          {/* Column 2: Side Panel (3/12 width) */}
          <div className='col-md-3'>
            
            {/* 1. Add Student Section */}
            <AddStudent addStudent={addStudent} />
            
            {/* 2. Search Student Section */}
            <div className='mt-4' id='searchStudent'>
              <h3>Search Student</h3>
              
              {/* Keywords Input (col-12 for full width in sidebar) */}
              <div className='col-12 mb-3'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Search First or Last Name'
                  onChange={(e) => setKeyWords(e.currentTarget.value)}
                  value={keywords}
                />
              </div>
              
              {/* Graduation Year Select (col-12 for full width in sidebar) */}
              <div className='col-12 mb-3'>
                <select 
                  value={gradYear} 
                  onChange={(evt) => setGradYear(evt.currentTarget.value)} 
                  className='form-select'
                >
                  <option value=''>Select Year</option>
                  {[...new Set(allStudents.map((student) => student.gradYear))]
                    .sort((a, b) => a - b)
                    .map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                </select>
              </div>
              
              {/* Search Button (d-grid for full width and stacking) */}
              <div className='d-grid gap-2 mb-2'>
                <button type='button' className='btn btn-primary' onClick={searchStudents}>
                  Search Students <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                </button>
              </div>
              
              {/* Clear Button (d-grid for full width and stacking) */}
              <div className='d-grid gap-2'>
                <button type='button' className='btn btn-secondary' onClick={clearSearch}>
                  Clear Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;