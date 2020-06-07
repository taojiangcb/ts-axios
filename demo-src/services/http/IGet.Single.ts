export interface IGetSingleService<TEntity, TKey=number>
{
    GetSingle(key:TKey):Promise<TEntity>
}