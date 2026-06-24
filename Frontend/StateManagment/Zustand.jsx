import {create} from 'zustand';
import axios from 'axios';

export const useAuthStore = create((set, get) => ({
    user: null,
    // token: localStorage.getItem('authToken'),
    userId: null,
    // productDetails: [],

    // Fetch user data
    fetchUserData: async () => {
        const { token, user} = get();
        console.log("Now user in fetchuserData is : ",user)
        if (!userId) return;
        try {
            const response = await axios.get(`http://localhost:8000/user/login/${user}`, {
                // headers: { Authorization: `Bearer ${token}` }
            });
            console.log('your response in Zustand is : ' ,response.data)
            set({ user: response.data.data });
            console.log("User data in authcontext store ", response.data.data);
        } catch (error) {
            console.error('Failed to load user data:', error);
            get().logout();
        }
    },

    login: async (data) => {
        const { token, userData } = data;
        console.log("Now we will set userData in user in Zustand set() as user : ",userData)   
        try {
            set({ token, user: userData });
            localStorage.setItem('authToken', token);

    
            await get().fetchUserData();  
            return true;
        } catch (error) {
            console.error('Sorry Login failed:', error);
            return false;
        }
    },

    logout: () => {
        set({ user: null, token: null, userId: null });
        localStorage.removeItem('authToken');
    },

    checkAuthentication: (navigate) => {
        const { token, user } = get();
        if (!token || !user) {
            navigate('/login'); 
            return false;
        }
        return true;
    },}))
