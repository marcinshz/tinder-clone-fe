import { faker } from '@faker-js/faker';
import { User } from './model';

export const createRandomUser = (): User => {
    const id = faker.number.int();
    const firstName = faker.person.firstName();
    const mail = faker.internet.email({ firstName });
    const password = 'password'
    const birthDate = faker.date.birthdate({ min: 18, max: 97 });
    const sex = faker.person.sex();
    const city = faker.location.city();
    const aboutMe = faker.lorem.paragraph(2);
    const height = faker.number.int({ min: 155, max: 195 });
    const education = "education";
    const job = faker.person.jobTitle();
    const photo = faker.image.avatar();
    const facebookLink = "facebook.com";
    const instagramLink = "instagram.com";
    const showingGender = faker.person.gender();
    const ageRangeMin = faker.number.int({ min: 18, max: 23 });
    const ageRangeMax = faker.number.int({ min: 23, max: 97 });
    const showOnlyMyCity = false;
    const hobbies = faker.helpers.arrayElements(['music', 'sport', 'business', 'running', 'self-development'], { min: 1, max: 4 });

    return {
        id,
        mail,
        password,
        firstName,
        birthDate,
        sex,
        city,
        aboutMe,
        height,
        education,
        job,
        photo,
        facebookLink,
        instagramLink,
        showingGender,
        ageRangeMin,
        ageRangeMax,
        showOnlyMyCity,
        hobbies,
    }
}

export const usersList: Array<User> = []

for (let i = 0; i < 25; i++) {
    usersList.push(createRandomUser())
}