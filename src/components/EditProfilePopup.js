import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
   const [name, setName] = React.useState("");
   const [description, setDescription] = React.useState("");

   function handleNameChange(e) {
      setName(e.target.value);
   }

   function handleJobChange(e) {
      setDescription(e.target.value);
   }

   const currentUser = React.useContext(CurrentUserContext);

   React.useEffect(() => {
      setName(currentUser.name || '');
      setDescription(currentUser.about || '');
   }, [ isOpen]);

   function handleSubmit(e) {
      e.preventDefault();

      onUpdateUser( name, description );
   }

   return (
      <PopupWithForm
         name="profile"
         title="Редактировать профиль"
         isOpen={isOpen}
         saveButton="Сохранить"
         onClose={onClose}
         onSubmit={handleSubmit}
      >
         <input
            type="text"
            placeholder="Имя"
            className="popup__field popup__field_input_name"
            id="name-input"
            name="name"
            minLength="2"
            maxLength="40"
            required
            value={name}
            onChange={handleNameChange}
         />
         <span className="name-input-error popup__input-error"></span>
         <input
            type="text"
            placeholder="О себе"
            className="popup__field popup__field_input_job"
            id="job-input"
            name="job"
            minLength="2"
            maxLength="200"
            required
            value={description}
            onChange={handleJobChange}
         />
         <span className="job-input-error popup__input-error"></span>
      </PopupWithForm>
   );
}

export default EditProfilePopup;
