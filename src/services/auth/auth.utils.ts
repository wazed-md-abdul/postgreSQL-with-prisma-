export class AuthError extends Error {
    constructor(public status: number, message: string) {
        super(message);
        this.name = "AuthError";
        
        // Ensure the prototype is correct (needed for custom errors in ES5/TS)
        Object.setPrototypeOf(this, AuthError.prototype);
    }
}
