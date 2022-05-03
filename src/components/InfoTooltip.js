import React from "react";
import fail from "../images/fail.svg";
import success from "../images/success.svg";

const InfoTooltip = ({ isOpen, onClose, onInfoTooltip }) => {
   return (
      <div className={`popup ${isOpen && "popup_opened"}`}>
         <div className="popup__container popup__container_tooltip">
            <button
               type="button"
               className="popup__close"
               onClick={onClose}
            ></button>
            <img
               src={onInfoTooltip ? success : fail}
               alt="info"
            />
            <p className="popup__profile_tooltip">
               {onInfoTooltip
                  ? `Вы успешно зарегистрировались!`
                  : `Что-то пошло не так! Попробуйте ещё раз.`}
            </p>
         </div>
      </div>
   );
};

export default InfoTooltip;
