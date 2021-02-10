export const TOKEN_KEY = 'token' //strings are easy to typo. Variables have autocomplete and can help when having to write token a lot

const apiService = async<T= any> (uri: string, method: string = 'GET', body?: {}) => {
    //method will default to get unless provided
    //body is optional because it is not provided on get requests
    const headers: any = {}
    const options: any = {
        method,
        headers
    };
    
    const token = localStorage.getItem(TOKEN_KEY)
    //localstorage is an api built into every modern browder. It is a json object that can store any type of json data under a key name
    //you can store info temporarily and quickly repopulate pages with info w/o having to make a call to the server
    //it can expire or clear by manually clearing
    //it is not global. it is defined per root path.
    //it persists even if you close the browser
    //not avail in private browing or incognito mode
    //encoded not encypted so it can be accessed by anyone
    //we use methods to retrieve, set, clear values

    if (token) {
        headers['Authorization'] = `Bearer ${token}` //if token is real, attach for our server to find
        //bearer tokens are always in the Authorization req header field
        //headers are harder to hack than bodies because they need to be more specific
    }
    //headers are mostly used to describe cyptographic operations such as signing and/or encyption

    if (method === 'POST' || method === 'PUT') {
        headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(body) //only needed for PUT or POST req
    }
    
    try {
        const res = await fetch(uri, options);

        if (res.status === 404) {
            throw new Error('check uri and server path')
        }

        if (res.status === 401) {
            throw new Error('check localStorage or check server endpoint')
        }

        if (res.status === 500) {
            throw new Error('check server terminal')
        }

        if (res.ok) {
            return <T>await res.json()
        } 
    } catch (error) {
        console.error(error)
    }
}

export const setStorage = (token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
}

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    window.location.reload(true);
}

export default apiService;