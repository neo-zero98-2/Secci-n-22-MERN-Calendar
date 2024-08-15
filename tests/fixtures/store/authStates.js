export const initialState = {
    status: 'not-authenticated', // authenticated, not-authenticated
    user: {},
    errorMessage: undefined
}

export const authenticatedState = {
    status: 'authenticated', // authenticated, not-authenticated
    user: {
        uid: '668cce1049c52f51f07e5349',
        name: 'david'
    },
    errorMessage: undefined
}

export const notAuthenticatedState = {
    status: 'not-authenticated', // authenticated, not-authenticated
    user: {},
    errorMessage: undefined
}

