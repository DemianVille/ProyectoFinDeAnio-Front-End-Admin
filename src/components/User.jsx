import React from "react";

const UserInfo = ({ id, name, email, totalSpent }) => {
  return (
    <div className="container">
      <div className="">
        <h4>Información del usuario</h4>

        <div className="d-flex flex-row justify-content-around mb-3">
          <p className="d-flex flex-column">Id</p>
          <ul className="listStyle">
            <li>01 {id}</li>
          </ul>
          <p className="d-flex flex-column px-5">Nombre</p>
          <ul className="listStyle">
            <li>
              Norberto Perez {name} (Norbert@prueba.com {email})
            </li>
          </ul>
          <p className="d-flex flex-column px-5">Gastado hasta ahora</p>
          <ul className="listStyle">
            <li>$100{totalSpent}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
