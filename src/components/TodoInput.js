import React from "react";
import {
    InputGroup,
    InputGroupAddon,
    Input,
    Button,
} from "reactstrap";
import { MdAddCircle } from "react-icons/md";

class TodoInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputVal: "",
        };
        this.onInputChange = this.onInputChange.bind(this);
        this.onAdd = this.onAdd.bind(this);
    }

    onInputChange(e) {
        this.setState({ inputVal: e.target.value });
    }

    onAdd = (val) => {
        this.props.addTodo(val);
        this.setState({ inputVal: "" });
    };

    render() {
        let val = this.state.inputVal !== "" ? this.state.inputVal : null;

        return (
            <div style={{ width: "500px" }}>
                <InputGroup>
                    <Input
                        value={this.state.inputVal}
                        type="text"
                        className="border-dark"
                        placeholder={"Enter to do..."}
                        onChange={this.onInputChange}
                    />
                    <InputGroupAddon addonType="append">
                        <Button className="btn border-dark" onClick={() => this.onAdd(val)}><MdAddCircle /></Button>
                    </InputGroupAddon>
                </InputGroup>

            </div>
        );
    }
}

export default TodoInput;
