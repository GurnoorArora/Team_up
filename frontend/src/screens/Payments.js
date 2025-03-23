import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Snackbar, Alert } from '@mui/material';
import '../index.css';

export default function Payments() {
  const [open, setOpen] = useState(false);
  const history = useHistory();

  // Handle payment click
  const handlePayment = () => {
    setOpen(true); // Show the toaster

    // Redirect to home after 2 seconds
    setTimeout(() => {
      history.push('./');
    }, 2000);
  };

  return (
    <main className="paymentmain">
      <article className="centerthis">
        <h1 className="paymentheading">Enter your payment details</h1>

        <div className="paymentname">
          <input type="text" placeholder="Enter your Name" />
        </div>

        <div className="paymentemail">
          <input type="email" placeholder="Enter your EmailID" />
        </div>

        <div className="paymentpayment">
          <div className="paymentaccountnumber">
            <input type="number" placeholder="Enter your Account Number" />
          </div>

          <div className="paymentdatecvv">
            <div className="lastdetails">
              <input type="date" placeholder="Enter Card Expiry Date" />
              <input type="password" placeholder="Enter your CVV" />
            </div>
          </div>

          <button className="makepaymet" onClick={handlePayment}>
            PAYMENT
          </button>
        </div>
      </article>

      {/* Toaster */}
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setOpen(false)} severity="success" sx={{ width: '100%' }}>
          Payment Done Successfully!
        </Alert>
      </Snackbar>
    </main>
  );
}
