import { Injectable } from '@angular/core';
//imported from music.ts interface
import { Music } from './music';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  // to use musicDB.json API (remember to start json server first: json-server --watch musicDB.json)
  // url = 'http://localhost:3000/music';
  
  // to use musicAPI (remember to start backend server first: npm run dev)
  url = 'http://localhost:3001/api/music';

  constructor() { 
  }

  //fetch API call wrapped in a service to allow reuseability
  async getAllMusic(): Promise<Music[]> {

    try {
      const response = await fetch(this.url, {
        headers: {
          "authorization": `Bearer ${localStorage?.getItem('token')}`
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      //extract the musicPosts array from the data object
      if (!Array.isArray(data.musicPosts)) {
        throw new Error('Data retrieved is not an array!');
      }
      return data.musicPosts;
    } catch (error) {
      console.error('An error occurred while fetching all music posts:', error);
      return [];
    }
  }

  async getUserMusic(userId: string): Promise<Music[]> {
    try {
      const response = await fetch(`${this.url}/${userId}`, {
        headers: {
          "authorization": `Bearer ${localStorage?.getItem('token')}`
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      //extract the userMusicPosts array from the data object
      if (!Array.isArray(data.userMusicPosts)) {
        throw new Error('Data retrieved is not an array!');
      }
      return data.userMusicPosts as Music[];
    } catch (error) {
      console.error(`An error occurred while fetching this user's music posts  ${userId}:`, error);
      return [];
    }
  }

  async getMusicById(id: string): Promise<Music | undefined> {
    try {
      const response = await fetch(`${this.url}/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log(`Response status: ${response.status}`);
      const data = await response.json();
      
      // Extract the musicPost object from the data
      if (!data.musicPost) {
        throw new Error('Music post not found in the response!');
      }
      return data.musicPost;
    } catch (error) {
      console.error(`An error occurred while fetching music post with id ${id}:`, error);
      return undefined;
    }
  }



//function to submit comment to the API (via a PATCH request so appends comment to array of comments)
  async submitComment(id: string, comment: string): Promise<void> {
    try {
      const response = await fetch(`${this.url}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ comment }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(`Comment submitted: ${comment}`);
    } catch (error) {
      console.error('An error occurred while submitting the comment:', error);
    }
  }


  // //function to add music to the API (via a POST request) WITH USER ID
  // async addMusic(userId: string, musicData:any): Promise<void> {
  //   try {
  //     const response = await fetch(`${this.url}/${userId}`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         // "authorization": `Bearer ${localStorage?.getItem('token')}`
  //       },
  //       body: JSON.stringify(musicData)
  //     });
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     } 
  //     const data = await response.json();
  //     console.log('Music added:', data);
  //   }
  //   catch (error) {
  //     console.error('An error occurred while adding music:', error);
  //   } 
  // }

    //function to add music to the API (via a POST request) NO USER ID
    async addMusic(musicData:any): Promise<void> {
      try {
        const response = await fetch(`${this.url}/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // "authorization": `Bearer ${localStorage?.getItem('token')}`
          },
          body: JSON.stringify(musicData)
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        } 
        const data = await response.json();
        console.log('Music added:', data);
      }
      catch (error) {
        console.error('An error occurred while adding music:', error);
      } 
    }


}

