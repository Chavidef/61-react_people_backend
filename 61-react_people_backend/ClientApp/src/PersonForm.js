import React from 'react';

function PersonForm({ firstName, lastName, age, onTextChange, onAddClick, isEditing, onUpdateClick, onCancelClick}) {
    function SetButtons() {
        if (isEditing) {
            return (
                <>
                    <div className='col-md-2'>
                        <button onClick={onUpdateClick} className='btn btn-primary btn-block btn-success'>Update</button>
                    </div>
                    <div className='col-md-2'>
                        <button onClick={onCancelClick} className='btn btn-primary btn-block btn-danger'>Cancel</button>
                    </div>
                </>
            )
        }
        else {
            return (
                <div className='col-md-2'>
                    <button onClick={onAddClick} className='btn btn-primary btn-block btn-success'>Add</button>
                </div>
            )
        }
    }
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
                    {SetButtons()}
                </div>
            </div>
        </div>
    )

}
export default PersonForm;
