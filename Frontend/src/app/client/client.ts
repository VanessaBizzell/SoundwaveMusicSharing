interface User {
    token: string,
    id: string
}

class Client {

    async fetchCurrentUser(): Promise<User> {
        return await fetch('http://localhost:3001/current-user', {
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
        return await fetch(url, {
            headers: {
                'authorization': `Bearer ${fetchUser.token}`
            }
        })
    }

}

export const client = new Client()