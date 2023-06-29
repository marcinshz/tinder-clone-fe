import { usersList } from "./demodata";
import { CreateUserDto, Match, User } from "./model";

const api_url = 'https://localhost:7127/';

export async function register(userData: CreateUserDto): Promise<boolean> {
    // dodać fetch jak będzie api
    return await fetch(api_url + 'api/Authorization/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    }).then((res) => {
        if (res.ok) return true;
        return false;
    });
}
export async function login(mail: string, password: string): Promise<User | null> {
    return await fetch(api_url + `api/Authorization/login?email=${mail}&password=${password}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'text/json',
        },
    })
        .then((res) => {
            return res.text();
        })
        .then(async (data: string) => {
            if (data!=="Invalid credentials") return await getUser(data);
            return null;
        });
}
export async function getUser(id: string): Promise<User> {
    return await fetch(api_url + 'User/' + id, {
        method: 'GET',
    })
        .then((res) => res.json())
        .then((data) => {
            return data;
        });
}

export async function updateUser(id: string, user: CreateUserDto): Promise<User> {
    return await fetch(`${api_url}User/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    })
        .then((res) => res.json())
        .then((data) => {
            return data;
        });
}

export async function uploadImage(img: string | ArrayBuffer) {
    const form = new FormData();
    form.append('image', img.toString().slice(22));
    return await fetch('https://api.imgbb.com/1/upload?expiration=36000&key=54ee4b60b2f6ce7eda2d30e16d5067dc', {
      method: 'POST',
      body: form
    }).then((res) => {
        return res.json()
    }).then((data) => {
        return data.data.display_url
    })
}

export async function getMatches(userId:string):Promise<Match[]>{
    return await fetch(api_url+`User/${userId}/matches`,{
        method:'GET'
    }).then((res) => {
        return res.json()
    }).then((data) => {
        return data;
    })
}
