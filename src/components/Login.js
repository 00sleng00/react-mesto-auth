import React, { useState } from "react";

const Login = ({ handleLogin }) => {
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
      if (!data.email || !data.password) {
         return;
      }
      const { email, password } = data;
      handleLogin(email, password);
   };

   return (
      <div className="user">
         <form onSubmit={handleSubmit} className="user__form">
            <h2 className="user__title">Вход</h2>
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
               Войти
            </button>
         </form>
      </div>
   );
};

export default Login;
