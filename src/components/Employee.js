import React, { Component } from 'react'
import {Table, Button, ButtonToolbar} from 'react-bootstrap';
import AddEmployeesModal from './AddEmployeesModal';
import EditEmployeeModal from './EditEmployeeModal';

class Employee extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             emplyees : [],
             saveModal : false,
             editModal : false,
        }
    }

        //Rafraichir la list des données qu'on render dans le dom
        componentDidMount(){
            this.refreshList();
        }
    
        refreshList = ()=>{
            fetch("https://localhost:44330/api/Employees")
            .then(response => response.json())
            .then(data=>{
                this.setState({
                    emplyees : data,
                })
            })
        }
       //forcer le update qu'on inset des données
       componentDidUpdate = (prevProps, prevState) => {
        if (this.state.emplyees === prevState.emplyees) {
             this.refreshList();
         }
         console.log("componentDidUpdate is launched");
     }

     deleteEmployee = (empid) => {
        const requestDeleteOptions = {
            method: 'DELETE',
            headers: { 
                'Accept' : 'application/json',
                'Content-Type': 'application/json' 
            }
        };
        if(window.confirm('Are you sure?')){
            fetch("https://localhost:44330/api/Employees/"+empid, requestDeleteOptions);
        }
        this.refreshList();
    }
    addEmp = () =>{
        this.setState({
            saveModal : true
        })
    }
    closeSaveModal = () => {
        this.setState({saveModal : false});
    }
    closeEditModal = () => {
        this.setState({editModal : false});
    }
    render() {
        const {emplyees, empid, empname, department, email, doj} = this.state;
        return (
            <>
            <Table className="mt-4" striped bordered hover size='sm'>
                <thead>
                    <tr>
                        <th>EmployeeID</th>
                        <th>Employee Name</th>
                        <th>Department Name</th>
                        <th>Mail address</th>
                        <th>Date of Journing</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {emplyees.map(emp =>{
                        return(
                            <tr key={emp.EmployeeID}>
                                <td>{emp.EmployeeID}</td>
                                <td>{emp.EmployeeName}</td>
                                <td>{emp.Department}</td>
                                <td>{emp.MailID}</td>
                                <td>{emp.DayOfJorning}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button 
                                            className="mr-2" 
                                            variant="info" 
                                            onClick={() => this.setState(
                                                {editModal : true, 
                                                empid :emp.EmployeeID, 
                                                empname: emp.EmployeeName,
                                                department:emp.Department,
                                                email : emp.MailID,
                                                doj : emp.DayOfJorning
                                                })}>
                                            Edit
                                        </Button>

                                        <Button 
                                            className="mr-2" 
                                            variant="danger" 
                                            onClick={() => this.deleteEmployee(emp.EmployeeID)}>
                                            Delete
                                        </Button>
                                        
                                        <EditEmployeeModal 
                                            show={this.state.editModal}
                                            onHide={this.closeEditModal}
                                            empid={empid}
                                            empname={empname}
                                            department={department}
                                            email={email}
                                            doj={doj}

                                        />
                                    </ButtonToolbar>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            <ButtonToolbar>
                <Button variant='primary' onClick={this.addEmp}> Add Employee</Button>
                <AddEmployeesModal 
                    show={this.state.saveModal}
                    onHide={this.closeSaveModal}
                 />
            </ButtonToolbar>
           
            </>
        )
    }
}

export default Employee;
