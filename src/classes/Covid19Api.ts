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
    private static _cachingDuration: number;
    private static _cachingActive: boolean;
    private static countryArray: Array<Country>;
    
    constructor( options?: object ) {
        Covid19Api.initCountryArray();
    }

    /**
     * setter & getter
     */

    get cachingDuration() {
        return Covid19Api._cachingDuration;
    }

    set cachingDuration(duration: number) {
        Covid19Api._cachingDuration = duration;
    }

    get cachingActive() {
        return Covid19Api._cachingActive;
    }

    set cachingActive(value: boolean) {
        Covid19Api._cachingActive = value;
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
        /**
         * TODO: Implement check for caching
         */
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

    public static async getSummary() : Promise<any | object | undefined> {
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

    /**
     * custom methods
     */

     public static async getNewCasesWorldwide() : Promise<number> {
        const response = await this.getSummary();
        const countryStats: Array<any> = response.data.Countries;
        const numberNewCases: any = countryStats.reduce((prev: any, curr: any) => { return { NewConfirmed: prev.NewConfirmed + curr.NewConfirmed }});
        
        return numberNewCases.NewConfirmed;
     } 

     public static async getTotalCasesWorldwide(): Promise<number> {
         const response = await this.getSummary();
         const countryStats: Array<any> = response.data.Countries;
         const numberTotalCases: any = countryStats.reduce((prev: any, curr: any) => { return { TotalConfirmed: prev.TotalConfirmed + curr.TotalConfirmed }});

         return numberTotalCases.TotalConfirmed;
     }

}