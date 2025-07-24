import React from 'react';
import { MdLogout, MdSend, MdGroup, MdMail } from 'react-icons/md';

export function Icon({ name, className = '' }) {
  switch (name) {
    case 'logout':
      return <MdLogout size={24} color="white" className={className} />;
    case 'send':
      return <MdSend size={24} color="white" className={className} />;
    case 'group':
      return <MdGroup size={24} color="white" className={className} />;
    case 'mail':
      return <MdMail size={24} color="white" className={className} />;
    default:
      return null;
  }
}