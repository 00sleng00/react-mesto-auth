import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = ({ handleRegister }) => {
   const [data, setData] = useState({
      email: "",
      password: "",
   });

   const handleChange = (e) => {
      const { name, value } = e.target;

      setData({
         ...data,
         [name]: value,
      });
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      const { email, password } = data;
      handleRegister(email, password);
   };

   return (
      <div className="user">
         <form onSubmit={handleSubmit} className="user__form">
            <h2 className="user__title">Регистрация</h2>
            <input
               id="email"
               name="email"
               type="email"
               placeholder="Email"
               className="user__input"
               value={data.email}
               onChange={handleChange}
               required
            />
            <input
               id="password"
               name="password"
               type="password"
               placeholder="Пароль"
               className="user__input"
               value={data.password}
               onChange={handleChange}
               required
            />
            <button
               type="submit"
               className="user__save-submit"
            >
               Зарегистрироваться
            </button>
            <div className="user__sign-in">
               <Link to="/sign-in" className="user__link">
                  Уже зарегистрированы? Войти
               </Link>
            </div>
         </form>
      </div>
   );
};

export default Register;