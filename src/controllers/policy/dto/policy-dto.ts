import { PolicyCarrierDto } from "../../policy-carrier/dto";
import { PolicyLobDto } from "../../policy-lob/dto";
import { UserDto } from "../../user/dto";
interface PolicyDto {
    _id: string;
    policyNumber: number;
    policyStartDate: Date;
    policyEndDate: Date;
    policyCategoryId: string;
    policyCompanyId: string;
    userId: string;
    createdAt?: Date;
    updatedAt?: Date;

    policyCategory?: PolicyLobDto;
    policyCompany?: PolicyCarrierDto;
    user?: UserDto
}

export { PolicyDto }


