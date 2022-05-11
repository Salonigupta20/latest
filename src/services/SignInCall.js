import Axios from "./axios";


export const SignInAPI= async(data,onSuccess, OnError)=>{
    try{
        console.log("return",data);
        const response= await Axios.post('/api/user/login',data,{
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        });
        console.log("printing response",response)
        onSuccess && onSuccess(response);


            }
            catch(err){
                console.log("got an error",err);
                OnError && OnError(err)
            }
        }
 