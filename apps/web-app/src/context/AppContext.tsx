import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types/userType';

interface AppContextType {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <AppContext.Provider
      value={{
        user,
        isLoading,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export default AppProvider;
