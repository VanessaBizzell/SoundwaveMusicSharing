import { Injectable } from '@angular/core';
//imported from music.ts interface
import { Music } from './music';
import { client } from './../client/client'

@Injectable({
  providedIn: 'root',
})
export class MusicService {
  // to use musicDB.json API (remember to start json server first: json-server --watch musicDB.json)
  // url = 'http://localhost:3000/music';

    // Dynamically set the base URL based on the environment
    private baseUrl: string = window.location.hostname === 'localhost'
    ? 'http://localhost:3001'
    : 'https://soundwave-lewe.onrender.com';

    url = `${this.baseUrl}/api/music`;
    url2 = `${this.baseUrl}`;

  // // to use musicAPI locally (remember to start backend server first: npm run dev)
  // url = 'http://localhost:3001/api/music';
  // url2 = 'http://localhost:3001';

  // //deployment
  // url = 'https://soundwave-lewe.onrender.com';
  // url2 = 'https://soundwave-lewe.onrender.com';

  constructor() {}

  //fetch API call wrapped in a service to allow reuseability
  async getAllMusic(): Promise<Music[]> {
    try {
      const response = await client.fetchAuthenticated(this.url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      //extract the musicPosts array from the data object
      if (!Array.isArray(data.musicPosts)) {
        throw new Error('Data retrieved is not an array!');
      }

          // Transform trackLink to streaming URL for each music post
    data.musicPosts.forEach((post: any) => {
      if (post.trackLink) {
        post.trackStreamUrl = `${this.url2}/api/stream/${post.trackLink}`;
      } else {
        console.warn('Missing trackLink for post:', post);
      }
    });

      return data.musicPosts;
    } catch (error) {
      console.error('An error occurred while fetching all music posts:', error);
      return [];
    }
  }

  async getUserMusic(userId: string): Promise<Music[]> {
    try {
      const response = await client.fetchAuthenticated(`${this.url}/user/${userId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      //extract the userMusicPosts array from the data object
      if (!Array.isArray(data.userMusicPosts)) {
        throw new Error('Data retrieved is not an array!');
      }

       // Transform trackLink to streaming URL for each music post
    data.userMusicPosts.forEach((post: any) => {
      if (post.trackLink) {
        post.trackStreamUrl = `${this.url2}/api/stream/${post.trackLink}`;
      } else {
        console.warn('Missing trackLink for post:', post);
      }
    });

      return data.userMusicPosts as Music[];
    } catch (error) {
      console.error(
        `An error occurred while fetching this user's music posts  ${userId}:`,
        error
      );

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

      // Log trackLink before transformation
      console.log('Original trackLink:', data.musicPost.trackLink);

      // Transform trackLink to streaming URL
      data.musicPost.trackStreamUrl = `${this.url2}/api/stream/${data.musicPost.trackLink}`; 

      // Log transformed trackLink
      console.log('Transformed trackLink:', data.musicPost.trackStreamUrl); // Log the new property

      return data.musicPost;
    } catch (error) {
      console.error(
        `An error occurred while fetching music post with id ${id}:`,
        error
      );
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


  //function to add music to the API (via a POST request)USES FORM DATA INCL FILE UPLOAD
  async addMusic(musicData: FormData): Promise<void> {
    try {
      console.log('Submitting FormData:', Array.from(musicData.entries())); // Log FormData contents
      // const response = await fetch(`${this.url2}/upload/file`, {
        const response = await fetch(`http://localhost:3001/upload/file`, {
        method: 'POST',
        // Do not set 'Content-Type' header; it will be automatically set by the browser for FormData
        body: musicData,
        
      });

      console.log(response)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Music added:', data);
    } catch (error) {
      console.error('An error occurred while adding music:', error);
    }
  }
}
