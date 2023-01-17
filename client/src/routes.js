import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Header from "./components/header";
import FourOFour from "./components/404";
import Record from "./components/record";
import Login from "./components/login";
import AddModal from "./components/add_modal";
import PopModal from "./components/pop_modal";
import EditModal from "./components/edit_modal";
import Toast from "./components/toast";
import Scroll from "./components/scroll";


const App = () => {
    return (
        <BrowserRouter>
            <Scroll />
            <Toast />
            <Header />
            <AddModal />
            <PopModal />
            <EditModal />
            <Routes>
                <Route path='*' element={<FourOFour />} />
                <Route path='/record' element={<Record />} />
                <Route path='/' element={<Login />} />

            </Routes>
        </BrowserRouter>
    )
}

export default App;