class Client {
  
    token: string = ''
 
    async fetchAuthenticated(url: string): Promise<Response> {
        return await fetch(url, {
            headers: {
                "authorization": `Bearer ${this.token}`
              }
        })
    }

}

export const client = new Client()