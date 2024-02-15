import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {ContactService} from "../../../services/ContactService";
import {Spinner} from "../../Spinner/Spinner";

export const ViewContact = () => {
    const [contact, setContact] = useState({});
    const [group, setGroup] = useState({});
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    let {contactId} = useParams();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                let response = await ContactService.getContactById(contactId);
                setContact(response.data.data);
                let groupResponse = await ContactService.getGroupById(response.data.data.groupId);
                setGroup(groupResponse.data.data);
            } catch (e) {
                setErrorMessage(e.response.data.error.errorMessage);
                console.log(e);
            }
            setLoading(false);
        };
        fetchData()
            .then();
    }, [contactId])

    return (
        <React.Fragment>
            <section className="view-contact-intro p-3">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h4 text-warning fw-bold">
                                View Contact
                            </p>
                            <p className="fst-italic">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. A cumque delectus ipsam labore
                                nemo quam quis! Alias eos eveniet nesciunt omnis sint? Accusamus dolorum eum excepturi
                                perferendis quas veritatis voluptas!
                            </p>
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
                        <div className="row">
                            <div className="col">
                                <Link to={'/'} className="btn btn-outline-warning">Back</Link>
                            </div>
                        </div>
                    </div>
                </React.Fragment> : < React.Fragment>
                    {
                        Object.keys(contact).length > 0 && Object.keys(group).length > 0 &&
                        <section className="view-contact mt-3">
                            <div className="container">
                                <div className="row align-items-center">
                                    <div className="col-md-4">
                                        <img className="contact-img"
                                             alt="Loading..."
                                             src={contact.photoUrl ? contact.photoUrl : 'https://via.placeholder.com/150'}
                                        />
                                    </div>
                                    <div className="col-md-8">
                                        <ul className="list-group">
                                            <li className="list-group-item list-group-item-action">
                                                Name : <span className="fw-bold">{contact.name}</span>
                                            </li>
                                            <li className="list-group-item list-group-item-action">
                                                Mobile : <span className="fw-bold"> {contact.mobile} </span>
                                            </li>
                                            <li className="list-group-item list-group-item-action">
                                                Email : <span className="fw-bold">{contact.email}</span>
                                            </li>
                                            <li className="list-group-item list-group-item-action">
                                                Company : <span className="fw-bold">{contact.company}</span>
                                            </li>
                                            <li className="list-group-item list-group-item-action">
                                                Title : <span className="fw-bold">{contact.title}</span>
                                            </li>
                                            <li className="list-group-item list-group-item-action">
                                                Group : <span className="fw-bold">{group.name}</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <Link to={'/'} className="btn btn-outline-warning">Back</Link>
                                    </div>
                                </div>
                            </div>
                        </section>
                    }
                </React.Fragment>)
            }
        </React.Fragment>
    )
}
