export enum Gender {
    MALE = 'Male',
    FEMALE = 'Female',
    Other = 'Other'
}

export interface User {
    id: string;
    mail: string;
    password: string;
    firstName: string;
    birthDate: Date;
    sex: number;
    city: string;
    aboutMe?: string;
    height: number;
    education?: string;
    job?: string;
    photo: string;
    facebookLink?: string;
    instagramLink?: string;
    showingGender: number;
};

export interface CreateUserDto{
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

export interface Match{
    mail: string;
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
