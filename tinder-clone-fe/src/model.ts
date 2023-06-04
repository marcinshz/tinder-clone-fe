export enum Gender {
    MALE = 'Male',
    FEMALE = 'Female',
    Other = 'Other'
}

// TODO replace hobbies with Array<Hobby> and sex, showingGender with gender
export interface User {
    id: number;
    mail: string;
    password: string;
    firstName: string;
    birthDate: Date;
    sex: string;
    city: string;
    aboutMe?: string;
    height: number;
    education?: string;
    job?: string;
    photo: string;
    facebookLink?: string;
    instagramLink?: string;
    showingGender: string;
    ageRangeMin: number;
    ageRangeMax: number;
    showOnlyMyCity: boolean;
    hobbies: Array<string>;
};

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
