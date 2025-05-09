export interface FormData {
    name: string
    passport: string
    citizenship: string
    usAddress: string
    entryDate: string
    visaType: string
    sevis: string
    school: string
    schoolAddress: string
  }
  
  export interface FormErrors {
    name: string
    passport: string
    citizenship: string
    usAddress: string
    sevis: string
    school: string
  }
  
  export interface ValidationResult {
    valid: boolean
    errors: FormErrors
  }