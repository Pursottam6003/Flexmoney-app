import { useEffect, useState } from "react";
import axios from "axios";

// create an auth hook to check for user authentication with jwt stored in Cookie and return the user object if authenticated else return null
const useAuth = () => {
    const [isAuth, setIsAuth] = useState(false);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const updateAuthState = async () => {
        setLoading(true);
        setError('');
        try {
            const res = await axios.post('/users/auth', { withCredentials: true });
            if (res.status !== 200 || res.data.error) {
                throw new Error(res.statusText);
            } else {
                setIsAuth(true);
                console.log(res);
                setProfile(res.data.user);
            }
        } catch (err) {
            setError(err);
            setIsAuth(false);
            setProfile(null);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 300);
        }
    }

    useEffect(() => {
        updateAuthState();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return { isAuth, loading, error, checkAuth: updateAuthState, profile }
}

export default useAuth;