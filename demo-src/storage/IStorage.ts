export interface IStorage{
    get<T>(key:string):Promise<T|undefined>
    set<T>(key:string, item:T):Promise<void>
}