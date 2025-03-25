import { createContext, useState, useContext, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Initialize from localStorage if available
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : {
      name: "",
      email: "",
      address: "123 Main St",
      isAuthenticated: false
    };
  });

  useEffect(() => {
    // Persist user data to localStorage
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const updateUser = (newUserData) => {
    try {
      setUser(prev => ({ ...prev, ...newUserData }));
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const logout = () => {
    setUser({
      name: "",
      email: "",
      address: "",
      isAuthenticated: false
    });
    localStorage.removeItem('user');
  };

  return (
    <UserContext.Provider value={{ 
      user, 
      updateUser,
      logout,
      isAuthenticated: user.isAuthenticated 
    }}>
      {children}
    </UserContext.Provider>
  );
};

// Add this after the UserProvider definition
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};