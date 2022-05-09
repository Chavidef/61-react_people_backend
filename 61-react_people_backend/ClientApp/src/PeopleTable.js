import React from 'react';
import PersonForm from './PersonForm';
import axios from 'axios';

class PeopleTable extends React.Component {
    state = {
        people: [],
        person: {
            id:'',
            firstName: '',
            lastName: '',
            age:''
        }
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

    render() {
        const { person} = this.state;
        const { firstName, lastName, age } = person;
        return (
            <>
                <PersonForm
                    firstName={firstName}
                    lastName={lastName}
                    age={age}
                    onTextChange={this.onTextChange}
                    onAddClick={this.onAddClick}
                />
                <div className ='container'>
                <table className='table table-hover table-striped table-bordered mt-5'>
                    <thead>
                        <tr>
                            <td>
                                    <div className ='row mt-1'>
                                        <button className='btn btn-danger col-md-8'>Delete Selected</button>
                                    </div>
                                    <div className='row mt-1'>
                                        <button className='btn btn-primary col-md-8'>Check All</button>
                                    </div>
                                    <div className='row mt-1'>
                                        <button className='btn btn-primary col-md-8'>Uncheck All</button>
                                    </div>
                            </td>
                            <td>First Name</td>
                            <td>Last Name</td>
                            <td>Age</td>
                            <td>Edit/Delete</td>

                        </tr>
                    </thead>
                    <tbody>
                        {/*{this.generateBody()}*/}
                    </tbody>
                    </table>
                </div>
            </>
            )
    }
}

export default PeopleTable;