import React, { useState } from 'react';
import toast from 'react-hot-toast';

const CheckboxForm = () => {
    const [selectedValues, setSelectedValues] = useState([]);
    const [designation, setDesignation] = useState('');
    const [gender, setGender] = useState('');
    const [file, setFile] = useState('');

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setSelectedValues((prev) => [...prev, value]);
        } else {
            setSelectedValues((prev) => prev.filter((val) => val !== value));
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0]
        setFile(selectedFile)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // console.log('Selected Values:', selectedValues);
        // console.log('Designation:', designation);
        console.log('gender:', gender);
    };

    return (
        <div className='flex w-full h-screen items-center justify-center'>
            {/* <form onSubmit={handleSubmit}>
                <label>
                    <input
                        type="checkbox"
                        value="Option 1"
                        onChange={handleCheckboxChange}
                    />
                    Option 1
                </label>
                <br />
                <label>
                    <input
                        type="checkbox"
                        value="Option 2"
                        onChange={handleCheckboxChange}
                    />
                    Option 2
                </label>
                <br />
                <label>
                    <input
                        type="checkbox"
                        value="Option 3"
                        onChange={handleCheckboxChange}
                    />
                    Option 3
                </label>
                <br />
                <button type="submit">Submit</button>
            </form> */}

            <form onSubmit={handleSubmit}>


                

                <label>Gender</label>
                <label>
                    <input
                        type="radio"
                        name='gender'
                        value='Male'
                        checked={gender === "Male"}
                        onChange={e => setGender(e.target.value)}
                    />
                    Male
                </label>

                <label>
                    <input
                        type="radio"
                        name='gender'
                        value='Female'
                        checked={gender === "Female"}
                        onChange={e => setGender(e.target.value)}
                    />
                    Female
                </label>


                <label htmlFor="image">Image Upload</label>
                <input
                    type="file"
                    id='image'
                    name='image'
                    onChange={handleFileChange}
                    accept="image/png, image/jpeg"
                />

                <button type='submit'>Submit</button>

            </form>
        </div>
    );
};



export default CheckboxForm;
