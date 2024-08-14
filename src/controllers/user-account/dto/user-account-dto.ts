import { UserDto } from "../../user/dto";

interface UserAccountDto {
    _id: string;
    userId: string;
    accountName: string;
    user?: UserDto;
    createdAt?: Date;
    updatedAt?: Date;
}

export { UserAccountDto }


