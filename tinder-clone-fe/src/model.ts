export enum Gender {
    Female = '0',
    Male = '1'
}

export enum Preferences {
    Female = '0',
    Male = '1',
    Both = '2'
}

// TODO replace hobbies with Array<Hobby> and sex, showingGender with gender
export interface User {
    id: number;
    mail: string;
    password: string;
    firstName: string;
    birthDate: Date;
    sex: number;
    city: string;
    aboutMe: string;
    height: number;
    education: string;
    job: string;
    photo: string;
    facebookLink: string;
    instagramLink: string;
    showingGender: number;
    ageRangeMin: number;
    ageRangeMax: number;
    showOnlyMyCity: boolean;
};

export interface CreateUserDto {
    mail: string;
    password: string;
    firstName: string;
    birthDate: string;
    sex: number;
    city: string;
    aboutMe: string;
    height: number;
    education: string;
    job: string;
    photo: string;
    facebookLink: string;
    instagramLink: string;
    showingGender: number;
}

export interface UpdateUserDto {
    mail: string;
    password: string;
    firstName: string;
    birthDate: string;
    sex: string;
    city: string;
    aboutMe: string;
    height: number;
    education: string;
    job: string;
    photo: string;
    facebookLink: string;
    instagramLink: string;
    showingGender: string;
}

export interface Liked {
    idLikedBy: number;
    idLikedWhom: number;
}

export interface Disliked {
    idDislikedBy: number;
    idDislikedWhom: number;
}

export interface Hobby {
    idUser: number;
    name: string;
}
