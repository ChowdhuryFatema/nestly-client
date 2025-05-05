"use server";
const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_API}/newsletter`;
export const subscribeToNewsletter = async(formData: {email: string})=>{
    try{
        const res = await fetch(`${BASE_URL}/subscribe`,
            {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                },
            } );
            return res.json();
    }catch(error: any){
        return {success: false, message: error.message || "Subscription failed"};
    }
};

export const getAllSubscribers = async () =>{
    try{
        const res = await fetch(`${BASE_URL}/subscribers`,{
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return res.json();
    }catch(error : any){
        return { success: false, message: error.message || "Failed to fetch subscribers" };
    }
}