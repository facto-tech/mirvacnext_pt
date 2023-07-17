import {faker} from '@faker-js/faker/locale/en_AU';


class DataGeneration {

     randomFirstName = faker.name.firstName();
     randomLastName = faker.name.lastName();
     randomEmail = faker.internet.email();
     randomPhone = faker.phone.number();
     randomCompany = faker.company.companyName();
     randomPhrase = faker.hacker.phrase();
     randomNumber = faker.number.int({ min: 100, max: 100000 });

    //keeping between 1 and 28 so we dont need to rewrite the function for February
    let dateInRange = Math.floor(Math.random() * 28) + 1;
}

export default new DataGeneration();