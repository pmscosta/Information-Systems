import React from "react";
import axios from "axios";

class UploadFile extends React.Component {

    handleUploadFile = (event) => {
        const data = new FormData();
        data.append('xmlFile', event.target.files[0]);

        axios.post('/api/saft', data).then((response) => {
            console.log(response); // do something with the response
        });
    }

    render() {
        return (
                <input type="file" name="xmlFile" onChange={this.handleUploadFile} />
        );
    }
}

export default UploadFile;

