export interface IUpdateService<TEntity, TKey=number>{
    Update(key:TKey,entity:TEntity):Promise<TEntity>;
}