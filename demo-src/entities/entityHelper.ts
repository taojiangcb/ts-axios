export class entityHelper<T=any>{
    private entity:T;
    /**
     *
     */
    constructor(entity:T) {
        this.entity=entity; 
    }

    setValue<V>(field:string, value:V){
        (this.entity as any)[field]=value;
    }
}