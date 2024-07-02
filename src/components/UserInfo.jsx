import React from 'react';

const UserInfo = ({ id, name, email }) => {
  return (
    <div>
      <h2>Información del usuario</h2>
      <p>ID: {id}</p>
      <p>Nombre: {name}</p>
      <p>Correo: {email}</p>
    </div>
  );
};

export default UserInfo;
