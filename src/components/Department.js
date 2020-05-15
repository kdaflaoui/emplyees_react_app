import React, { Component } from 'react';
import {Table, Button, ButtonToolbar} from 'react-bootstrap';
import AddDepartmentModal from './AddDepartmentModal';
import EditDepartmentModel from './EditDepartmentModel';

class Department extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             depart : [],
             saveModal : false,
             editModal : false,
        }
    }
    //Rafraichir la list des données qu'on render dans le dom
    componentDidMount(){
        this.refreshList();
    }

    refreshList = ()=>{
        fetch("https://localhost:44330/api/Deparatments")
        .then(response => response.json())
        .then(data=>{
            this.setState({
                depart : data,
            })
        })
    }


    //forcer le update qu'on inset des données
    componentDidUpdate = (prevProps, prevState) => {
       if (this.state.depart === prevState.depart) {
            this.refreshList();
        }
        console.log("componentDidUpdate is launched");
    }

    addDeptment = () =>{
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
    deleteDepart = (deptid) => {
        const requestDeleteOptions = {
            method: 'DELETE',
            headers: { 
                'Accept' : 'application/json',
                'Content-Type': 'application/json' 
            }
        };
        if(window.confirm('Are you sure?')){
            fetch("https://localhost:44330/api/Deparatments/"+deptid, requestDeleteOptions);
        }
        this.refreshList();
    }

    render() {

        const {depart, deptid, deptname} = this.state;

        return (
            <>
            <Table className="mt-4" striped bordered hover size='sm'>
                <thead>
                    <tr>
                        <th>DepartmentID</th>
                        <th>DepartmentName</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {depart.map(dept =>{
                        return(
                            <tr key={dept.DepartmentID}>
                                <td>{dept.DepartmentID}</td>
                                <td>{dept.DepartmentName}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button 
                                            className="mr-2" 
                                            variant="info" 
                                            onClick={() => this.setState({editModal : true, deptid :dept.DepartmentID, deptname: dept.DepartmentName })}>
                                            Edit
                                        </Button>

                                        <Button 
                                            className="mr-2" 
                                            variant="danger" 
                                            onClick={() => this.deleteDepart(dept.DepartmentID)}>
                                            Delete
                                        </Button>
                                        
                                        <EditDepartmentModel 
                                            show={this.state.editModal}
                                            onHide={this.closeEditModal}
                                            deptid={deptid}
                                            deptname={deptname}
                                        />
                                    </ButtonToolbar>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            <ButtonToolbar>
                <Button variant='primary' onClick={this.addDeptment}> Add Deparatment</Button>
                <AddDepartmentModal 
                    show={this.state.saveModal}
                    onHide={this.closeSaveModal}
                 />
            </ButtonToolbar>
           
            </>
        )
    }
}

export default Department;
