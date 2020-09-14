import React from 'react';
import Bucket from './Bucket';

function ListBucket(props) {
    let listOfBucket = props.listOfBucket;
    let itemsOfBucket = listOfBucket.map((val) => (
        <div key={val.bucketName} className="mt-2" >

            <Bucket bucketName={val.bucketName} fetchData={props.fetchData} value={props.value} />

        </div >
    ));

    return (
        <div>
            <p align="left" style={{ font: "message-box", marginTop: "30px" }}><b>LIST OF BUCKETS</b></p>
            <div style={{ display: "flex", flexFlow: "row wrap" }}>

                {itemsOfBucket}
            </div>
        </div>

    )

}

export { ListBucket };