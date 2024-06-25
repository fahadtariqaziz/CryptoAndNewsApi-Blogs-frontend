import {useState, useEffect} from 'react';
import { setUser } from '../store/userSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';

function useAutoLogin(){
    const[loading , setLoading] = useState(true);

    const dispatch = useDispatch();

        useEffect(() => {
            //IIFE
            (async function autoLoginApiCall(){
                
                try{
                    const response = await axios.get(`${process.env.REACT_APP_INTERNAL_API_PATH}/refresh` , {withCredentials: true});
                //iske baad jese login mai user ki state ko update kiya or then dispatch then navigate to home
                
                if (response.status === 200) {
                    //1 setUser Slice
                    const user = {
                        _id : response.data.user._id,
                        email : response.data.user.email,
                        username : response.data.user.username,
                        auth : response.data.auth,
                    }
        
                    dispatch(setUser(user));
                    
                    
                }
        
 
                }
                catch(error){
                    //
                }
                finally{
                    setLoading(false);
                }
                
                               
            })();
        },[])

    return loading;
}

export default useAutoLogin;