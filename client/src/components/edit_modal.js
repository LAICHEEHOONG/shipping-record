import React, { useRef } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { setModal, importAllDeliveryData } from '../store/actions'
import { closeNavbar, billToArrEngine, remarkToArrEngine, arrayConvertToString } from './utils/tools';
import * as api from '../api';



const EditModal = () => {


  const { set_edit_modal, id } = useSelector(state => state.modal);
  const {
    ship_to,
    carton_,
    cn_,
    courier_,
    do_,
    remark_,
    weight_,
    wxr_
  } = useSelector(state => state.selectedData);
  const { control: {
    shipTo,
    courier,
    cn,
    carton,
    weight,
    deliveryOrder,
    wxr,
    remark,
    closeBtn,
    saveBtn,
  } } = useSelector(state => state.language);


  const dispatch = useDispatch();

  let edit_ship_to = useRef();
  let edit_carton_ = useRef();
  let edit_cn_ = useRef();
  let edit_courier_ = useRef();
  let edit_do_ = useRef();
  let edit_remark_ = useRef();
  let edit_weight_ = useRef();
  let edit_wxr_ = useRef();

  // 将 selected_data.js 的数据 转换为 ref
  const selectedDataToRef = async () => {
    edit_ship_to.current.value = ship_to;
    edit_carton_.current.value = carton_;
    edit_cn_.current.value = cn_;
    edit_courier_.current.value = courier_;
    edit_do_.current.value = arrayConvertToString(do_);
    edit_remark_.current.value = arrayConvertToString(remark_);
    edit_weight_.current.value = weight_;
    edit_wxr_.current.value = arrayConvertToString(wxr_);
    // console.log('uploadSelectedDataToForm')
  }

  const executeDataUplad = () => {
    if (set_edit_modal) {
      selectedDataToRef();
    }
  }
  setTimeout(() => {
    executeDataUplad();
  }, 100)


  const handleClose = () => {
    dispatch(setModal(false));
    closeNavbar()
  };

  const submitEditData = (event) => {
    event.preventDefault();
    let newData = {
      _id: id,
      carton_: edit_carton_.current.value,
      ship_to: edit_ship_to.current.value,
      courier_: edit_courier_.current.value,
      cn_: edit_cn_.current.value,
      weight_: edit_weight_.current.value,
      do_: billToArrEngine(edit_do_.current.value),
      wxr_: billToArrEngine(edit_wxr_.current.value),
      remark_: remarkToArrEngine(edit_remark_.current.value)
    }
    api.saveEditData(newData);
    handleClose();
    setTimeout(() => {
      dispatch(importAllDeliveryData());
    }, 100)
   
  }

  return (
    <>
      <Modal show={set_edit_modal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>编辑运输表格</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={submitEditData}>
            {/* 运送到。 */}
            <div className="form-floating">
              <input
                name='ship_to'
                autoComplete='on'
                required="required"
                className="form-control mb-2 input-frame  "
                type='text'
                placeholder='Ship to:'
                ref={edit_ship_to}
              />
              <label htmlFor="floatingInput">{shipTo}:</label>
            </div>
            {/* 物流 */}
            <div className="form-floating">
              <input
                name='courier_'
                autoComplete='on'
                required="required"
                className="form-control mb-2 input-frame  "
                type='text'
                placeholder='Courier:'
                ref={edit_courier_}
              />
              <label htmlFor="floatingInput">{courier}:</label>
            </div>
            {/* 托运单号	 */}
            <div className="form-floating">
              <input
                name='cn_'
                autoComplete='on'
                className="form-control mb-2 input-frame  "
                type='text'
                placeholder='Consignment Note:'
                ref={edit_cn_}
              />
              <label htmlFor="floatingInput">{cn}:</label>
            </div>
            {/*  箱子数量 */}
            <div className="form-floating">
              <input
                name='carton_'
                autoComplete='on'
                className="form-control mb-2 input-frame  "
                type='number'
                placeholder='Carton Quantity:'
                ref={edit_carton_}
              />
              <label htmlFor="floatingInput">{carton}:</label>
            </div>
            {/* 重量 */}
            <div className="form-floating">
              <input
                name='weight_'
                autoComplete='on'
                className="form-control mb-2 input-frame  "
                type='number'
                placeholder='Weight:'
                ref={edit_weight_}
              />
              <label htmlFor="floatingInput">{weight}:</label>

            </div>
            {/* 交货单 */}
            <div className="mb-2 form-floating">
              <label htmlFor="floatingTextarea2" className='modal-textarea'>{deliveryOrder}:</label>
              <textarea
                name='do_'
                autoComplete='on'
                id="floatingTextarea2"
                className="form-control modal-textarea-input"
                style={{ height: '100px' }}
                ref={edit_do_}
                >
              </textarea>
            </div>
            {/* 保修单 */}
            <div className="mb-2 form-floating">
              <label htmlFor="floatingTextarea2" className='modal-textarea'>{wxr}:</label>
              <textarea
                ref={edit_wxr_}
                name='wxr_'
                id="floatingTextarea2"
                className="form-control modal-textarea-input"
                style={{ height: '100px' }}>
              </textarea>
            </div>
            {/* 备注 */}
            <div className="mb-2 form-floating">
              <label htmlFor="floatingTextarea2" className='modal-textarea'>{remark}:</label>
              <textarea
                ref={edit_remark_}
                name='remark_'
                placeholder="Remark :"
                id="floatingTextarea2"
                className="form-control modal-textarea-input"
                style={{ height: '100px' }}>
              </textarea>
            </div>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                {closeBtn}
              </Button>
              <Button variant="primary" type='submit'>
                {saveBtn}
              </Button>
            </Modal.Footer>

          </form>
        </Modal.Body>

      </Modal>
    </>
  )
}

export default EditModal;


