declare class CustomerViewModel {
    constructor(customer: any);
    isDirty: boolean;
    firstName: string;
    lastName: string;    
}
declare module 'CustomerViewModel' {
    export = CustomerViewModel;
}