import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
   const [name, setName] = React.useState("");
   const [link, setLink] = React.useState("");

   function handleNameChange(e) {
      setName(e.target.value);
   }

   function handleLinkChange(e) {
      setLink(e.target.value);
   }

   React.useEffect(() => {
      setName("");
      setLink("");
   }, [isOpen]);

   function handleSubmit(e) {
      e.preventDefault();

      onAddPlace(name, link);
   }

   return (
      <PopupWithForm
         name="card"
         title="Новое место"
         saveButton="Создать"
         isOpen={isOpen}
         onClose={onClose}
         onSubmit={handleSubmit}
      >
         <input
            type="text"
            name="name"
            className="popup__field popup__field_card_name"
            id="card-name-input"
            minLength={2}
            maxLength={30}
            placeholder="Название"
            required
            value={name}
            onChange={handleNameChange}
         />
         <span className="card-url-input-error popup__input-error"></span>
         <input
            type="url"
            placeholder="Ссылка на картинку"
            className="popup__field popup__field_card_link"
            id="card-url-input"
            name="link"
            required
            value={link}
            onChange={handleLinkChange}
         />
         <span className="card-url-input-error popup__input-error"></span>
      </PopupWithForm>
   );
}

export default AddPlacePopup;