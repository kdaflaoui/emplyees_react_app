import React, { Component } from 'react'
import {Modal, Button, Row, Col, Form, FormLabel, FormGroup} from 'react-bootstrap';
import Snackbar from '@material-ui/core/SnackBar';
import IconButton from '@material-ui/core/IconButton';


class EditEmployeeModal extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             snackbaropen : false,
             snackbarmsg : ''
        }
    }

    snackBarClose = () => {
        this.setState({
            snackbaropen : false
        })
    }
    
    handleSubmit = event => {
        event.preventDefault();
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                EmployeeID : event.target.EmployeeID.value,
                EmployeeName : event.target.EmployeeName.value,
                Department : event.target.Department.value,
                MailID : event.target.MailID.value,
                DayOfJorning : event.target.DayOfJorning.value 
            })
        };

        fetch(`https://localhost:44330/api/employees/${this.props.empid}`, requestOptions)
        .then(response => response.json())
        .then(
            (result) =>{
                this.setState({
                    snackbaropen : true,
                    snackbarmsg : 'The department updated Successfully'
                })
            },
            (error) =>{
                this.setState({
                    snackbaropen : true,
                    snackbarmsg : 'The department updated Successfully'
                })
            }
        )
    }

    render() {
        return (
            <div className="container">
                <Snackbar 
                    anchorOrigin={{vertical:"center", horizontal:"center"}}
                    open={this.state.snackbaropen}
                    autoHideDuration={3000}    
                    onClose={this.snackBarClose}
                    message={<span id='message'>{this.state.snackbarmsg}</span>}
                    action={[
                        <IconButton 
                            key="close" 
                            arial-label="Close" 
                            color="inherit" 
                            onClick={this.snackBarClose}>X</IconButton>  
                    ]}
                />
                <Modal {...this.props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Edit Employee
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
               
                    <Row>
                        <Col>
                            <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="EmployeeID">
                                    <FormLabel>EmployeeID</FormLabel>
                                    <Form.Control 
                                        type="text" 
                                        name="EmployeeID" 
                                        required={true} 
                                        disabled={true}
                                        defaultValue={this.props.empid}
                                    />
                                </Form.Group>

                                <Form.Group controlId="EmployeeName">
                                    <FormLabel>Employee Name</FormLabel>
                                    <Form.Control 
                                        type="text" 
                                        name="EmployeeName" 
                                        required 
                                        placeholder="EmaEmployee Name"
                                        defaultValue={this.props.empname}
                                    />
                                </Form.Group>

                                <Form.Group controlId="Department">
                                    <FormLabel>Department</FormLabel>
                                    <Form.Control 
                                        type="text" 
                                        name="Department" 
                                        required 
                                        placeholder="Department"
                                        defaultValue={this.props.department}
                                    />
                                </Form.Group>
                      
                                <Form.Group controlId="EmailID">
                                    <FormLabel>Email</FormLabel>
                                    <Form.Control 
                                        type="text" 
                                        name="MailID" 
                                        required 
                                        placeholder="Email"
                                        defaultValue={this.props.email}
                                    />
                                </Form.Group>

                                <Form.Group controlId="doj">
                                    <FormLabel>Day of journing</FormLabel>
                                    <Form.Control 
                                        type="text" 
                                        name="DayOfJorning" 
                                        required 
                                        placeholder="DayOfJorning"
                                        defaultValue={this.props.doj}
                                    />
                                </Form.Group>

                                <FormGroup>
                                    <Button variant='success' type="submit">Update Employee</Button>
                                </FormGroup>
                            </Form>
                        </Col>
                    </Row>
                  
                </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default EditEmployeeModal;
