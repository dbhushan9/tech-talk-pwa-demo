export interface TechTalk {
   id?: string,
   title: string,
   description: string,
   speaker: string,
   tags?: string[],
   date: number,
   archived?: boolean
}

export interface RegistrationFormData {
   title?: string,
   description?: string,
   speaker?: string,
   date?: string,
}

export interface WebauthnRegistrationFormData {
   username?: string
}