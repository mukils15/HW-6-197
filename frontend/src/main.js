import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './styles.css';
import { useNavigate } from 'react-router-dom';
import Post from './Post'
import AddPost from './AddPost'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

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
                    <hr>
                    </hr>
                    <Button variant="success" className="btn btn-success w-50" onClick={togglePop}> Add new question! </Button>
                    <Button onClick={goLogout} variant="warning" className="btn btn-warning w-50">Click here to log-out</Button>
                    {seen ? <AddPost author={user} toggle={togglePop}></AddPost> : null}
                    <br></br>
                    <br></br>
                    {questionData.map(user => <div><Button value={user} variant="primary" className="btn btn-primary w-100" onClick={() => showQ(user)}> {user.questionText} </Button> <br></br> <br></br> </div>)}
                </div>
                <div className="column">   
                        <h1>
                        Current Question:              
                        </h1>
                        <hr>
                        </hr>
                        <br>
                        </br>
                        <br>
                        </br>
                        <br>
                        </br>
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
                    <h1>
                        You are not logged in yet!
                    </h1>
                    <hr>
                    </hr>
                    <Button variant="danger" className= "btn btn-danger w-100" onClick={goLogin} type="button">Click here to log-in</Button>
                    <br></br>
                    <br></br>
                    {questionData.map(user => <div><Button variant="primary" className="btn btn-primary w-100" value={user} onClick={() => showQ(user)}> {user.questionText} </Button> <br></br> <br></br> </div>)}
                </div>
                <div className="column">
                    <h1>
                        Current Question:
                    </h1>
                        <hr>
                        </hr>
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