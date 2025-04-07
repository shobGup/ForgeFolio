import React, { useEffect, useState } from 'react';
import './styles/EscHintPopup.css';

const EscHintPopup = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 4000); // ⏱️ fade out after 4s
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="esc-popup">
      Press <strong>ESC</strong> to exit view mode
    </div>
  );
};

export default EscHintPopup;
