import React from 'react';
import './App.css';

const Pic = ({picture, onClick}) => {
    return (
        <div className="card" onClick={onClick}>
                <div>
                    <img alt="" src={picture.urls.small}></img>
                </div>
        </div>
    )
}

export default Pic;