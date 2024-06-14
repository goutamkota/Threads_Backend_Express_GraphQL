import UserService, { CreateUserPayload, GetUserTokenPayload } from "../../services/user";

export const queries = {
    getUserToken : async (_ : any, payload : GetUserTokenPayload) => {
        return await UserService.getUserToken(payload)
    },
    getCurrentLoggedInUser : async (_ : any, parameters : any, context : any) => {
        if (context && context.user) {
            const id = context.user.id;
            const user = await UserService.getUserById(id);
            console.log(user)
            if(!user) throw new Error('User not found!');
            return user;
        }
        throw new Error("Unauthorized User.");
    }
}

export const mutations = {
    createUser : async (_ : any, payload : CreateUserPayload) => {
        const res = await UserService.createUser(payload);
        return res.id;
    }
}

export const resolvers = {
    queries,
    mutations
}