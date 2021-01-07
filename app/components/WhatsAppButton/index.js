import React from 'react'
import {Button} from 'rsuite';
  import { Whatsapp } from '@styled-icons/simple-icons';
function WhatsAppButton() {
    return (
        <Button
        href='https://api.whatsapp.com/send?phone=919290142960'
        style={{
          position: 'fixed',
          width: '60px',
          height: '60px',
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
    )
}

export default WhatsAppButton
