export class CreationError extends Error {
    public readonly place: string;

    constructor(message: string, place: string) {
        super(message)
        this.place = place
    }
}