import React, { useRef } from 'react';
import { Navbar, Container, Offcanvas, Nav, FormControl, Form, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { pickLanguage, setLogout, setModal } from '../store/actions';
import { closeNavbar, tableSearch } from './utils/tools';
import cookie from 'react-cookies';
import { useNavigate } from 'react-router-dom';



const Header = () => {

    const { chinese, control: { title, add, choosenLanguage, logout, filter } } = useSelector(state => state.language);
    const { login } = useSelector(state => state.login);

    const searchField = useRef();

    const dispatch = useDispatch();

    let navigate = useNavigate();

    const changeLanguage = (event) => {
        event.preventDefault();
        if (chinese) {
            dispatch(pickLanguage(false));
        } else {
            dispatch(pickLanguage(true));
        }
        closeNavbar();
    }

    const logoutFn = () => {
        cookie.remove('token');
        navigate('/');
        dispatch(setLogout());
        closeNavbar();
    }

    const onModal = () => {
        dispatch(setModal(true))
    }

    return (
        <Navbar bg="light" expand={false} >

            <Container fluid>
                <LinkContainer to='/record'>
                    <Navbar.Brand>{title}</Navbar.Brand>
                </LinkContainer>

                {
                    login ?
                        <Form className='filter-form'>
                            <input
                                id='myInput'
                                ref={searchField}
                                onKeyUp={() => tableSearch(searchField.current.value)}
                                placeholder={filter} aria-label="Filter" type="search" className="form-control filter" />
                        </Form>
                        : null
                }


                <Navbar.Toggle aria-controls="offcanvasNavbar" />

                <Navbar.Offcanvas
                    id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel"
                    placement="end"
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id="offcanvasNavbarLabel"
                            onClick={(event) => changeLanguage(event)}
                        >{choosenLanguage}</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 pe-3">

                            {
                                login ?
                                    <>
                                        <Nav.Link onClick={onModal} >{add}</Nav.Link>
                                        <Nav.Link onClick={logoutFn}>{logout}</Nav.Link>
                                    </>
                                    :
                                    null

                            }


                        </Nav>

                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    )
}

export default Header;