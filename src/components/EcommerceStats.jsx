import React from 'react';

const EcommerceStats = ({ totalSpent }) => {
  return (
    <div>
      <h2>Total</h2>
      <p>Gastado hasta ahora: ${totalSpent}</p>
    </div>
  );
};

export default EcommerceStats;
