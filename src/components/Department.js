import React, { Component } from 'react';
import {Table} from 'react-bootstrap';

class Department extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             depart : []
        }
    }

    componentDidMount(){
        this.refreshList();
    }
    refreshList(){
        fetch("https://localhost:44330/api/Deparatments")
        .then(response => response.json())
        .then(data=>{
            this.setState({
                depart : data
            })
        })
    }
    
    render() {

        const {depart} = this.state;
        return (
            <Table className="mt-4" striped bordered hover size='sm'>
                <thead>
                    <tr>
                        <td>DepartmentID</td>
                        <td>DepartmentName</td>
                    </tr>
                </thead>
                <tbody>
                    {depart.map(dept =>{
                        return(
                            <tr key={dept.DepartmentID}>
                                <td>{dept.DepartmentID}</td>
                                <td>{dept.DepartmentName}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        )
    }
}

export default Department;
