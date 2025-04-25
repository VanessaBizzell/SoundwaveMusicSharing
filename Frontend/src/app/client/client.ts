interface User {
    token: string,
    id: string
}

class Client {

    private backendUrl: string;
    
    constructor() {
        this.backendUrl = window.location.hostname === 'localhost'
        ? 'http://localhost:3001'
        : 'https://soundwavemusicsharing.onrender.com';
}
    

async fetchCurrentUser(): Promise<User> {
    try {
        const response = await fetch(`${this.backendUrl}/current-user`, {
            method: 'POST',
            credentials: 'include',
        });
        console.log('Response from /current-user:', response);
        if (!response.ok) {
            throw new Error(`Failed to fetch current user: ${response.status}`);
        }
        const data = await response.json();
        console.log('User data:', data);
        return data;
    } catch (error) {
        console.error('Error fetching current user:', error);
        throw error;
    }
}

    // async fetchCurrentUser(): Promise<User> {
    //     return await fetch(`${this.backendUrl}/current-user`, {
    //         method: 'POST',
    //         credentials: 'include'
    //     })
    //     .then(response => response.json() )
    //     .then(data => {
    //         return data
    //     })
    //     .catch(error => console.error(error))
    // }


    async fetchAuthenticated(url: string): Promise<Response> {
        try {
            const fetchUser = await this.fetchCurrentUser();
            console.log('Token being sent:', fetchUser.token);
            return await fetch(url, {
                headers: {
                    'authorization': `Bearer ${fetchUser.token}`,
                },
            });
        } catch (error) {
            console.error('Error making authenticated request:', error);
            throw error;
        }
    }
}

//     async fetchAuthenticated(url: string): Promise<Response> {
//         const fetchUser = await this.fetchCurrentUser();
//         console.log('Token:', fetchUser.token);
//         return await fetch(url, {
//             headers: {
//                 'authorization': `Bearer ${fetchUser.token}`
//             }
//         })
//     }

// }

export const client = new Client();