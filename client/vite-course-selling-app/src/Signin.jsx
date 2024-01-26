
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import { Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";


function Signin() {
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    return <div>

        <div style={{
            paddingTop: "150px",
            marginBottom: "10px ",
            display: "flex",
            justifyContent: "center"
        }}>
            <Typography variant={"h6"}>
                Welcome to Coursera. Sign in below

            </Typography>
        </div>


        <div style={{
            display: "flex",
            justifyContent: "center",


        }}>

            <Card variant="outlined" style={{ width: 400, padding: 20 }}>


                <TextField onChange={(e) => {
                    setEmail(e.target.value);

                }} fullWidth = {true} id="outlined-basic" label="Email" variant="outlined" />

                <br /><br />
                <TextField onChange={(e) => {
                    setPassword(e.target.value);
                }} fullWidth = {true} id="outlined-basic" label="Password" variant="outlined" />

                <br /><br />
                <Button
                    size={'large'} variant="contained"
                    onClick={() => {
                        function callback2(data) {
                            localStorage.setItem("token", data.token)
                            window.location ="/courses";

                            console.log(data)
                            
                        }
                        function callback1(res) {
                            res.json().then(callback2)
                        }
                        fetch("http://localhost:3000/admin/login", {
                            method: "POST",
                            body: JSON.stringify({
                                username: email,
                                password: password
                            }),
                            headers: {
                                "content-type": "application/json"
                            }
                        }).then(callback1)
                    }}
                >SIGNIN</Button>


            </Card>

        </div>

    </div>





}

export default Signin;