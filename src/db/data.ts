import { UserRole } from "../api/users/users.model";

let users = [
    {
        id: 1,
        firstName: "John",
        lastName: "Smith",
        age: 25,
        role: UserRole.admin,
    },
    {
        id: 2,
        firstName: "Bob",
        lastName: "Jones",
        age: 30,
        role: UserRole.regular,
    },
    {
        id: 3,
        firstName: "Mike",
        lastName: "Lee",
        age: 15,
        role: UserRole.admin,
    },
];

export default users;
