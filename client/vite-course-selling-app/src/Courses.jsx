import { Typography } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { Card, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Courses() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/admin/courses/", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                console.log(data.courses);
                setCourses(data.courses);
            })
            .catch((error) => {
                console.error("Error fetching courses:", error.message);
            });
    }, []);
    

    return (
        <div style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center"
        }}>
            {
                courses.length > 0 ? (
                    courses.map(course => (
                        <Course key={course.id} course={course} />
                    ))
                ) : (
                    <p>No courses available</p>
                )
            }
        </div>
    );
}



function Course({ course }) {
    const navigate = useNavigate();
    return <Card style={{
        margin: 10,
        width: 300,
        minHeight: 200,
        padding: 20
    }}>
        <Typography textAlign={"center"} variant="h5"> {course.title}</Typography>
        <Typography textAlign={"center"} variant="subtitle1">{course.description}</Typography>
        <img src={course.imageLink} alt="" style={{ width: 300 }} />
        <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
            <Button variant="contained" size="large" onClick={() => {
                navigate("/course/" + course.id);
            }}>Edit

            </Button>
          
          
        </div>
    </Card>;
}

export default Courses;
