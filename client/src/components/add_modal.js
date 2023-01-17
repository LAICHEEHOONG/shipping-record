import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { setModal, importAllDeliveryData } from '../store/actions'
import { closeNavbar, dateEngine, billToArrEngine, remarkToArrEngine } from './utils/tools';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import * as api from '../api';



const AddModal = () => {

  const { set_modal } = useSelector(state => state.modal);
  const { control: {
    shipTo,
    courier,
    cn,
    carton,
    weight,
    deliveryOrder,
    wxr,
    remark,
    shippingForm,
    closeBtn,
    saveBtn,
    shipToErr1,
    shipToErr2,
    courierErr1,
    courierErr2,
    cnErr1,
    cartonErr1,
    cartonErr2,
    weightErr1,
    weightErr2,

  } } = useSelector(state => state.language);

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setModal(false));
    closeNavbar()
  };

  const formik = useFormik({
    initialValues: {
      ship_to: '',
      courier_: '',
      cn_: '',
      carton_: '',
      weight_: '',
      do_: '',
      wxr_: '',
      remark_: ''
    },
    validationSchema: Yup.object({
      ship_to: Yup
        .string()
        .required(shipToErr1)
        .max(30, shipToErr2),
      courier_: Yup
        .string()
        .required(courierErr1)
        .max(15, courierErr2),
      cn_: Yup
        .string()
        .max(30, cnErr1),
      carton_: Yup
        .number()
        .max(999, cartonErr1)
        .min(0, cartonErr2),
      weight_: Yup
        .number()
        .max(9999, weightErr1)
        .min(0, weightErr2),
      do_: Yup
        .string()


    }),
    onSubmit: async (values, { resetForm }) => {

      values = {
        ...values,
        date: dateEngine(),
        time: new Date().getTime(),
        do_: billToArrEngine(values.do_),
        remark_: remarkToArrEngine(values.remark_),
        wxr_: billToArrEngine(values.wxr_)
      }
      // console.log(values);
      await api.saveDeliveryData(values);
      
      handleClose();
      resetForm();
      dispatch(importAllDeliveryData())
    }
  });



  return (
    <>
      <Modal show={set_modal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{shippingForm}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <form onSubmit={formik.handleSubmit}> */}
          <form>
            {/* 运送到。 */}
            <div className="form-floating">
              <input
                name='ship_to'
                {...formik.getFieldProps('ship_to')}
                autoComplete='on'
                required="required"
                className="form-control mb-2 input-frame  "
                type='text'
                placeholder='Ship to:'
              />
              {
                formik.errors.ship_to && formik.touched ?
                  <label className='label-error-color'>{formik.errors.ship_to}</label>
                  :
                  <label htmlFor="floatingInput">{shipTo}:</label>
              }
            </div>
            {/* 物流 */}
            <div className="form-floating">
              <input
                name='courier_'
                {...formik.getFieldProps('courier_')}
                autoComplete='on'
                required="required"
                className="form-control mb-2 input-frame  "
                type='text'
                placeholder='Courier:'
              />
              {
                formik.errors.courier_ && formik.touched ?
                  <label htmlFor="floatingInput" className='label-error-color'>{formik.errors.courier_}:</label>
                  :
                  <label htmlFor="floatingInput">{courier}:</label>

              }
            </div>
            {/* 托运单号	 */}
            <div className="form-floating">
              <input
                name='cn_'
                {...formik.getFieldProps('cn_')}
                autoComplete='on'
                className="form-control mb-2 input-frame  "
                type='text'
                placeholder='Consignment Note:'
              />
              {
                formik.errors.cn_ && formik.touched ?
                  <label htmlFor="floatingInput" className='label-error-color'>{formik.errors.cn_}:</label>
                  :
                  <label htmlFor="floatingInput">{cn}:</label>

              }
            </div>
            {/*  箱子数量 */}
            <div className="form-floating">
              <input
                name='carton_'
                {...formik.getFieldProps('carton_')}
                autoComplete='on'
                className="form-control mb-2 input-frame  "
                type='number'
                placeholder='Carton Quantity:'
              />
              {
                formik.errors.carton_ && formik.touched ?
                  <label htmlFor="floatingInput" className='label-error-color'>{formik.errors.carton_}:</label>
                  :
                  <label htmlFor="floatingInput">{carton}:</label>
              }
            </div>
            {/* 重量 */}
            <div className="form-floating">
              <input
                name='weight_'
                {...formik.getFieldProps('weight_')}
                autoComplete='on'
                className="form-control mb-2 input-frame  "
                type='number'
                placeholder='Weight:'
              />
              {
                formik.errors.weight_ && formik.touched ?
                  <label htmlFor="floatingInput" className='label-error-color'>{formik.errors.weight_}:</label>
                  :
                  <label htmlFor="floatingInput">{weight}:</label>
              }
            </div>
            {/* 交货单 */}
            <div className="mb-2 form-floating">
              <label htmlFor="floatingTextarea2" className='modal-textarea'>{deliveryOrder}:</label>
              <textarea
                name='do_'
                {...formik.getFieldProps('do_')}
                autoComplete='on'
                id="floatingTextarea2"
                className="form-control modal-textarea-input"
                style={{ height: '100px' }}>
              </textarea>
            </div>
            {/* 保修单 */}
            <div className="mb-2 form-floating">
              <label htmlFor="floatingTextarea2" className='modal-textarea'   >{wxr}:</label>
              <textarea
                name='wxr_'
                {...formik.getFieldProps('wxr_')}
                id="floatingTextarea2"
                className="form-control modal-textarea-input"
                style={{ height: '100px' }}>
              </textarea>
            </div>
            {/* 备注 */}
            <div className="mb-2 form-floating">
              <label htmlFor="floatingTextarea2" className='modal-textarea'>{remark}:</label>
              <textarea
                name='remark_'
                {...formik.getFieldProps('remark_')}
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
              <Button variant="primary" onClick={formik.handleSubmit}>
                {saveBtn}
              </Button>
            </Modal.Footer>

          </form>
        </Modal.Body>

      </Modal>
    </>
  )
}

export default AddModal;


