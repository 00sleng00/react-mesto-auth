import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
   const avatarRef = React.useRef();

   React.useEffect(() => {
      avatarRef.current.value = "";
   }, [isOpen]);

   function handleSubmit(e) {
      e.preventDefault();

      onUpdateAvatar({
         avatar: avatarRef.current.value,
      });
   }

   return (
      <PopupWithForm
         name="avatar"
         title="Обновить аватар"
         isOpen={isOpen}
         saveButton="Сохранить"
         onClose={onClose}
         onSubmit={handleSubmit}
      >
         <input
            type="url"
            placeholder="Ссылка на картинку"
            className="popup__field popup__field_avatar_link"
            id="avatar-input"
            name="avatar"
            required
            ref={avatarRef}
         />
         <span className="avatar-input-error popup__input-error"></span>
      </PopupWithForm>
   );
}

export default EditAvatarPopup;
