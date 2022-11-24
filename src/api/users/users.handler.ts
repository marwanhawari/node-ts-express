import { Request, Response, NextFunction } from "express";
import { User, UserPathParameter, UserQueryParameter } from "./users.model";
import users from "../../db/data";
import { randomUUID } from "crypto";

export async function findAll(
    req: Request<{}, {}, {}, UserQueryParameter>,
    res: Response<User[]>,
    next: NextFunction
) {
    const requestedUserAge = req.query.age;
    const requestedUserRole = req.query.role;

    let filteredUsers = users.filter((user) => {
        return (
            (!requestedUserAge || user.age == requestedUserAge) &&
            (!requestedUserRole || user.role == requestedUserRole)
        );
    });

    res.json(filteredUsers);
}

export async function findOne(
    req: Request<UserPathParameter>,
    res: Response<User>,
    next: NextFunction
) {
    const userId = +req.params.id;

    for (let user of users) {
        if (user.id == userId) {
            res.json(user);
            return;
        }
    }

    next(new Error(`Failed to find the user with id ${userId}.`));
}

export async function createOne(
    req: Request<{}, {}, User>,
    res: Response,
    next: NextFunction
) {
    const newId = Math.floor(Math.random() * 100000) + 1;
    const { firstName, lastName, age, role } = req.body;

    const newUser: User = {
        id: newId,
        firstName: firstName,
        lastName: lastName,
        age: age,
        role: role,
    };

    try {
        users.push(newUser);
        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
}

export async function updateOne(
    req: Request<UserPathParameter, {}, User>,
    res: Response,
    next: NextFunction
) {
    const userId = +req.params.id;
    const { firstName, lastName, age, role } = req.body;

    const userIndex = users.findIndex((user) => user.id == userId);

    if (userIndex == -1) {
        res.status(404).json({
            message: "The requested user ID was not found.",
        });
        return;
    }

    const updatedUser = {
        id: userId,
        firstName: firstName,
        lastName: lastName,
        age: age,
        role: role,
    };

    users[userIndex] = updatedUser;

    res.json(updatedUser);
}

export async function deleteOne(
    req: Request<UserPathParameter, {}, User>,
    res: Response,
    next: NextFunction
) {
    const userId = +req.params.id;

    const userIndex = users.findIndex((user) => user.id == userId);

    if (userIndex == -1) {
        res.status(404).json({
            message: "The requested user ID was not found.",
        });
        return;
    }

    const deletedUser = users.splice(userIndex, 1);
    res.json(deletedUser);
}
