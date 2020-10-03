import { Profile } from './profile.model';

export class User
{
    public token: string;
    public name: string;
    public lastname: string;
    public email: string;
    public password?: string;
    public profile: Profile;
}
