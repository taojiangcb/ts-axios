export interface IGetCollectionService<TEntity>
{
    Get():Promise<TEntity[]>
}