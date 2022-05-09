import React from 'react';

export default function PersonRow({ key, person, onEditClick, onDeleteClick, isSelected, onSelectChange }) {
    const { firstName, lastName, age } = person;
    return (
        <>
            <tr key={key}>
                <td>
                    <input checked={isSelected} onChange={onSelectChange} type='checkbox' className='form-control' />
                </td>
                <td>{firstName}</td>
                <td>{lastName}</td>
                <td>{age}</td>
                <td>
                    <button onClick={onEditClick} className='btn btn-block btn-warning'>Edit</button>
                    <button onClick={onDeleteClick} className='btn btn-block btn-danger'>Delete</button>
                </td>
            </tr>
        </>
    )

}
