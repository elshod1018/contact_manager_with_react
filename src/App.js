import React from 'react';
import {Routes, Route, Navigate} from "react-router-dom";
import {Navbar} from "./components/Navbar/Navbar";
import {ContactList} from "./components/contacts/ContactList/ContactList";
import {AddContact} from "./components/contacts/AddContact/AddContact";
import {ViewContact} from "./components/contacts/ViewContact/ViewContact";
import {EditContact} from "./components/contacts/EditContact/EditContact";
import {Login} from "./components/Auth/Login";
import {Register} from "./components/Auth/Register";

export default function App() {
    return (
        <React.Fragment>
            <Navbar/>
            <Routes>
                <Route path='/' element={<Navigate to='/contacts/list'/>}/>
                <Route path='/contacts/list' element={<ContactList/>}/>
                <Route path='/contacts/add' element={<AddContact/>}/>
                <Route path='/contacts/view/:contactId' element={<ViewContact/>}/>
                <Route path='/contacts/edit/:contactId' element={<EditContact/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
            </Routes>
        </React.Fragment>
    );
}