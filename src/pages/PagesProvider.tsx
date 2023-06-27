import React, { createContext, useState } from 'react';

export type ROUTES = 'signin' | 'signup' | 'config' | 'home';

interface ContextProps {
  currentRoute: ROUTES;
  updateCurrentPage: (page: ROUTES) => void;
}

export const PagesContext = createContext({} as ContextProps);

type Props = {
  children: React.ReactNode;
};

const PagesProvider = ({ children }: Props) => {
  const [currentRoute, setCurrentRoute] = useState<ROUTES>('signin');

  const updateCurrentPage = (page: ROUTES) => {
    setCurrentRoute(page);
  };

  return (
    <PagesContext.Provider value={{ currentRoute, updateCurrentPage }}>
      {children}
    </PagesContext.Provider>
  );
};

export default PagesProvider;
