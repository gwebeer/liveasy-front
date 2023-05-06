import { React, Component } from 'react';

class ToastAlert extends Component {

    render() {
        return (
            <div className="modal fade" id="custom-alert" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-sm">
                    <div className="modal-content" id="custom-alert-color">
                        <div className="modal-header">
                            <span id="customAlert-title"> </span>
                            <button type="button" className="btn-close" id="modal-close-btn" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body py-0" id="customAlert-description"> </div>
                        {/* <div className="modal-footer" style={{border: 'none'}}> </div> */}
                    </div>
                </div>
            </div>
        );
    }
}

export default ToastAlert