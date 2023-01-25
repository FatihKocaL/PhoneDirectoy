export class Contact {
    constructor() {
        this.id = 0
        this.name = ""
        this.surname = ""
        this.email = ""
        this.phoneNumber = ""
        this.photoUrl = ""
        this.birthDate = new Date()
    }
    id: number
    name: string
    email: string
    surname: string
    phoneNumber: string
    photoUrl: string
    birthDate: Date
}
