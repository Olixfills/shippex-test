import React, {createContext, useState, useContext} from 'react';

type UserContextType = {
  userData: any;
  setUserData: React.Dispatch<React.SetStateAction<any>>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({children}: {children: React.ReactNode}) => {
  const [userData, setUserData] = useState(null);

  return (
    <UserContext.Provider value={{userData, setUserData}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
