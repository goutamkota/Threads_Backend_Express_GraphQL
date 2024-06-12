export const queries = {
    hello: () => {
        return 'Hello World!';
    }
}

export const mutations = {
    createUser : (_ : any, {}: {}) => {
            return "hello there";
        }
    // createUser: async (_: any, { firstName, lastName, email, password, profileImageURl }: { firstName: string; lastName: string; email: string; password: string; profileImageURl: string }) => {
        // try {
        //     await prisma.user.create({
        //         data: {
        //             firstName,
        //             lastName,
        //             email,
        //             password,
        //             salt: 'random_salt', // Ideally generate a real salt and hash the password
        //             profileImageURl,
        //         },
        //     });
        //     return true;
        // } catch (error) {
        //     console.error("Error creating user:", error);
        //     return false;
        // }
    // },
}

export const resolvers = {
    queries,
    mutations
}