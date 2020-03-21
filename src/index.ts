import Covid19Api from './classes/Covid19Api';


async function main() {
    const c = await Covid19Api.getCountries()
    console.log(c.data);

}

main();