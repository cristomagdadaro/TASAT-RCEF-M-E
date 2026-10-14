export interface UserProps {
    id: number | string;
    name: string;
    username: string;
    email: string;
    role: string;
}

export class User {
    public readonly id: number | string;
    public readonly name: string;
    public readonly username: string;
    public readonly email: string;
    public readonly role: string;

    constructor(props: UserProps) {
        this.id = props.id;
        this.name = props.name;
        this.username = props.username;
        this.email = props.email;
        this.role = props.role;
    }

    public static fromJSON(json: any): User {
        return new User({
            id: json.id,
            name: json.name || '',
            username: json.username || '',
            email: json.email || '',
            role: json.role || 'enumerator',
        });
    }

    public toJSON(): UserProps {
        return {
            id: this.id,
            name: this.name,
            username: this.username,
            email: this.email,
            role: this.role,
        };
    }
}
