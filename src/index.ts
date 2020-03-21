import Covid19Api from './classes/Covid19Api';
import * as countries from '../countries.json';


async function main() {
    //const c = await Covid19Api.getCountries()
    for(let country of countries) {
        console.log(country.Slug);
    }

}

//main();