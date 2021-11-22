import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './styles.css';
import { useNavigate } from 'react-router-dom';
import Post from './Post'
import AddPost from './AddPost'


const MainPage = () => {
    const [loggedIn, setLogged] = useState(false);
    const [questionData, setQues] = useState([]);
    const [user, setUser] = useState('');
    const [currQ, setQ] = useState(null);
    const [seen, setSeen] = useState(false);
    let navigate = useNavigate();

    useEffect(async () =>{
        const { data: questions } = await axios.get('/api/questions/');
        setQues(Object.values(questions));
        const intervalID = setInterval(async () => {
            const { data: questions } = await axios.get('/api/questions/');
            setQues(Object.values(questions));
        }, 2000)
        const { data: isLogged } = await axios.get('/account/isloggedin');
        if (isLogged !== "nope lol"){
            setLogged(true);
            setUser(isLogged);
        }
        return () => clearInterval(intervalID)
    }, [])

    const goLogin = async () => {
       navigate("/login");
    }

    const goLogout = async () => {
        const {data: result} = await axios.post('/account/logout');
        const { data: questions } = await axios.get('/api/questions/');
        setQues(Object.values(questions));
        if (result == "Logged out!"){
            setLogged(false);
        } else {
            alert("Could not log out");
        }
     }

    const showQ = async (user) => {
        console.log("ewofew");
        setQ(user);
    }

    
    const handleAdd = async () => {
        const { data: questions } = await axios.get('/api/questions/');
        setQues(Object.values(questions));
    }

    const togglePop = () => {
        var opp = !seen;
        setSeen(opp);
    }


    if (loggedIn){
        return (
            <div className="row">
                <div className="column">
                    <h1>
                        Welcome, {user}!
                    </h1>
                    <button onClick={togglePop} type="button"> Add new question! </button>
                    {seen ? <AddPost author={user} toggle={togglePop}></AddPost> : null}
                    <br></br>
                    <br></br>
                    {questionData.map(user => <div><button value={user} onClick={() => showQ(user)} type="button"> {user.questionText} </button> <br></br> <br></br> </div>)}
                </div>
                <div className="column">
                    <button onClick={goLogout} type="button">Click here to log-out</button>
                    <h1>
                        Current Question:
                        </h1>
                        {currQ ? (
                            <Post user={currQ}  handle={handleAdd} answer={true}/>
                        ) : (
                            <div>
                                No question selected!
                            </div>
                        )}
                </div>
            </div>
        )
    } else {
        return (
            <div className="row">
                <div className="column">
                    <button onClick={goLogin} type="button">Click here to log-in</button>
                    <br></br>
                    <br></br>
                    {questionData.map(user => <div><button value={user} onClick={() => showQ(user)} type="button"> {user.questionText} </button> <br></br> <br></br> </div>)}
                </div>
                <div className="column">
                    <h1>
                        Current Question:
                        </h1>
                        {currQ ? (
                            <Post user={currQ}  handle={handleAdd} answer={false}/>
                        ) : (
                            <div>
                                No question selected!
                            </div>
                        )}
                </div>
            </div>
        )
    }
}

export default MainPage;