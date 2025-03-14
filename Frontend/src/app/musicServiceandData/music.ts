export interface Music {
    _id: string,               
    trackName: string,
    trackLink: string,
    artist: string,
    album: string,
    recordedDate: string,     
    coverArt: string,
    sourcedFrom: string,   
    genre: string,
    availableForSale: boolean,  
    price: number,
    comment: string,
    postedBy: any | null,      
    createdAt: string,         
    updatedAt: string,         
    __v: number                
}