import React from 'react';

import Select from 'react-select';

const colourStyles = {
    control: styles => ({ ...styles, backgroundColor: 'white' }),
    option: (styles) => {
        return {
            ...styles,
            backgroundColor: "white"
        };
    },
};


class BucketList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    _onselect(val) {
        console.log(val)
    }

    render() {

        let opt = this.props.list.map(element => {
            let sample = Object.assign({});
            sample.label = element;
            sample.value = element;
            return sample
        });

        return (
            <Select
                placeholder={"Select Bucket"}
                onChange={this._onSelect}
                options={opt}
                isMulti={true}
                isSearchable={false}
            />
        )
    }

}


export default BucketList;