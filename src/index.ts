import Covid19Api from './classes/Covid19Api';

export default Covid19Api;

Covid19Api.getSummary()
    .then((data) => {
        //console.log(data.data)
    })
    .catch((e) => {
        //console.log(e.message)
    })

Covid19Api.getTotalCasesWorldwide()
    .then((number) => console.log(number))
    .catch(e => console.log(e.message) )