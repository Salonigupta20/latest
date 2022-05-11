import Axios from './axios';

export const RegisterAPI= async(data,onSuccess, onError)=>{
    //data={first_name,last_name,email, phone, password,}
    try{
        console.log("data in register page",data);
        const response= await Axios.post('/api/user/register',data,{
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials:true
        });
        console.log("printint response in register api",response)
        onSuccess && onSuccess(response);
    }
    catch(err){
        console.log("got an error",err);
        onError && onError(err)
    }
}