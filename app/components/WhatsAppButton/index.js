import React from 'react';
import { Button } from 'rsuite';
import { Whatsapp } from '@styled-icons/simple-icons';
function WhatsAppButton({ phone_number }) {
  const whatsappurl = `https://api.whatsapp.com/send?phone=${phone_number}`;
  return (
    <Button
      href={whatsappurl}
      style={{
        position: 'fixed',
        width: '40px',
        height: '40px',
        bottom: '50px',
        right: '10px',
        backgroundColor: '#25D366',
        color: '#fff',
        padding: '5px',
        borderRadius: '50px',
        textAlign: 'center',
        fontSize: '0px',
        zIndex: '100',
      }}
    >
      <Whatsapp />
    </Button>
  );
}

export default WhatsAppButton;
