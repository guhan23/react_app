import React from 'react';
import { TiTick } from "react-icons/ti";
import { BiRotateRight } from "react-icons/bi";

class Bucket extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bucketName: this.props.bucketName,
            listOfTodo: []
        };
        this.getData = this.getData.bind(this);
    }

    componentDidMount() {
        this.getData()
        this.timer = setInterval(this.getData(), 3000)
    }

    componentDidUpdate(prevProps, prevState) {

        if (prevProps.value !== this.props.value) {
            this.getData();
        }
    }

    getData() {
        fetch("http://localhost:8000/getBucketTodo/" + this.state.bucketName,{referrerPolicy:"origin"})
            .then(res => res.json())
            .then(data => {
                this.setState({ listOfTodo: data });
                console.log(data)
            })
            .catch(err => { console.error(err) })
    }

    render() {
        let val = (this.state.listOfTodo.length > 0 ? this.state.listOfTodo : null);

        if (val) {
            let items = val.map(item => {
                if (item.status === "pending") {
                    return (
                        <li className="list-group-item">{<BiRotateRight title={item.status} />}{' '}{item.value}</li>
                    )
                }
                else if (item.status === "done") {
                    return (
                        <li className="list-group-item">{<TiTick title={item.status} />}{' '}{item.value}</li>
                    )
                }
                else {
                    return (
                        <li className="list-group-item">{item.value}</li>
                    )
                }
            });
            return (

                <div className="card" style={{ width: "18rem", display: "inline-block" }}>
                    <div className="card-header" style={{ backgroundColor: "lightgreen" }}>
                        <emp> {this.state.bucketName}</emp>
                    </div>
                    <ul className="list-group list-group-flush">
                        {items}
                    </ul>

                </div>

            )

        }
        else {
            return (
                <div >

                </div>
            )
        }
    }
};


export default Bucket;
