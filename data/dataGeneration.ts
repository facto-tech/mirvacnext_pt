import {faker} from '@faker-js/faker/locale/en_AU';

class DataGeneration {

    const randomFirstName = faker.name.firstName();
    const randomLastName = faker.name.lastName();
    const randomEmail = faker.internet.email();
    const randomPhone = faker.phone.number();
    const randomCompany = faker.company.companyName();
    const randomPhrase = faker.hacker.phrase();
    const randomNumber = faker.number.int({ min: 100, max: 100000 });

    //keeping between 1 and 28 so we dont need to rewrite the function for February
    const dateInRange = Math.floor(Math.random() * 28) + 1;

}

export default new DataGeneration();