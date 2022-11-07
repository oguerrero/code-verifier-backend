/* Defining the enum for the KataLevel. */
export enum KataLevel {
    BASIC = 'Basic',
    MEDIUM = 'Medium',
    HARD = 'Hard'
}

/* Defining the interface for the Kata object. */
export interface IKata {
    name: string
    description: string
    level: KataLevel
    intents: number
    stars: number
    creator: string // CREATOR ID
    solution: string 
    participants: string[]
}