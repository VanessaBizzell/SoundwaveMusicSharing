interface User {
    token: string,
    id: string
}

class Client {

    private backendUrl: string;
    
    constructor() {
        this.backendUrl = window.location.hostname === 'localhost'
        ? 'https://localhost:3001'
        : 'https://soundwavemusicsharing.onrender.com';
}
    
    async fetchCurrentUser(): Promise<User> {
        return await fetch(`${this.backendUrl}/current-user`, {
            method: 'POST',
            credentials: 'include'
        })
        .then(response => response.json() )
        .then(data => {
            return data
        })
        .catch(error => console.error(error))
    }

    async fetchAuthenticated(url: string): Promise<Response> {
        const fetchUser = await this.fetchCurrentUser();
        console.log('Token:', fetchUser.token);
        return await fetch(url, {
            headers: {
                'authorization': `Bearer ${fetchUser.token}`
            }
        })
    }

}

export const client = new Client()