import Axios from './axios';

export const ResetPasswordAPI= async(data,onSuccess, onError)=>{
   
    try{
        const response= await Axios.post('/api/user/resetPassword',data,{
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials:true
        });
        onSuccess && onSuccess(response);
    }
    catch(err){
        console.log("got an error",err);
        onError && onError(err)
    }
}