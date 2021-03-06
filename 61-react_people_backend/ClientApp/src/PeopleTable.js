import React from 'react';
import PersonForm from './PersonForm';
import axios from 'axios';
import PersonRow from './PersonRow';

class PeopleTable extends React.Component {
    state = {
        people: [],
        person: {
            firstName: '',
            lastName: '',
            age:''
        },
        editMode: false,
        selectedPeople:[]
    }

    componentDidMount() {
        this.loadTable();
    }

    loadTable() {
        axios.get('/api/people/getpeople').then(res => {
            this.setState({ people: res.data });
        });
    }
    onTextChange = e => {
        const copy = { ...this.state.person };
        copy[e.target.name] = e.target.value;
        this.setState({ person: copy });
    }

    onAddClick = () => {
        console.log(this.state.person);
        axios.post('/api/people/addperson', this.state.person).then(() => {
            axios.get('/api/people/getpeople').then(res => {
                this.setState({
                    people: res.data,
                    person: {
                        firstName: '',
                        lastName: '',
                        age: ''
                    },
                });
            });
        });
        this.loadTable();
    }
    onDeleteClick =  id  => {
        axios.post('/api/people/deleteperson', { id }).then(() => {
            this.loadTable();
        })
    }

    onEditClick = p => {
        this.setState({ person: p, editMode: true });
    }

    onUpdateClick = () => {
        axios.post('/api/people/updateperson', this.state.person).then(() => {
            this.loadTable();
            this.setState({
                person:{
                    firstName: '',
                    lastName: '',
                    age:''
                },
                editMode: false
            })
        })
    }
    onCancelClick = () => {
        this.setState({
            person: {
                firstName: '',
                lastName: '',
                age: ''
            },
            editMode: false
        })
    }
    onSelectChange = p => {
        const { selectedPeople } = this.state;
        if (selectedPeople.includes(p)) {
            this.setState({ selectedPeople: selectedPeople.filter(s => s.id !== p.id) });
        }
        else {
            this.setState({ selectedPeople: [...selectedPeople, p] });
        }
        console.log(selectedPeople);
    }
    onCheckAllClick = () => {
        this.setState({selectedPeople: this.state.people})
    }
    onUncheckAllClick = () => {
        this.setState({ selectedPeople:[] })
    }
    onDeleteSelectedClick = () => {
        axios.post('/api/people/deletepeople', this.state.selectedPeople).then(() => {
            this.loadTable();
            this.setState({ selectedPeople:[] })
        })
    }

    render() {
        const { person, editMode } = this.state;
        const { firstName, lastName, age } = person;
        return (
            <>
                <PersonForm
                    firstName={firstName}
                    lastName={lastName}
                    age={age}
                    onTextChange={this.onTextChange}
                    onAddClick={this.onAddClick}
                    isEditing={editMode}
                    onUpdateClick={this.onUpdateClick}
                    onCancelClick={this.onCancelClick}
                />
                <div className ='container'>
                <table className='table table-hover table-striped table-bordered mt-5'>
                    <thead>
                        <tr>
                            <td>
                                    <div className ='row mt-1'>
                                        <button onClick={this.onDeleteSelectedClick} className='btn btn-danger col-md-8'>Delete Selected</button>
                                    </div>
                                    <div className='row mt-1'>
                                        <button onClick={this.onCheckAllClick} className='btn btn-primary col-md-8'>Check All</button>
                                    </div>
                                    <div className='row mt-1'>
                                        <button onClick={this.onUncheckAllClick} className='btn btn-primary col-md-8'>Uncheck All</button>
                                    </div>
                            </td>
                            <td>First Name</td>
                            <td>Last Name</td>
                            <td>Age</td>
                            <td>Edit/Delete</td>

                        </tr>
                    </thead>
                        <tbody>
                            {this.state.people.map(p =>
                                 <PersonRow
                                    person={p}
                                    key={p.id}
                                    onEditClick={() => this.onEditClick(p)}
                                    onDeleteClick={() => this.onDeleteClick(p.id)}
                                    onSelectChange={() => this.onSelectChange(p)}

                                    isSelected={this.state.selectedPeople.includes(p)}
                                />)}
                    </tbody>
                    </table>
                </div>
            </>
            )
    }
}

export default PeopleTable;