import axios, { AxiosPromise, AxiosStatic } from 'axios';
import * as countries from '../../countries.json';

enum Status {
    confirmed,
    deaths,
    recovered
}

interface Country {
    country: string,
    slug: string
}

interface ParamsObj {
    country: Country,
    status?: Status;
}

export default class Covid19Api {
   
    private static baseUrl: string = 'https://api.covid19api.com';
    private static lastApiCallTimestamp: Number;
    private static cache: object = {

    }
    private static countryArray: Array<Country>;
    
    constructor( options?: object ) {
        Covid19Api.initCountryArray();
        console.log(Covid19Api.countryArray);
    }

    /**
     * private Methods
     */

     private static initCountryArray(): void {
        for(let i in countries) {
            this.countryArray.push(
            { 
                country: countries[i].Country,
                slug: countries[i].Slug
            })
        }
     }

     private static checkLastApiCall(currentTimestamp: number = Date.now()) : boolean {
        return true;
     }

    /**
     * public Methods
     */
    public static async getCountries() : Promise<object | undefined> {
        try {
            return await axios.get(this.baseUrl + '/countries');
        } catch (error) {
            console.error(error.message);
        }
    }

    public static async getSummery() : Promise<object | undefined> {
        try {
            return await axios.get(this.baseUrl + '/summary');
        } catch (error) {
            console.error(error.message);
        }
    }

    public static async getAll(): Promise<object | undefined> {
        try {
            return await axios.get(this.baseUrl + '/all');
        } catch (error) {
            console.error(error.message);
        }
    }

    public static async getCasesForCountryWithCaseType( params: ParamsObj ) : Promise<object | undefined> {
        const { country, status } = params;
        try {
            return await axios.get(this.baseUrl + '/country/' + country.slug + '/status/' + status);
        } catch (error) {
            console.error(error.message);
        }
    }

    public static async getCasesForCountryWithCaseTypeTotal( params: ParamsObj ) : Promise<object | undefined> {
        const { country, status } = params;
        try {
            return await axios.get(this.baseUrl + '/total/country/' + country.slug + '/status/' + status);
        } catch (error) {
            console.error(error.message);
        }
    }

    public static async getCasesForCountryWithCaseTypeDayOne( params: ParamsObj ) : Promise<object | undefined> {
        const { country, status } = params;
        try {
            return axios.get(this.baseUrl + '/dayone/country/' + country.slug + '/status/' + status);
        } catch (error) {
            console.error(error.message)
        }
    }

    public static async getCasesForCountryWithCaseTypeFirstRecordedCase( params: ParamsObj) : Promise<void>{
        const { country, status } = params;
        try {
            return axios.get(this.baseUrl + '/total/dayone/country/' + country.slug + '/status/' + status);
        } catch (error) {
            
        }
    }

}