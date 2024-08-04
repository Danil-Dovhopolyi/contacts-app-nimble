export interface ICreateContactPayload {
    'first name': Array<{ value: string, modifier: string, label: string }>;
    'last name'?: Array<{ value: string, modifier: string, label: string }>;
    email: Array<{ value: string, modifier: string, label: string }>;
    record_type: 'person';
    privacy: {
        edit: null;
        read: null;
    };
    owner_id: null;
}
