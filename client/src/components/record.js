import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkLogin, importAllDeliveryData, selectData } from '../store/actions';
import { useNavigate } from 'react-router-dom';
import {setPopModal} from '../store/actions';
import {findSelectedData} from './utils/tools';

const Record = () => {

    const dispatch = useDispatch();
    let navigate = useNavigate();

    const [showBill, setShowBill] = useState({ show: false, name: 'a' })

    const { control: { no, shipTo, courier, cn, carton, weight, deliveryOrder, wxr, date, remark } } = useSelector(state => state.language);
    const { data } = useSelector(state => state.deliveryData);


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
        dispatch(importAllDeliveryData());
    }, [dispatch, navigate])

    const popUpPopModal = (id) => {
      
        // console.log(id)
        dispatch(setPopModal(true, id))
        dispatch(selectData(findSelectedData(data, id)));  
    }

    const deliveryDataForm = () => {
        const shipmentList = data.map((obj, index) => {
            const doList = () => {
                let list = obj.do_.map((item, i) => (
                    <li key={`${item}-${i}`}>{item}</li>
                ))
                return list;
            }
            const wxrList = () => {
                let list = obj.wxr_.map((item, i) => (
                    <li key={`${item}-${i}`}>{item}</li>
                ))
                return list;
            }
            const remarkList = () => {
                let list = obj.remark_.map((item, i) => (
                    <div key={`${item}-${i}`}>{item}</div>
                ))
                return list;
            }
            return (
                <tr key={obj._id}
                    onMouseEnter={() => setShowBill({ show: true, name: obj._id })}
                    onMouseLeave={() => setShowBill({ show: false, name: obj._id })}
                    onDoubleClick={() => popUpPopModal(obj._id)}
                >
                    <th scope='row'>{index + 1}</th>
                    <td >{obj.ship_to}</td>
                    <td>{obj.courier_}</td>
                    <td>{obj.cn_}</td>
                    <td>{obj.carton_}</td>
                    <td>{obj.weight_}</td>
                    <td className='delivery-order' >
                        {
                            obj.do_.length > 0 ?
                                <ul className={`${showBill.show && showBill.name === `${obj._id}` ? 'hidden-bill' : 'show-bill'} bill-width`} >
                                    <li>{obj.do_[0]}</li>
                                </ul>
                                : null

                        }

                        {
                            obj.do_.length > 0 ?
                                <ul className={`${showBill.show && showBill.name === `${obj._id}` ? 'show-bill' : 'hidden-bill'} bill-width`} >
                                    {doList()}
                                </ul>
                                : null
                        }

                    </td>
                    <td className='wxr' >
                        {
                            obj.wxr_.length > 0 ?
                                <ul className={`${showBill.show && showBill.name === `${obj._id}` ? 'hidden-bill' : 'show-bill'} bill-width`}>
                                    <li>{obj.wxr_[0]}</li>
                                </ul>
                                :
                                null
                        }

                        {
                            obj.wxr_.length > 0 ?
                                <ul className={`${showBill.show && showBill.name === `${obj._id}` ? 'show-bill' : 'hidden-bill'} bill-width`} >
                                    {wxrList()}
                                </ul>
                                : null
                        }
                    </td>
                    <td className='date-width'>{obj.date}</td>
                    <td className='remark-width'>
                        <div className={showBill.show && showBill.name === `${obj._id}` ? 'hidden-bill' : 'show-bill'} >
                            <div>{obj.remark_[0]}</div>
                        </div>
                        <div className={showBill.show && showBill.name === `${obj._id}` ? 'show-bill' : 'hidden-bill'} >
                            {remarkList()}
                        </div>
                    </td>
                </tr>)
        })

        return shipmentList;
    }




    return (
        <table className='table table-hover' id='myTable' >
            <thead className='sticky-top table-dark thead-opacity'>
                <tr>
                    <th scope="col">{no}</th>
                    <th scope="col">{shipTo}</th>
                    <th scope="col">{courier}</th>
                    <th scope="col">{cn}</th>
                    <th scope="col">{carton}</th>
                    <th scope="col">{weight}</th>
                    <th scope="col" className='delivery-order'>{deliveryOrder}</th>
                    <th scope="col" className='wxr'>{wxr}</th>
                    <th scope="col">{date}</th>
                    <th scope="col">{remark}</th>
                </tr>
            </thead>
            <tbody>


                {
                    data.length === 0 ? null : deliveryDataForm()
                }








            </tbody>
        </table>
    )
}

export default Record;


