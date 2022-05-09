import React from 'react';

export default function PersonForm({ firstName, lastName, age, onTextChange, onAddClick }) {
        return (
            <div className='container'>
                <div className='jumbotron'>
                    <div className='row'>
                        <div className='col-md-2'>
                            <input type='text' name='firstName' value={firstName} onChange={onTextChange} className='form-control' placeholder='First Name' />
                        </div>
                        <div className='col-md-2' >
                            <input type='text' name='lastName' value={lastName} onChange={onTextChange} className='form-control' placeholder='Last Name' />
                        </div>
                        <div className='col-md-2' >
                            <input type='text' name='age' value={age} onChange={onTextChange} className='form-control' placeholder='Age' />
                        </div>


                        <div className='col-md-2'>
                            <button onClick={onAddClick} className='btn btn-primary btn-block btn-success'>Add</button>
                        </div>
                        
                    </div>
                </div>
            </div>
        )

    }

