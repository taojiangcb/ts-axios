export interface IDeleteService<TKey=number>{
    Delete(key:TKey):Promise<void>;
}