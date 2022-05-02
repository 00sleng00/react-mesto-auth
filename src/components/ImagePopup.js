import React from "react";

function ImagePopup({ card, onClose }) {

    return (
        <div
            className={`popup popup_type_photo ${card.name ? 'popup_opened' : ''}`} >
            <div className="popup__photo-figure">
                <button className="popup__close" type="button" onClick={onClose} ></button>
                <img
                    className="popup__photo-img" src={card.link} alt={card.name} />
                <figcaption className="popup__photo-caption">{card.name}</figcaption>
            </div>
        </div>
    );
}

export default ImagePopup;


