import { Card, Grid } from "@mui/material";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { Typography, TextField, Button } from "@mui/material";


function Course() {
    let { courseId } = useParams();
    const [course, setCourse] = useState("");

    useEffect(() => {
        const numericCourseId = parseInt(courseId);
        fetch(`http://localhost:3000/admin/course/${numericCourseId}`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                setCourse(data);
             
            })
            .catch(error => {
                console.error("Error fetching course:", error.message);
            });
    }, []);


    return <div>

        <GrayTopper />
        <Grid container>
            <Grid item lg={8} md={12} sm={12}>
                <UpdateCard course={course} setCourse={setCourse} />
            </Grid>
            <Grid item lg={4} md={12} sm={12}>
                <CourseCard course={course} />
            </Grid>
        </Grid>
    </div>
}

function GrayTopper(props) {
    return <div style={{ height: 250, background: "#212121", top: 0, width: "100vw", zIndex: 0, marginBottom: -250 }}>
        <div style={{ height: 250, display: "flex", justifyContent: "center", flexDirection: "column" }}>
            <div>
                <Typography style={{ color: "white", fontWeight: 600 }} variant="h3" textAlign={"center"}>
                    {props.title}
                </Typography>
            </div>
        </div>
    </div>
}

function UpdateCard({ course, setCourse }) {
    const [title, setTitle] = useState(course?.title || "");
    const [description, setDescription] = useState(course?.description || "");
    const [image, setImage] = useState(course?.imageLink || "");
    const [price, setPrice] = useState(course?.price || 0);

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <Card variant={"outlined"} style={{ maxWidth: 600, marginTop: 200 }}>
                <div style={{ padding: 20 }}>
                    <Typography style={{ marginBottom: 10 }}>Update course details</Typography>
                    <TextField
                        value={title}
                        style={{ marginBottom: 10 }}
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                        fullWidth={true}
                        label="Title"
                        variant="outlined"
                    />

                    <TextField
                        value={description}
                        style={{ marginBottom: 10 }}
                        onChange={(e) => {
                            setDescription(e.target.value);
                        }}
                        fullWidth={true}
                        label="Description"
                        variant="outlined"
                    />

                    <TextField
                        value={image}
                        style={{ marginBottom: 10 }}
                        onChange={(e) => {
                            setImage(e.target.value);
                        }}
                        fullWidth={true}
                        label="Image link"
                        variant="outlined"
                    />
                    <TextField
                        value={price}
                        style={{ marginBottom: 10 }}
                        onChange={(e) => {
                            setPrice(e.target.value);
                        }}
                        fullWidth={true}
                        label="Price"
                        variant="outlined"
                    />

                    <Button
                        variant="contained"
                        onClick={async () => {
                            try {
                                const response = await fetch(`http://localhost:3000/admin/courses/${course.id}`, {
                                    method: "PUT",
                                    headers: {
                                        "Content-type": "application/json",
                                        "Authorization": "Bearer " + localStorage.getItem("token")
                                    },
                                    body: JSON.stringify({
                                        title: title,
                                        description: description,
                                        imageLink: image,
                                        published: true,
                                        price
                                    })
                                });

                                if (!response.ok) {
                                    throw new Error(`HTTP error! Status: ${response.status}`);
                                }

                                let updatedCourse = {
                                    id: course?.id,
                                    title: title,
                                    description: description,
                                    imageLink: image,
                                    price
                                };
                                setCourse(updatedCourse);
                            } catch (error) {
                                console.error("Error updating course:", error.message);
                            }
                        }}
                    > Update course</Button>
                </div>
            </Card>
        </div>
    );
}

function CourseCard(props) {
    const course = props.course;
   
    return <div style={{ display: "flex", marginTop: 50, justifyContent: "center", width: "100%" }}>
        <Card style={{
            margin: 10,
            width: 350,
            minHeight: 200,
            borderRadius: 20,
            marginRight: 50,
            paddingBottom: 15,
            zIndex: 2
        }}>
            <img src={course?.imageLink} style={{ width: 350 }} ></img>
            <div style={{ marginLeft: 10 }}>
                <Typography variant="h5">{course?.title}</Typography>
                <Typography variant="subtitle2" style={{ color: "gray" }}>
                    Price
                </Typography>
                <Typography variant="subtitle1">
                    <b>Rs {course?.price} </b>
                </Typography>
            </div>
        </Card>
    </div>
}
export default Course;



