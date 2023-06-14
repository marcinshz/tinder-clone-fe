import { usersList } from "./demodata";
import { User } from "./model";

export async function Login(username: string, password: string): Promise<User> {
    // dodać fetch jak będzie api
    return usersList[0]
}
export async function Register(username: string, password: string): Promise<User> {
    // dodać fetch jak będzie api
    return usersList[0]
}