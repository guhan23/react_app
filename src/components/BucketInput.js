import React from "react";
import {
    InputGroup,
    InputGroupAddon,
    ButtonGroup,
    Input,
    Button,
} from "reactstrap";
import { MdAddCircle } from "react-icons/md";

class BucketInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputBucket: "",
        };
        this.onInputChange = this.onInputChange.bind(this);
        this.onAdd = this.onAdd.bind(this);
    }

    onInputChange(e) {
        this.setState({ inputBucket: e.target.value });
    }

    onAdd = (val) => {
        this.props.addBucket(val.toLowerCase());
        this.props.fetchData();
        this.setState({ inputBucket: "" });
    };
    onReset = () => {

        fetch("http://localhost:8000/deleteBucketList", {
            method: 'DELETE',
            referrerPolicy:"origin"
        })
            .then(res => {
                this.props.fetchData();
            })
            .catch(err => { console.log(err) })


    }

    render() {
        let val = this.state.inputBucket !== "" ? this.state.inputBucket : null;

        return (
            <div style={{ width: "500px" }}>
                <InputGroup>
                    <Input
                        value={this.state.inputBucket}
                        type="text"
                        className="border-dark"
                        placeholder={"Add bucket"}
                        onChange={this.onInputChange}
                    />
                    <InputGroupAddon addonType="append">
                        <Button className="btn border-dark" onClick={() => this.onAdd(val)}><MdAddCircle /></Button>
                    </InputGroupAddon>
                    <InputGroupAddon addonType="append">
                        <Button className="btn border-dark" onClick={() => this.onReset()}>ResetList</Button>
                    </InputGroupAddon>
                </InputGroup>

            </div>
        );
    }
}

export default BucketInput;
