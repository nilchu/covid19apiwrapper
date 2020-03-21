import axios, { AxiosPromise } from 'axios';

enum Status {
    confirmed,
    deaths,
    recovered
}

interface ParamsObj {
    country: string,
    status: Status;
}

export default class Covid19Api {
   
    private static baseUrl: string = 'https://api.covid19api.com';
    private static lastApiCallTimestamp: Number;
    private static cache: object = {

    }
    
    constructor( options?: object ) {

    }

    /**
     * private Methods
     */

     private static checkLastApiCall(currentTimestamp: number = Date.now()) : boolean {
        return true;
     }

    /**
     * public Methods
     */
    public static async getCountries() : Promise<void> {
        try {
            return await axios.get(this.baseUrl + '/countries');
        } catch (error) {
            console.error(error.message);
        }
    }

    public static async getSummery() : Promise<void> {
        try {
            return await axios.get(this.baseUrl + '/summary');
        } catch (error) {
            console.error(error.message);
        }
    }

    public static async getAll(): Promise<void> {
        try {
            return await axios.get(this.baseUrl + '/all');
        } catch (error) {
            console.error(error.message);
        }
    }

    public static async getCasesForCountryWithCaseType( params: ParamsObj ) : Promise<void> {
        const { country, status } = params;
        try {
            return await axios.get(this.baseUrl + '/countries/' + country + '/status/' + status);
        } catch (error) {
            console.error(error.message);
        }
    }

    public static async getCasesForCountryWithCaseTypeTotal( params: ParamsObj ) : Promise<void> {
        try {

        } catch (error) {
            
        }
    }

    public static async getCasesForCountryWithCaseTypeDayOne( params: ParamsObj ) : Promise<void> {
        try {

        } catch (error) {
            
        }
    }

    public static async getCasesForCountryWithCaseTypeFirstRecordedCase( params: ParamsObj) : Promise<void>{
        try {

        } catch (error) {
            
        }
    }

}