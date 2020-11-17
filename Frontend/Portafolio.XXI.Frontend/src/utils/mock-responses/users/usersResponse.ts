import { User } from "../../mock-core/models/user.model";

export const USERS: User[] = [
    { name: 'Javier', lastname: 'Castillo', email: 'jcast@somewhere.com', password: 'abcd', token: 'dsjhd', profile: {id: 2, type: 'cliente'} },
    { name: 'Jesus', lastname: 'Belazquez', email: 'admin@sigloxxi.cl', password: '1234', token: 'dsfsdf', profile: {id: 1, type: 'admin'} },
    { name: 'Anna', lastname: 'Tinto', email: 'mesero@sigloxxi.com', password: 'abcd', token: 'sdfsdf', profile: {id: 2, type: 'mesero'} },
    { name: 'Adrian', lastname: 'Reyes', email: 'cajero@sigloxxi.cl', password: 'abcd', token: 'sdfsdf', profile: {id: 3, type: 'cajero'} },
    { name: 'Andres', lastname: 'Reyes', email: 'cocina@sigloxxi.cl', password: 'abcd', token: 'sdfsdf', profile: {id: 4, type: 'cocina'} },
];
