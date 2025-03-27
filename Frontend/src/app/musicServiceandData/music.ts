export interface Music {
    _id?: string, 
    trackStreamUrl?: string,  //?=optional property            
    trackName: string,
    trackFile: File,
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