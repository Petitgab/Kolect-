import { config } from "./env.js";

//all the any in fetcher need to be changed to a type of all the data we get from the API (it was down when i made them so i couldn't)

async function fetcherApi():Promise<any>{
    let body:Response = await fetch(config.API_URL)
    let jsonBody:any = await body.json()
    return jsonBody
}

export { fetcherApi }