//usuario registrado
import PropTypes from 'prop-types';
import { createContext, useState, useContext } from "react";
import { registerRequest } from '../api/auth.js'



export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
}

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);	

    const signup = async (user) => {
        try {
            const res = await registerRequest(user);
            if (res) {
                console.log(res.data);
                setUser(res.data);
            } else {
                console.log('Response is undefined');
            }
        } catch (error) {
            console.log(error);
        }
    }
    


    return (
        <AuthContext.Provider 
        value={{
            signup,
            user,
        }} >
          {children}
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };