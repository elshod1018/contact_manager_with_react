import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {ContactService} from "../../../services/ContactService";
import {Spinner} from "../../Spinner/Spinner";

export const ContactList = () => {
    const [contacts, setContacts] = useState([]);
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');

    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                let response = await ContactService.getAllContacts();
                setContacts(response.data.data);
                setFilteredContacts(response.data.data);
                console.log(response.data.data)
            } catch (e) {
                if (e.response) {
                    setErrorMessage(e.response.data.error.errorMessage);
                } else {
                    setErrorMessage(e.message);
                }
                console.log(e);
            }
            setLoading(false);
        };

        fetchData()
            .then();

    }, []);

    let handleDelete = async (contactId) => {
        try {
            let response = await ContactService.deleteContact(contactId);
            if (response.data.success) {
                navigate("/", {replace: true});
            }
            console.log(response);
        } catch (e) {
            if (e.response) {
                setErrorMessage(e.response.data.error.errorMessage);
            } else {
                setErrorMessage(e.message);
            }
            console.log(e);
        }
    }

    let handleSearch = (e) => {
        setSearchText(e.target.value);
        let f_c = contacts.filter((el) => {
            return el.name.toLowerCase().includes(e.target.value.toLowerCase()) || el.mobile.includes(e.target.value);
        });
        setFilteredContacts(f_c);
    }

    return (
        <React.Fragment>
            <section className="contact-search p-3">
                <div className="container">
                    <div className="grid">
                        <div className="row">
                            <div className="col">
                                <p className="h3 fw-bold">
                                    Contact Manager
                                    <Link to={'/contacts/add'} className="btn btn-success ms-2">
                                        <i className="fa fa-plus-circle me-1"/> New
                                    </Link>
                                </p>
                                <p className="fst-italic">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus ad,
                                    consectetur
                                    corporis deleniti molestias praesentium! Alias assumenda at beatae
                                    cupiditate
                                    dicta
                                    earum enim, esse ex ipsa saepe soluta tempora veritatis!
                                </p>
                            </div>
                        </div>
                        <div className="row align-items-center justify-content-center" >
                            <div className="col-md-4">
                                <form className="row">
                                    <div className="col">
                                        <div className="mb-2">
                                            <input type="text"
                                                   name="searchText"
                                                   value={searchText}
                                                   onChange={handleSearch}
                                                   className="form-control"
                                                   placeholder="Search"/>
                                        </div>
                                    </div>
                                    {/*<div className="col">*/}
                                    {/*    <div className="mb-2">*/}
                                    {/*        <input type="submit"*/}
                                    {/*               className="btn btn-outline-dark"*/}
                                    {/*               placeholder="Search"/>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {
                loading ? <Spinner/> : (errorMessage ? <React.Fragment>
                    <div className="container">
                        <div className="row text-center fst-italic fw-bold ">
                            <div className="col">
                                <div className="alert alert-danger">
                                    {errorMessage}
                                </div>
                            </div>
                        </div>
                    </div>
                </React.Fragment> : <React.Fragment>
                    <section className="contact-list">
                        <div className="container">
                            <div className="row">
                                {
                                    filteredContacts.length > 0 && filteredContacts.map((contact) => {
                                        return (<div className="col-md-6" key={contact.id}>
                                            <div className="card my-2">
                                                <div className="card-body">
                                                    <div
                                                        className="row align-items-center d-flex justify-content-around">
                                                        <div className="col-md-4">
                                                            <img
                                                                className="contact-img"
                                                                src={contact.photoUrl}
                                                                alt="Loading..."/>
                                                        </div>
                                                        <div className="col-md-7">
                                                            <ul className="list-group">
                                                                <li className="list-group-item list-group-item-action">
                                                                    Name : <span
                                                                    className="fw-bold">{contact.name}</span>
                                                                </li>
                                                                <li className="list-group-item list-group-item-action">
                                                                    Mobile : <span
                                                                    className="fw-bold">{contact.mobile}</span>
                                                                </li>
                                                                <li className="list-group-item list-group-item-action">
                                                                    Email : <span
                                                                    className="fw-bold">{contact.email}</span>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div
                                                            className="col-md-1 d-flex flex-column align-items-center">
                                                            <Link to={`/contacts/view/${contact.id}`}
                                                                  className="btn btn-warning my-1">
                                                                <i className="fa fa-eye"/>
                                                            </Link>
                                                            <Link to={`/contacts/edit/${contact.id}`}
                                                                  className="btn btn-primary my-1">
                                                                <i className="fa fa-pen"/>
                                                            </Link>
                                                            <button className="btn btn-danger my-1"
                                                                    onClick={() => handleDelete(contact.id)}>
                                                                <i className="fa fa-trash-alt"/>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>);
                                    })
                                }

                            </div>
                        </div>
                    </section>
                </React.Fragment>)

            }
        </React.Fragment>
    )
}
