import Covid19Api from './classes/Covid19Api';
import { CountryEnum, StatusEnum } from './constants/enums';

export default Covid19Api;


/**
 * Playground
 */

// Covid19Api.getSummery()
//     .then((data) => {
//         //console.log(data.data)
//     })
//     .catch((e) => {
//         //console.log(e.message)
//     })

Covid19Api.getTotalDeathsWorldwide()
    .then((number) => console.log(number))
    .catch(e => console.log(e.message) )

Covid19Api.getCasesForCountryWithCaseType({ country: CountryEnum.Germany, status: StatusEnum.DEATHS })
    .then(response => {
        console.log((response as any).data)
    })
    .catch(e => console.log(e.message))