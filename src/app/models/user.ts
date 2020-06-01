export class User{
    constructor(
        public _id : string,
        public username : string,
        public email : string,
        public password : string,
        public name : string,
        public lastname : string,
        public image : string,
        public active : number
    ) {}
}