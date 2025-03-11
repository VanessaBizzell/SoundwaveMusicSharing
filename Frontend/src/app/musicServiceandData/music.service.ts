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

  constructor() { }

  //fetch API call wrapped in a service to allow reuseability
  async getAllMusic(): Promise<Music[]> {
    try {
      const response = await fetch(this.url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // console.log('Raw data retrieved from API:', data);
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

  async getMusicById(id: Number): Promise<Music | undefined> {
    try {
      const response = await fetch(`${this.url}/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`An error occurred while fetching music post with id ${id}:`, error);
      return undefined;
    }
  }


submitComment(comment: string) {
  console.log(`Comment submitted: ${comment}`);
}

}
