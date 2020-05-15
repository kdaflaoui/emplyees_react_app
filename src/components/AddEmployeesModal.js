import React, { Component } from 'react'
import {Modal, Button, Row, Col, Form, FormLabel, FormGroup} from 'react-bootstrap';
import Snackbar from '@material-ui/core/SnackBar';
import IconButton from '@material-ui/core/IconButton';
 
class AddEmployeesModal extends Component {
    
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
        console.log(event.target.EmployeeName.value);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                EmployeeName : event.target.EmployeeName.value,
                Department : event.target.Department.value,
                MailID : event.target.MailID.value,
                DayOfJorning : event.target.DayOfJorning.value 
            })
        };

        fetch("https://localhost:44330/api/employees", requestOptions)
        .then(response => response.json())
        .then(
            (result) =>{
                this.setState({
                    snackbaropen : true,
                    snackbarmsg : 'The operation was successfuly done'
                })
            },
            (error) =>{
                alert("failed")
            }
        )
    }


    render() {
        return (
            <div className="container">
                <Snackbar 
                    anchorOrigin={{vertical:'center', horizontal:'center'}}
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
                            Add Employee
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
               
                    <Row>
                        <Col>
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group controlId="EmployeeName">
                                    <FormLabel>Employee Name</FormLabel>
                                    <Form.Control type="text" name="EmployeeName" required placeholder="Employee Name"/>
                                </Form.Group>
                                <Form.Group controlId="Department">
                                    <FormLabel>Department</FormLabel>
                                    <Form.Control type="text" name="Department" required placeholder="Department Name"/>
                                </Form.Group>
                                <Form.Group controlId="MailID">
                                    <FormLabel>Mail</FormLabel>
                                    <Form.Control type="text" name="MailID" required placeholder="MailID"/>
                                </Form.Group>
                                <Form.Group controlId="DepartmentName">
                                    <FormLabel>DayOfJorning</FormLabel>
                                    <Form.Control type="text" name="DayOfJorning" required placeholder="Day Of Jorning"/>
                                </Form.Group>
                                <FormGroup>
                                    <Button variant='success' type="submit">Add Department</Button>
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

export default AddEmployeesModal;
