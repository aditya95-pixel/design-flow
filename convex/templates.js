import {query} from "./_generated/server";
export const GetAllTemplatest=query({
    args:{},
    handler:async(ctx,args)=>{
        const result=await ctx.db.query("templates").collect();
        return result;
    }
})
