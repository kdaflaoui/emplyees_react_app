import React, { Component } from 'react'
import {Modal, Button, Row, Col, Form, FormLabel, FormGroup} from 'react-bootstrap';
import Snackbar from '@material-ui/core/SnackBar';
import IconButton from '@material-ui/core/IconButton';
 
class AddDepartmentModal extends Component {
    
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
        console.log(event.target.DepartmentName.value);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ DepartmentName : event.target.DepartmentName.value })
        };

        fetch("https://localhost:44330/api/Deparatments", requestOptions)
        .then(response => response.json())
        .then(
            (result) =>{
                this.setState({
                    snackbaropen : true,
                    snackbarmsg : 'Success'
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
                            Add Department
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
               
                    <Row>
                        <Col>
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group controlId="DepartmentName">
                                    <FormLabel>Department Name</FormLabel>
                                    <Form.Control type="text" name="DepartmentName" required placeholder="Department Name"/>
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

export default AddDepartmentModal
