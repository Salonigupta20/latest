import Axios from './axios';

export const UpdatePasswordAPI= async(data,onSuccess, onError)=>{
   
    try{
        const response= await Axios.post('/api/user/update-password',data,{
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