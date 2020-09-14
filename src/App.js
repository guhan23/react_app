import React, { useState } from "react";
import render from "react-dom";
import BucketInput from './components/BucketInput';
import BucketList from './components/BucketList';
import "./App.css";
import TodoInput from "./components/TodoInput";
import { ListItem } from './components/ListItem';
import { Container, Row, Col, InputGroup, InputGroupAddon, Input, Button, Alert, Card, CardText, Badge } from "reactstrap";
import { v4 as uuidv4 } from 'uuid';

import { MdAddCircle } from "react-icons/md";
import BucketTodoInput from "./components/BucketTodoInput";
import { ListBucket } from "./components/ListBucket";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listOfTodo: [],
            listOfBucket: []
        };

        this.addingTodo = this.addingTodo.bind(this);
        this.addBucket = this.addBucket.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.getTodoData = this.getTodoData.bind(this);
    }

    componentDidMount() {

        this.fetchData();

    }

    componentDidUpdate(prevProps, prevState) {

        if (prevProps.value !== this.props.value) {
            this.getTodoData();
        }
    }


    getTodoData() {
        fetch('http://localhost:8000/getTodo')
            .then(res => res.json())
            .then(result => {
                this.setState({ listOfTodo: result })
                console.log(result)
            })
            .catch(err => {
                console.log(err);
            })
    }

    fetchData() {

        fetch('http://localhost:8000/getTodo')
            .then(res => res.json())
            .then(result => {
                this.setState({ listOfTodo: result })
                console.log(result)
            })
            .catch(err => {
                console.log(err);
            })
        fetch('http://localhost:8000/getBucketList')
            .then(res => res.json())
            .then(result => {
                console.log(result)
                this.setState({ listOfBucket: result })
            })
            .catch(err => {
                console.log(err);
            })
    }

    addingTodo(val) {
        // let temp = [];
        if (val) {
            let newTodo = {
                todo_id: uuidv4(),
                bucket: "None",
                value: val,
                status: "pending"
            };
            //   temp.push(newTodo);
            fetch('http://localhost:8000/addTodo', {
                method: 'POST',
                body: JSON.stringify(newTodo),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                .then(res => {
                    this.fetchData();
                })
                .catch(err => {
                    console.log(err)
                })
        }
        // if (temp.length > 0) {
        //     this.setState(prevState => ({
        //         listOfTodo: [...prevState.listOfTodo, ...temp]
        //     }));
        // }
    }

    addBucket(val) {
        // let temp = [];
        // // let obj = Object.assign({});
        // //   obj.bucket_id = uuidv4();
        // //   obj.bucket_name = val;

        // // temp.push(val);
        // // this.setState({
        // //     listOfBucket: [...this.state.listOfBucket, val]
        // // })

        if (val) {
            fetch('http://localhost:8000/addBucket', {
                method: 'POST',
                body: JSON.stringify({ bucketName: val }),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                .then(res => { })
                .catch(err => {
                    console.log(err)
                })
        }

    }

    addBucketTodo(val, bucketName) {

        if (val) {
            let newTodo = {
                todo_id: uuidv4(),
                bucket: bucketName,
                value: val,
                status: "pending"
            };
            fetch('http://localhost:8000/addTodo', {
                method: 'POST',
                body: JSON.stringify(newTodo),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                .then(res => { })
                .catch(err => {
                    console.log(err)
                })
            this.fetchData();
            console.log("fetch from bucket")
        }
    }

    render() {

        return (
            <div className='App'>

                <Container fluid={true}>
                    <Row >
                        <Col xs="6" >
                            <div align="center" style={{ padding: "50px 0px 50px 0px" }}>
                                <Card body outline color="dark" style={{ backgroundColor: "inherit" }}>
                                    <div >
                                        <h2 style={{ margin: "0px 0px 50px 0px", fontFamily: "sans-serif" }}>
                                            <Button disabled style={{ width: "500px" }} color="dark" >
                                                Add <strong> "TO_DO" </strong>items here !!
                                            </Button>
                                        </h2>
                                        <TodoInput addTodo={this.addingTodo} />
                                    </div>
                                </Card>
                                <div  >
                                    {this.state.listOfTodo.length > 0 ? (

                                        <div style={{ marginTop: "50px" }}>
                                            <ListItem value={this.state.listOfTodo} fetchData={this.fetchData} />
                                        </div>
                                    ) : (

                                            <div className="text-center">
                                                {/* <p id="out"> </p>
                                                <h2>NO ITEMS TO DISPLAY</h2> */}
                                            </div>
                                        )}
                                </div>
                            </div>
                        </Col>

                        <Col xs="6">

                            <div align="center" style={{ padding: "50px 0px 50px 0px" }}>
                                <Card body outline color="dark" style={{ backgroundColor: "inherit" }}>
                                    <div >
                                        <h2 style={{ margin: "0px 0px 50px 0px", fontFamily: "sans-serif" }}>
                                            <Button disabled style={{ width: "500px" }} color="dark" >
                                                Create <strong> Bucket types </strong> here !!
                                            </Button>
                                        </h2>
                                        <BucketInput addBucket={this.addBucket} />
                                    </div>
                                </Card>
                            </div>
                            <Container fluid={true}>
                                <Row>
                                    <div style={{ width: "100%", marginTop: "-30px" }}>
                                        <BucketTodoInput list={this.state.listOfBucket} addBucketTodo={this.addBucketTodo} fetchData={this.fetchData} />
                                    </div>
                                </Row>
                                <Row>
                                    <div style={{ width: "100%" }}>
                                        <ListBucket value={this.state.listOfTodo} listOfBucket={this.state.listOfBucket} fetchData={this.fetchData} />
                                    </div>
                                </Row>
                            </Container>

                        </Col>
                    </Row>
                </Container >

            </div >
        );
    }
}

export default App;
