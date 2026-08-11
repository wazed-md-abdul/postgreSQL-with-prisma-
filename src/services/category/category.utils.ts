export class CategoryError extends Error {
    constructor(public status: number, message: string) {
        super(message);
        this.name = "CategoryError";
        
        // Ensure the prototype is correct (needed for custom errors in ES5/TS)
        Object.setPrototypeOf(this, CategoryError.prototype);
    }
}
