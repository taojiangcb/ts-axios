import { IDeleteService } from "./http/IDelete";
import { IUpdateService } from "./http/IUpdate";
import { IPatchService } from "./http/IPatch";
import { IPostService } from "./http/IPost";
import { IGetSingleService } from "./http/IGet.Single";
import { IGetCollectionService } from "./http/IGet.Collection";

export interface IService<TEntity, TKey=number> extends 
IGetCollectionService<TEntity>,
IGetSingleService<TEntity, TKey>,
IPostService<TEntity>,
IPatchService<TEntity, TKey>,
IUpdateService<TEntity, TKey>,
IDeleteService<TKey>{

}