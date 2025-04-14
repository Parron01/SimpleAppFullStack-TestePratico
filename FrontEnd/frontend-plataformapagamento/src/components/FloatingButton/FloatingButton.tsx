import React from 'react';
import { FloatingButtonContainer } from './FloatingButton.styles';
import IconImage from '../../assets/01-icon.png'; // Importando a imagem

export function FloatingButton() {
  return (
    <FloatingButtonContainer 
      href="https://parron01.com/" 
      target="_blank" 
      rel="noopener noreferrer"
    >
      <img 
        src={IconImage} 
        alt="Parron01 Icon" 
        style={{ 
          width: '100%', 
          height: '100%', 
          objectFit: 'contain' 
        }} 
      />
    </FloatingButtonContainer>
  );
}