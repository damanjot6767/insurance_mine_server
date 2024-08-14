import { UserGendersEnum, UserRolesEnum } from "../../../constants";
interface UserDto {
    _id: string;
    email: string;
    firstName: string;
    lastName?: string;
    dob: Date;
    address: String;
    phoneNumber: string;
    state: string;
    zipCode: string;
    gender?: typeof UserGendersEnum 
    userType: typeof UserRolesEnum;
    createdAt?: Date;
    updatedAt?: Date;
}

export { UserDto }


