import React, { useState, useEffect } from 'react'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import {
    Link
  } from "react-router-dom";

  import axios from 'axios'

const Post = (props) => {
    const [ans, setAns] = useState(props.user.answer);
    const [finAns, setFinAns] = useState(props.user.answer);
    const [sho, setShow] = useState(props.answer);

    useEffect(async () =>{
        setAns(props.user.answer);
        setFinAns(props.user.answer);
        setShow(props.answer);
        props.handle();
    }, [props.user])

    const answer = async () => {
        const { data } = await axios.post('/api/questions/answer', null, { params : {_id: props.user._id, answer: ans}});
        if (data == "Answered"){
            setFinAns(ans);
        } else {
            alert("Mistake");
        }
    }

    if (sho){
        return (
            <div className="container">
                <br>
                </br>
                <h1>
                {props.user.questionText}
                </h1>
               <br>
               </br>
               Author:
               <br>
               </br>
               {props.user.author}
               <br>
               </br>
               <br>
               </br>
               Answer:
               <br>
               </br>
               {finAns}
                <div>
                        <hr>
                        </hr>
                        <label for="answer"><b>Answer</b></label>
                        <br>
                        </br>
                        <input onChange={e=> setAns(e.target.value)} type="text" placeholder="Enter answer" name ="answer" required></input>
                        <br>
                        </br>
                        <div className = "clearfix">
                            <button onClick={answer} type = "button" className="signupbtn">Post Answer</button>
                        </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="container">
                <br>
                </br>
                <h1>
                {props.user.questionText}
                </h1>
               <br>
               </br>
               Author:
               <br>
               </br>
               {props.user.author}
               <br>
               </br>
               <br>
               </br>
               Answer:
               <br>
               </br>
               {finAns}
            </div>
        )
    }
    

}

export default Post;