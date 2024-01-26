import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import React, { useState } from 'react';

function AddCourse() {


    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [price, setPrice] = useState(0);


    return <div>

        <div style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "100px"

        }}>

            <Card variant="outlined" style={{ width: 400, padding: 20 }}>


                <TextField
                    style={{ marginBottom: 8 }}
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }} fullWidth={true} label="Title" variant="outlined" />


                <TextField
                    style={{ marginBottom: 8 }}
                    onChange={(e) => {
                        setDescription(e.target.value);
                    }} fullWidth={true} label="Description" variant="outlined" />


                <TextField
                    style={{ marginBottom: 8 }}
                    onChange={(e) => {
                        setImage(e.target.value);
                    }} fullWidth={true} label="Image link" variant="outlined" />


                <TextField
                    style={{ marginBottom: 8 }}
                    onChange={(e) => {
                        setPrice(e.target.value);
                    }} fullWidth={true} label="Price" variant="outlined" />


                <Button style={{ marginTop: "6px" }}
                    size={'large'} variant="contained"
                    onClick={() => {
                        function callback2(data) {
                            alert("Course added!");
                            console.log(data);

                        }

                        function callback1(res) {
                            res.json().then(callback2)
                        }

                        fetch("http://localhost:3000/admin/courses", {
                            method: "POST",
                            body: JSON.stringify({
                                title: title,
                                description: description,
                                imageLink: image,
                                published: true
                            }),
                            headers: {
                                "Content-Type": "application/json",

                                "Authorization": `Bearer ${localStorage.getItem("token")}`

                            }

                        }).then(callback1)

                    }}>ADD COURSE</Button>


            </Card>

        </div>

    </div>

}
export default AddCourse;