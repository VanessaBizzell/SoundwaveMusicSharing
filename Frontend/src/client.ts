class Client {

    static token = ''

    constructor() {
        this.token = ''
    }

    get token(): string { return this.token }
    set token(token) {
        this.token = token
    }
 
    async fetchAuthenticated(url: string): Promise<Response> {
        return await fetch(url, {
            headers: {
                "authorization": `Bearer ${this.token}`
              }
        })
    }

    /*
  async getResource(): Promise<Response>  {
    
    return await fetch('http://localhost:3001/api/page', {
      headers: {
        "authorization": `Bearer ${Client.token}`
      }
    })
    .then(response => {
      console.log(response)
      console.log(response.status, " ", response.statusText)
      return response.json()
  })
    .then(data => {
      console.log(data)
      return data
  })
    .catch(error => console.error(error));
  }
    */

}

export default Client
