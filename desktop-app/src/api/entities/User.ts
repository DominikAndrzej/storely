import {Group} from "./Group";
import {Runtime} from "inspector";
import {UserRole} from "./UserRole";

export interface User {
    id: number;
    name:string;
    surname:string;
    email:string;
    registered:Date;
    enabled:boolean;
    role:UserRole;
    group:Group;
}