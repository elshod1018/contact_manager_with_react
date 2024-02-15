import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {ContactService} from "../../../services/ContactService";
import {Spinner} from "../../Spinner/Spinner";

export const AddContact = () => {
    const navigate = useNavigate();
    const [contact, setContact] = useState({
        name: '',
        photoUrl: "https://www.freeiconspng.com/thumbs/computer-user-icon/computer-user-icon-28.png",
        mobile: '',
        email: '',
        company: '',
        title: '',
        groupId: -1
    });
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                let response = await ContactService.getAllGroups();
                setGroups(response.data.data);
                console.log(response.data.data);
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
        fetchData().then();
    }, []);

    let updateContact = (e) => {
        setContact({...contact, [e.target.name]: e.target.value});
    };
    let checkMobileNumber = (e) => {
        let mobile = e.target.value;
        let n_m = '';
        for (let i = 0; i < mobile.length; i++) {
            if (mobile[i] >= '0' && mobile[i] <= '9') {
                n_m += mobile[i];
            }
            if (n_m.length === 12) {
                break;
            }
        }
        setContact({...contact, mobile: n_m});
    }

    let handleSubmitForm = async (e) => {
        e.preventDefault();
        try {
            let response = await ContactService.createContact(contact);
            if (response && response.data.success) {
                navigate('/contacts/list', {replace: true});
            }
        } catch (e) {
            if (e.response) {
                setErrorMessage(e.response.data.error.errorMessage);
            } else {
                setErrorMessage(e.message);
            }
            console.log(e);
        }
    }

    return (
        <React.Fragment>
            <section className="add-contact p-3">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h4 text-success fw-bold">
                                Create Contact
                            </p>
                            <p className="fst-italic">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur consequuntur dolor,
                                dolore facere id iure magni natus praesentium quasi quia quidem quod unde vitae.
                                Obcaecati officiis sed soluta veritatis vitae.
                            </p>
                        </div>
                    </div>
                    {
                        loading ? <Spinner/> : (errorMessage ?
                            <React.Fragment>
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
                                            <Link to={'/'} className="btn btn-outline-dark">Cancel</Link>
                                        </div>
                                    </div>
                                </div>
                            </React.Fragment> :
                            <React.Fragment>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <form onSubmit={handleSubmitForm}>
                                                <div className="row m-auto text-center">
                                                    <div className="col m-auto">
                                                        <img className="contact-img"
                                                             alt="Loading..."
                                                             src={contact.photoUrl}/>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <div className="mb-2">
                                                            <label htmlFor="name" className="m-1 ms-2">
                                                                Name <span className="text-danger fw-bold">*</span>
                                                            </label>
                                                            <input name="name"
                                                                   onChange={updateContact}
                                                                   value={contact.name}
                                                                   required={true}
                                                                   type="text"
                                                                   className="form-control"
                                                                   placeholder="Name"/>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="mb-2">
                                                            <label htmlFor="photoUrl" className="m-1 ms-2">
                                                                Photo URL <span className="text-danger fw-bold">*</span>
                                                            </label>
                                                            <input name="photoUrl"
                                                                   onChange={updateContact}
                                                                   value={contact.photoUrl}
                                                                   required={true}
                                                                   type="text"
                                                                   className="form-control"
                                                                   placeholder="Photo Url"/>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="mb-2">
                                                            <label htmlFor="mobile" className="m-1 ms-2">
                                                                Phone Number <span
                                                                className="text-danger fw-bold">*</span>
                                                            </label>
                                                            <input name="mobile"
                                                                   onChange={(e) => {
                                                                       updateContact(e);
                                                                       checkMobileNumber(e);
                                                                   }}
                                                                   value={contact.mobile}
                                                                   required={true}
                                                                   type="text"
                                                                   className="form-control"
                                                                   placeholder="998901234567"/>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="mb-2">
                                                            <label htmlFor="email" className="m-1 ms-2">
                                                                Email <span className="text-danger fw-bold">*</span>
                                                            </label>
                                                            <input name="email"
                                                                   onChange={updateContact}
                                                                   value={contact.email}
                                                                   type="email"
                                                                   required={true}
                                                                   className="form-control"
                                                                   placeholder="email@gmail.com"/>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="mb-2">
                                                            <label htmlFor="company" className="m-1 ms-2">
                                                                Company
                                                            </label>
                                                            <input name="company"
                                                                   onChange={updateContact}
                                                                   value={contact.company}
                                                                   type="text"
                                                                   className="form-control"
                                                                   placeholder="Company"/>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="mb-2">
                                                            <label htmlFor="title" className="m-1 ms-2">
                                                                Title
                                                            </label>
                                                            <input name="title"
                                                                   onChange={updateContact}
                                                                   value={contact.title}
                                                                   type="text"
                                                                   className="form-control"
                                                                   placeholder="Title"/>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="mb-2">
                                                            <label htmlFor="groupId" className="m-1 ms-2">
                                                                Group <span className="text-danger fw-bold">*</span>
                                                            </label>
                                                            <select name="groupId"
                                                                    onChange={updateContact}
                                                                    value={contact.groupId}
                                                                    required={true}
                                                                    className="form-control">
                                                                <option value={-1}>Select a Group</option>
                                                                {
                                                                    groups.map((el) => {
                                                                        return <option key={el.id}
                                                                                       value={el.id}>{el.name}</option>
                                                                    })
                                                                }
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">

                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="mb-2 mt-4 p-2">
                                                            <input type="submit"
                                                                   className="btn btn-outline-success"
                                                                   value="Create"/>
                                                            <Link to={'/'} className="btn btn-outline-dark ms-2">
                                                                Cancel
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>

                            </React.Fragment>)
                    }

                </div>
            </section>
        </React.Fragment>
    )
}
