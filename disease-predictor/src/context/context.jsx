'use client';
// context/context.js
import React, { createContext, useState, useEffect } from 'react';

export const AnimateContext = createContext();

export const AnimateProvider = ({ children }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true); // Trigger animation when the app loads
  }, []);

  return (
    <AnimateContext.Provider value={{ animate }}>
      {children}
    </AnimateContext.Provider>
  );
};
