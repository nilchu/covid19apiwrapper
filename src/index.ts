import Covid19Api from './classes/Covid19Api';

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