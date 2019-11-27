import React from 'react'
import '../styles/_OwnerCard.scss';

function OwnerCard({ person }) {
    return (
        <div className="OwnerCard">
            <img src={person.profilePhoto}></img>
            <h1>{person.name}</h1>
            <i className="material-icons">phone</i>
            <i className="material-icons">message</i>
        </div>
    );
}

export default OwnerCard;