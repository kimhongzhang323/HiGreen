import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    const login = (email, password) => {
        // Mock Login Logic
        setIsAuthenticated(true);
        if (email === 'admin' && password === '123') {
            setUser({ name: 'Administrator', email: email, role: 'admin' });
        } else {
            setUser({ name: 'Kimmy', email: email || 'guest@example.com', role: 'user' });
        }
    };

    const loginAsGuest = () => {
        setIsAuthenticated(true);
        setUser({ name: 'Guest', email: 'guest@example.com' });
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, loginAsGuest, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
