export class RubroBanco{
    constructor(
        public Id: number,
        public Rubro: string
    ){}
    
}



/*export class RubroBanco{
    constructor(
        public id: number,
        public rubro: string
    ){

    }
    
    static fromJson($json){
        return new RubroBanco($json.id, $json.rubro);
    }

    static fromJsonArray(json: any[]): RubroBanco[]{
        return json.map(RubroBanco.fromJson);
    }
}*/

