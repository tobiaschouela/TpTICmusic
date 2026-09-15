import pkg from "pg";


export const pool = new pool({
    host:"ep-autumn-heart-awj4kpqy-pooler.c-12.us-east-1.aws.neon.tech",
    user:"neondb_owner",
    password:"npg_7MksKL5SpCPX",
    port:5432,
    ssl:{rejectUnathorized:false,
    },
    channelBindqing:"require",
});

export const dbController={pool:pool,}

export const query= async(text,params=[])=>{
    const client =await dbController.pool.connect();
    try {
        const result =await client.query(text,params)
    }finally{client.release();}
}