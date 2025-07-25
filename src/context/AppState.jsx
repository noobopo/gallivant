import { useState } from 'react';
import Context from './AppContext';

const AppState = ({ children }) => {
  const [isAuthanticated, setIsAuthanticated] = useState(false);
  const [user, setUser] = useState();
  const [id, setId] = useState();
  
  return (
    <Context.Provider value={{ isAuthanticated, setIsAuthanticated,user, setUser,id, setId }}>
      {children}
    </Context.Provider>
  );
};

export default AppState;
