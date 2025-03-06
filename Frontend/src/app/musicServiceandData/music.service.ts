import { Injectable } from '@angular/core';
//imported from music.ts interface
import { Music } from './music';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  url = 'http://localhost:3000/music';

  constructor() { }

  //fetch API call wrapped in a service to allow reuseability
  async getAllMusic(): Promise<Music[]> {
    try {
      const response = await fetch(this.url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('An error occurred while fetching all music:', error);
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
      console.error(`An error occurred while fetching music with id ${id}:`, error);
      return undefined;
    }
  }


submitComment(comment: string) {
  console.log(`Comment submitted: ${comment}`);
}

}
