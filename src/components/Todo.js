import React from "react";
import { InputGroup, InputGroupAddon, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { MdDelete, MdEdit } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { BiRotateRight } from "react-icons/bi";

class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputVal: this.props.name,
            id: this.props.id,
            status: this.props.status,
            openModel: false,
            editedInput: this.props.name,
        };
        this.onInputChange = this.onInputChange.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
        this.onEditChange = this.onEditChange.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        if (this.state.id) {
            fetch('/getTodo/' + this.state.id,{referrerPolicy:"origin"})
                .then(res => res.json())
                .then(result => {
                    this.setState({ status: result.status });
                    this.setState({ inputVal: result.value });
                })
                .catch(err => {
                    console.log(err)
                })
        }

    }

    onInputChange(e) {
        this.setState({ inputVal: e.target.value });
    }

    toggleEdit() {
        this.setState({ openModel: !this.state.openModel });
    }

    onEditChange(e) {
        this.setState({ editedInput: e.target.value });
    }

    onEditSave(val, id, ) {
        if (val) {

            fetch('/editTodo', {
                method: 'PUT',
                body: JSON.stringify({ editId: id, editVal: val }),
                headers: {
                    'Content-Type': 'application/json'
                },
                referrerPolicy:"origin"
            })
                .then(res => {
                    this.toggleEdit();
                    this.getData();
                    this.props.fetchData();
                })
                .catch(err => {
                    console.log(err);
                    this.toggleEdit();
                    this.props.fetchData();
                })

        }
        else {
            alert("Enter valid text !")
        }
    }

    editStatus(id, stat) {
        let changedStatus = "";
        if (stat.toLowerCase() === "done") {
            changedStatus = "pending";
        }
        else if (stat.toLowerCase() === "pending") {
            changedStatus = "done";
        }
        else {
            changedStatus = "pending";
        }

        if (id) {

            fetch('/editStatusTodo', {
                method: 'PUT',
                body: JSON.stringify({ editId: id, editStatus: changedStatus }),
                headers: {
                    'Content-Type': 'application/json'
                },
                referrerPolicy:"origin"
            })
                .then(res => {
                    this.getData();
                    this.props.fetchData();
                })
                .catch(err => {
                    console.log(err);
                })
        }
        else {
            alert("Enter valid text !")
        }
    }

    deleteItem(id) {
        if (id) {
            fetch('/deleteTodo', {
                method: 'DELETE',
                body: JSON.stringify({ deleteId: id }),
                headers: {
                    'Content-Type': 'application/json'
                },
                referrerPolicy:"origin"
            })
                .then(res => {
                    this.props.fetchData();
                })
                .catch(err => {
                    console.log(err);
                })

        }
        else {
            alert("Not able to delete !")
        }

    }

    render() {
        let modalOpen = this.state.openModel;

        let editVal = (this.state.editedInput !== "" ? this.state.editedInput : null);

        return (
            <div style={{ width: "400px" }}>
                <InputGroup>

                    <InputGroupAddon addonType="prepend">
                        {(this.state.status.toLowerCase() === "done") ?
                            (
                                <Button className="btn btn-success" onClick={() => this.editStatus(this.state.id, this.state.status)}>
                                    <TiTick title={this.state.status} />
                                </Button>) :

                            (<Button className="btn btn-warning" onClick={() => this.editStatus(this.state.id, this.state.status)}>
                                <BiRotateRight title={this.state.status} />
                            </Button>)
                        }

                    </InputGroupAddon>

                    <Input disabled={true} className="border-dark " placeholder={this.state.inputVal} />

                    {/* <Modal isOpen={modalOpen} modalTransition={{ timeout: 700 }} backdropTransition={{ timeout: 1300 }}> */}

                    <Modal isOpen={modalOpen} fade={false}>
                        <ModalHeader >Edit TO DO</ModalHeader>
                        <ModalBody>
                            <Input type="textarea" value={this.state.editedInput}
                                onChange={this.onEditChange} />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={() => this.onEditSave(editVal, this.state.id)}>Save</Button>{' '}
                            <Button color="secondary" onClick={this.toggleEdit}>Cancel</Button>{' '}
                        </ModalFooter>
                    </Modal>

                    <InputGroupAddon addonType="append">
                        <Button id={this.state.id} title={"Edit"} className="rounded border-dark  " color="secondary" onClick={this.toggleEdit}><MdEdit /></Button>
                    </InputGroupAddon>{' '}
                    <InputGroupAddon addonType="append">
                        <Button id={this.state.id} title={"Delete"} className="rounded border-dark " color="secondary" onClick={() => this.deleteItem(this.state.id)}><MdDelete /></Button>
                    </InputGroupAddon>
                </InputGroup>
            </div >
        );
    }
}

export default Todo;
