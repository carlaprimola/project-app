//usuario registrado
import PropTypes from 'prop-types';
import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from '../api/auth.js'
import Cookies from 'js-cookie'



export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
}

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);	
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);

    //register
    const signup = async (user) => {
        //console.log(user)
        try {
            const res = await registerRequest(user);
            if (res && res.data) {
                console.log(res.data);
                setUser(res.data);
                setIsAuthenticated(true);
            } else {
                console.log('Response is undefined');
            }
        } catch (error) {
            console.log(error.response)
            if (Array.isArray(error.response.data)) {
                setErrors(error.response.data);
            } else {
                setErrors([error.response.data.message]);
            }
        }
    } 

    //login
    const signin = async (user) => {
        try {            
            const res = await loginRequest(user);
            console.log(res)
            setIsAuthenticated(true);
            setUser(res.data);
            console.log(res.data)
        } catch (error) {
            if (error.response) {
                console.log('Se produjo un error:', error);
                if (error.response.status === 429) {
                    // Añadir el mensaje de error del limitador a signinErrors
                    console.log(error.response.data)
                    setErrors(prevErrors => [...prevErrors, error.response.data]);
                } else if (Array.isArray(error.response.data)) {
                    console.log(error.response.data)
                    return setErrors(error.response.data);
                    
                }
            }
        }
    }
    

    //logout
    const logout = () => {
        Cookies.remove("token");
        setIsAuthenticated(false)
        setUser(null)
    }
    useEffect(() => {
    }, [])

    //contador mensajes error
    useEffect(() => {
        if(errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([])
            }, 20000)
            return () => clearTimeout(timer);
        }
    }, [errors])

    //recoger las cookies desde el front con js-cookie
    useEffect(() => {
        async function checkLogin() {
            const cookies = Cookies.get()
            if (!cookies.token) {
                setIsAuthenticated(false);
                setLoading(false); 
                setUser(null);
            }
                try{
                const res = await verifyTokenRequest(cookies.token)
                if(!res.data) {

                setIsAuthenticated(false);
                setLoading(false)
                return
                }                 
                
                setIsAuthenticated(true);
                setUser(res.data);
                setLoading(false)                
            } catch (error){
                //console.log(error)
                setIsAuthenticated(false);
                setUser(null);
                setLoading(false)
            }              
                    
    }    
        checkLogin();  
    }, [])
    


    return (
        <AuthContext.Provider 
        value={{
            signup,
            signin,
            logout,            
            loading,
            user,
            isAuthenticated,
            errors,
        }} >
          {children}
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
