import React, { useState, useRef, useEffect } from 'react';
import { AiFillEyeInvisible } from "@react-icons/all-files/ai/AiFillEyeInvisible";
import { AiFillEye } from '@react-icons/all-files/ai/AiFillEye';
import { useSelector, useDispatch } from 'react-redux';
import { loginAction, resetLoginTitle, onSpinner, checkLogin } from '../store/actions';
import { Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    let username = useRef();
    let password = useRef();

    const dispatch = useDispatch();


    const [hide, setHide] = useState(true);
    const { control: { title, passwordPlaceholder, usernamePlaceholder, passwordLogin, loginText }, chinese } = useSelector(state => state.language);
    const { message, image, spinner } = useSelector(state => state.login);

    let navigate = useNavigate();



    useEffect(() => {
        dispatch(checkLogin((link) => {
            if (link === '/record') {
                // console.log('keep this page');
                navigate(link);
            }
            if (link === '/') {
                // console.log('go to home page')
                navigate(link);
            }
        }));
    }, [dispatch, navigate])

    const toggleHide = () => {
        if (hide) {
            setHide(false);
        } else {
            setHide(true);
        }
    }

    const submitLogin = async (event) => {
        event.preventDefault();

        dispatch(loginAction(username.current.value, password.current.value, chinese, (bool) => {
            if (bool) {
                navigate('/record');
            }
        }));
        dispatch(onSpinner())
        username.current.value = '';
        password.current.value = '';

        setTimeout(() => {
            dispatch(resetLoginTitle())
        }, 7000)
    }

    return (
        <main className="form-signin">
            <form onSubmit={(event) => submitLogin(event)}>

                {
                    spinner ?
                        <Spinner animation="border" role="status" className="login-spinner">
                            <span className="visually-hidden"  >Loading...</span>
                        </Spinner>
                        :
                        <img className="mb-4 login-img" src={image} alt="login-img" />

                }




                {
                    message === null ?
                        <h1 className="h3 mb-3 fw-normal">
                            {passwordLogin}
                        </h1>
                        :
                        <h1 className="h3 mb-3 fw-normal">
                            {message}
                        </h1>
                }





                <div className="form-floating">
                    <input
                        autoComplete='on'
                        ref={username}
                        required="required"
                        className="form-control mb-2 input-frame  username"
                        type='text'
                        placeholder={usernamePlaceholder}
                    />
                    <label htmlFor="floatingInput">{usernamePlaceholder}</label>
                </div>


                <div className="form-floating">
                    <input
                        ref={password}
                        autoComplete='current-password'
                        required="required"
                        className="form-control mb-2 input-frame  password"
                        placeholder={passwordPlaceholder}
                        type={`${hide ? 'password' : 'text'}`}
                    />
                    <span className="eye" onClick={toggleHide}>
                        {
                            !hide ? <AiFillEye /> : <AiFillEyeInvisible />
                        }
                    </span>
                    <label htmlFor="floatingInput">{passwordPlaceholder}</label>

                </div>

                <button type="submit" className='mb-1  w-100 btn btn-lg btn-primary'>
                    {loginText}
                </button>

                <p className="mt-5 mb-3 text-muted">&copy; {`${title} – 2022`}</p>
            </form>
        </main>
    )
}

export default Login;