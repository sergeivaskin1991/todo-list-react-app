import React from 'react';
import './Footer.css';

function Footer() {
  const date = new Date();

  return (
    <footer className="footer">
      <p className="footer__copyright">{date.getFullYear()} ToDo List by Sergei Vaskin</p>
    </footer>
  )
}

export default Footer;