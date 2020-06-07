export interface IPatchService<TEntity, TKey=number>{
    Patch<T>(key:TKey, entity:T):Promise<TEntity>;
}