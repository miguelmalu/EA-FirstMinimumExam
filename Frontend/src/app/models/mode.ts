import { User } from "./user"

export class Mode{
    _id?: string;
    username: User;
    mode: string;
    timeZone?: Date;

    constructor(username:User, mode:string){
        this.username = username;
        this.mode = mode;
    }
}