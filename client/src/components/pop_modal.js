import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { setModal, setPopModal, setEditModal, importAllDeliveryData } from '../store/actions'
import { closeNavbar, notify } from './utils/tools';
import * as api from '../api';



const PopModal = () => {

    const { role } = useSelector(state => state.login);
    const { set_pop_modal } = useSelector(state => state.modal);
    const { control: { popTitle, editBtn, deleteBtn, by, shipTo, guestEdit, guestDelete }, chinese } = useSelector(state => state.language)
    const { id } = useSelector(state => state.modal);
    const { data } = useSelector(state => state.deliveryData)
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(setModal(false));
        closeNavbar();
    };

    const deleteDeliveryData = async (event, ID) => {
        event.preventDefault();
        if (role === 'guest') {
            notify(guestDelete)
        } else {
            await api.deleteDeliveryData(ID);
            dispatch(setPopModal(false, null));
            dispatch(importAllDeliveryData());
        }

    }

    const SelectedData = () => {
        if (id === null) {
            return null
        }

        let selectedRecord = data.find(item => item._id === id);

        if (chinese) {
            if (selectedRecord.cn_ !== '') {
                return (
                    <h6>{`${by} ${selectedRecord.courier_} ${shipTo} ${selectedRecord.ship_to} - ${selectedRecord.cn_} - ${selectedRecord.date}`}</h6>
                )
            } else if (selectedRecord.cn_ === '') {
                return (
                    <h5>{`${by} ${selectedRecord.courier_} ${shipTo} ${selectedRecord.ship_to} - ${selectedRecord.date}`}</h5>
                )
            }
        } else {
            if (selectedRecord.cn_ !== '') {
                return (
                    <h6>{`${shipTo} ${selectedRecord.ship_to} ${by} ${selectedRecord.courier_} - ${selectedRecord.cn_} - ${selectedRecord.date}`}</h6>
                )
            } else if (selectedRecord.cn_ === '') {
                return (
                    <h5>{`${shipTo}  ${selectedRecord.ship_to} ${by} ${selectedRecord.courier_} - ${selectedRecord.date}`}</h5>
                )
            }
        }
    }


    const clickEdit = () => {
        if (role === 'guest') {
            notify(guestEdit);
        } else {
            dispatch(setEditModal(true, id));
        }

    }

    return (
        <>
            <Modal show={set_pop_modal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{popTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={(event) => deleteDeliveryData(event, id)}>
                        <SelectedData />

                        <Modal.Footer>

                            <Button
                                variant="secondary"
                                onClick={clickEdit}>
                                {editBtn}
                            </Button>
                            <Button variant="danger"
                                type='submit'>
                                {deleteBtn}
                            </Button>
                        </Modal.Footer>

                    </form>
                </Modal.Body>

            </Modal>
        </>
    )
}

export default PopModal;


