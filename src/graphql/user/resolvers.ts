import UserService, { CreateUserPayload, GetUserTokenPayload } from "../../services/user";

export const queries = {
    getUserToken : async (_: any,payload: GetUserTokenPayload) => {
        return await UserService.getUserToken(payload)
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