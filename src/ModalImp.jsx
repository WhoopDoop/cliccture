import React from 'react';
import './App.css';
const ModalImp = ({image}) => {
    return (
        <div className="modal">
            <div className='modal-content'>
                <div className="modal-img">
                    <img alt="Description" src={image.urls.regular}/>
                </div>
                <div className='modal-info'>
                    <h3>{image.description}</h3>
                </div>
            </div>
        </div>
    )
}
export default ModalImp;