import React from "react";
import spinnerImg from "../../assets/img/loading.gif";

export const Spinner = () => {
    return (
        <React.Fragment>
            <div>
                <img src={spinnerImg} alt="Loading..." className="d-block m-auto" style={{width: '200px'}}/>
            </div>
        </React.Fragment>
    )
}
