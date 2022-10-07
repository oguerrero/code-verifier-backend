import { BasicResponse } from "../types";

export interface IHelloController {
    getMessage(name?: string): Promise<BasicResponse>
    // + functionality
}

export interface IGoodByeController {
    getMessage(name?: string): Promise<BasicResponse>
    // + functionality
}