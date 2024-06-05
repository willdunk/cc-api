import { type User as UserType, User } from "../../models/user";
import { bcryptHash } from "../../utils/hash";
import { MakeOptional } from "../../utils/ts/makeOptional";

type RequiredAttributes = 'firstName' | 'lastName' | 'email'

type OptionalAttributes = 'brokerLicenseNumber'

type NewUserInput = Pick<UserType, RequiredAttributes> & MakeOptional<UserType, OptionalAttributes> & { password: string };

export const createNewUser = async (input: NewUserInput) => {
    const passwordHash = await bcryptHash(input.password);
    const newUser = User.create({
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email,
        passwordHash,
        brokerLicenseNumber: input.brokerLicenseNumber
    });
    return newUser;
}