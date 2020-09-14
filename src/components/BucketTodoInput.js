import React from "react";

import {
    InputGroup,
    InputGroupAddon, InputGroupButtonDropdown,
    ButtonGroup,
    Input,
    Button,
} from "reactstrap";
import Select from 'react-select';

import { MdAddCircle } from "react-icons/md";

const colourStyles = {
    control: styles => ({ ...styles, width: "180px", backgroundColor: 'white' }),
    option: (styles) => {
        return {
            ...styles,
            backgroundColor: "white"
        };
    },
};

class BucketTodoInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputTodo: "",
            list: props.list,
            select: []
        };
        this.onInputChange = this.onInputChange.bind(this);
        // this.onAdd = this.onAdd.bind(this);
    }

    onInputChange(e) {
        this.setState({ inputTodo: e.target.value });
    }

    onAdd = (val, bucket) => {
        this.props.addBucketTodo(val, bucket);
        this.props.fetchData();
        this.setState({ select: [], inputTodo: "" });

    };

    _onSelect = select => {
        this.setState({ select });
    };

    render() {


        if (this.props.list.length > 0 && this.props.list !== null && this.props.list !== undefined) {

            let opt = this.props.list.map(element => {
                let sample = Object.assign({});
                sample.label = element.bucketName;
                sample.value = element.bucketName;
                return sample
            });
            return (
                <div>
                    <p align="left" style={{ font: "message-box" }}><b>ADD TODO IN BUCKETS :</b></p>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <Select
                            placeholder={"Select Bucket"}
                            onChange={this._onSelect}
                            value={this.state.select}
                            options={opt}
                            isMulti={false}
                            isSearchable={false}
                            styles={colourStyles}
                            isClearable={true}
                        />
                        <InputGroup>
                            <Input
                                value={this.state.inputTodo}
                                type="text"
                                className="border-dark"
                                placeholder={"Enter to do..."}
                                onChange={this.onInputChange}
                            />
                            <InputGroupAddon addonType="append">
                                <Button className="btn border-dark" onClick={() => this.onAdd(this.state.inputTodo, this.state.select.value)}><MdAddCircle /></Button>
                            </InputGroupAddon>
                        </InputGroup>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <Select
                        placeholder={"Select Bucket"}
                        onChange={this._onSelect}
                        isMulti={false}
                        isSearchable={false}
                        styles={colourStyles}
                        isClearable={true}
                    />
                </div>
            )
        }

    }
}

export default BucketTodoInput;
