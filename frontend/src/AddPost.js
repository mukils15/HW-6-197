import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddPost = (props) => {
    const [text, setText] = useState('');

    const submitQ = async () => {
        var author = props.author;
        const { data } = await axios.post('/api/questions/add', null, { params : {author: author, questionText: text}});
        if (data === "Question added!"){
            props.toggle();
        } else {
            alert("Could not add");
        }
    }

    return (
        <div className="modal">
            <div className="modal_content">
                <h1> Submit a new question! </h1>
                <hr>
                </hr>
                <label for="question"><b>Add Question</b></label>
                <input onChange={e=> setText(e.target.value)} type="text" placeholder="Enter question" name ="question" required></input>
                <br>
                </br>
                <div className = "clearfix">
                    <button onClick={submitQ} type = "button" className="signupbtn">Submit Questions</button>
                </div>
            </div>
        </div>
    )

}

export default AddPost;