import {client} from "../../mongodb.mjs"
const db = client.db("ridebook")

const userModels = {

    findUserByEmail: async(Email)=>{

        const findOneUser = await db.collection("users").findOne({email:Email})
        
        return findOneUser
    },
}
export default userModels