import { toast } from 'react-toastify';

// 关闭 navbar
export const closeNavbar = () => {
  document.querySelector('.btn-close').click();
}

// 生成日期格式
export const dateEngine = () => {
  let week = new Date().toString().slice(0, 3);
  let day = new Date().toString().slice(8, 10);
  let month = new Date().toString().slice(4, 7);
  let year = new Date().toString().slice(11, 15);
  let date = `${week} ${day} ${month} ${year}`;

  return date;
}

// 运输单 转换为 array
export const billToArrEngine = (str) => {
  let text = str.replaceAll('\n', ' ');
  let arr = text.split(' ');
  let arrFilterEmpty = arr.filter(el => el !== '')
  return arrFilterEmpty;
}

// 标记 转换为 array
export const remarkToArrEngine = (str) => {
  return str.split('\n').filter(el => el !== '');
}

// 使用ID 找出所选数据。
export const findSelectedData = async (DATA, ID) => {
  try {
    const data_id = await DATA.find(el => el._id === ID);
    // console.log(data_id);
    return data_id;

  } catch (err) {
    const errMessage = {
      page: 'utils/tools.js',
      message: 'findSelectedData errors',
      errors_message: err
    }
    console.log(errMessage);
    return null;
  }

}

// array 转换为 String  
export const arrayConvertToString = (arr) => {
  let arr_ = arr.toString();
  arr_ = arr_.replaceAll(',', '\n');

  // console.log(arr_);
  return arr_
}

// 启动TOAST
export const notify = (text) =>
  toast.error(text, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'dark'
  });;

// 搜寻
export const tableSearch = () => {
  const input = document.getElementById('myInput');
  const filter = input.value.toUpperCase().replace(/\s+/g, '');
  const table = document.getElementById('myTable');
  const tr = table.getElementsByTagName('tr');

  for (let i = 0; i < tr.length; i++) {
    let td_ship = tr[i].getElementsByTagName("td")[0];
    let td_courier = tr[i].getElementsByTagName("td")[1];
    let td_cn = tr[i].getElementsByTagName('td')[2];
    let td_do = tr[i].getElementsByTagName('td')[5];
    let td_wxr = tr[i].getElementsByTagName('td')[6];
    let td_date = tr[i].getElementsByTagName('td')[7];


    if (td_ship || td_courier || td_cn || td_do || td_wxr || td_date) {
      let txtValue_ship = td_ship.textContent.replace(/\s+/g, '') || td_ship.innerText.replace(/\s+/g, '');
      let txtValue_courier = td_courier.textContent.replace(/\s+/g, '') || td_courier.innerText.replace(/\s+/g, '');
      let txtValue_cn = td_cn.textContent.replace(/\s+/g, '') || td_cn.innerText.replace(/\s+/g, '');
      let txtValue_do = td_do.textContent.replace(/\s+/g, '') || td_do.innerText.replace(/\s+/g, '');
      let txtValue_wxr = td_wxr.textContent.replace(/\s+/g, '') || td_wxr.innerText.replace(/\s+/g, '');
      let txtValue_date = td_date.textContent.replace(/\s+/g, '') || td_date.innerText.replace(/\s+/g, '');

      if (txtValue_ship.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else if (txtValue_courier.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else if (txtValue_cn.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else if (txtValue_do.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else if (txtValue_wxr.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else if (txtValue_date.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }

  }



}

