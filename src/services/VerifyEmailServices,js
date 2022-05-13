import Axios from "./axios";

export const verifyEmailAPI  = async(data,onSuccess ,onError)=>{
    try{
        console.log("ID Data in verifyemail page",data);
        //  debugger;
        const res =await Axios.post('/api/user/emailVerification', {email:data.email_address}, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        });
        console.log("printing response in verifyemail  api ", res)
        //  debugger;
        onSuccess && onSuccess(res);
        //  debugger;
    }
    catch(err){
        console.log("got an error of verifyemail api",err);
        onError && onError(err)
    }
}

// export const verifyLinkAPI  = async(data,onSuccess ,onError)=>{
//     try{
//         console.log("ID Data in verify Link page",data);
//         //  debugger;
//         const res =await Axios.get('/api/user/verify-email?token='+ data.token, {
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             withCredentials: true
//         });
//         console.log("printing response in Verify Link  api ", res)
       
//         //  debugger;
//         onSuccess && onSuccess(res);
//         //  debugger;
//     }
//     catch(err){
//         console.log("got an error of Verify Link api",err);
//         onError && onError(err)
//     }
// }