import "../../extensions/ArrayExtension"

describe("Array extensions", ()=>{
        describe("mapGroup", ()=>{
            it("mapGroup list", ()=>{              
                let input=[1,2,3,4,5,6,7,8,9];

                expect(input.mapGroup(2,x=>x)).toStrictEqual([[1,2],[3,4],[5,6],[7,8],[9]]);
                expect(input.mapGroup(3,x=>x)).toStrictEqual([[1,2,3],[4,5,6],[7,8,9]]);
                expect(input.mapGroup(9,x=>x)).toStrictEqual([input]);
                expect(input.mapGroup(15,x=>x)).toStrictEqual([input]);

            });

            it("mapGroup empty", ()=>{              
                let input:number[]=[];

                expect(input.mapGroup(2,x=>x)).toStrictEqual([]);

            });
    });
});