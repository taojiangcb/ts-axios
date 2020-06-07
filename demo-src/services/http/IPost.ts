export interface IPostService<TEntity>{
    Post(entity:TEntity):Promise<TEntity>;
}