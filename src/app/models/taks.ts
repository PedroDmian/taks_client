export class Taks{
    constructor(
        public _id : string = '',
        public user_id : string,
        public image : string,
        public name : string,
        public description : string,
        public active : number,
    ) {}
}