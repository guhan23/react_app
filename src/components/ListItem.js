import React from 'react';
import Todo from './Todo';

function ListItem(props) {
    let value = props.value;
    let items = value.map((val) => (
        <div key={val.todo_id} className="mt-2" >

            <Todo name={val.value} id={val.todo_id} status={val.status} fetchData={props.fetchData} />

        </div>
    ));

    return (
        <div>
            <h4>TO_DO ITEMS</h4>
            {items}
        </div>
    )

}

export { ListItem };