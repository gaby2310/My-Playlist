import React, {useContext, useState} from 'react';
import {AppContext} from '../context/context';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Login = () => {
    const {handleChangeRedirectLS} = useContext(AppContext);
    const [userName, handleChangeUserName] = useState('');
    const [password, handleChangePassword] = useState('');
    const [loading, setLoading] = useState(false);

    class User {
        constructor(name, password) {
            this.name = name;
            this.password= password;
        }
    }

    const grabUser = () => {
        return new Promise((resolve, reject) => {
            setTimeout(()  => {
                resolve(JSON.parse(localStorage.getItem('user')));
            }, 1300);
        } )
    };

    const userLogin = (name, password) => {
        const newUser = new User(name, password);
        localStorage.setItem('user', JSON.stringify(newUser));

        setLoading(true);

grabUser().then (
            user => {
                if ((user.name !== undefined) && (user.name !== '')) {
                    localStorage.setItem('redirectLS', JSON.stringify(true));
                    handleChangeRedirectLS(true)
                } else {
                    localStorage.setItem('redirectLS', JSON.stringify(false));
                    handleChangeRedirectLS(false)
                }
            }
        ). then (() => {
            setLoading(false);
        } )
    };

    return (
        <div className="wrapper">
            <div className="card">
                <Form className="form">
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control type="text" placeholder="User"
                                      onChange={e => handleChangeUserName(e.target.value)}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" placeholder="Password"
                                      onChange={e => handleChangePassword(e.target.value)}/>
                    </Form.Group>
                    <Button
                        variant="primary"
                        type="submit"
                        disabled={loading}
                        size="lg" block
                        onClick={(e => {
                            e.preventDefault();
                            userLogin(userName, password)
                        })
                        }
                    >
                        {loading ? 'Loading…' : 'LogIn'}
                    </Button>
                </Form>
            </div>
        </div>
    ); 


};

export default Login;