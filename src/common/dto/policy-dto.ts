import { AvailableGenders, AvailableUserRoles, UserGendersEnum, UserRolesEnum } from "../../constants";

interface PolicySheetDataDto {
    policy_number: string;
    policy_start_date: Date;
    policy_end_date: Date;

    agent: string;

    company_name: string;

    category_name: string;

    email: string;
    firstname: string;
    lastname?: string;
    dob: Date;
    address?: string;
    phone: string;
    state?: string;
    zip?: string;
    gender?: typeof UserGendersEnum; 
    userType: typeof UserRolesEnum;

    account_name: string;

}

export { PolicySheetDataDto }