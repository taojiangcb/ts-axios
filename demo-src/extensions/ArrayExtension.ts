export {}
declare global {
    interface Array<T> {
        mapGroup<U>(grouped:number, callbackfn: (value: T[], index?: number) => U ): U[];
    }
}

let _mapGroup = function(array:any[], grouped:number, callbackfn: (value: any[], index?: number) => any){

    let aux:any[]=[];
    let aux_index=0;
    let aList=[];

    array.forEach((x, i)=>{
       
            if(i>0 && i%grouped === 0){
                aList.push(callbackfn(aux, aux_index++));
                aux=[]
            }
            aux.push(x);
        })
        if(aux.length)
        {
            aList.push(callbackfn(aux, aux_index++));
        }
        
    return aList;

};

// eslint-disable-next-line
Array.prototype.mapGroup = function(grouped:number, callbackfn: (value: any[], index?: number) => any){
    return _mapGroup(this, grouped, callbackfn);
}

export default {
    mapGroup:_mapGroup
}
