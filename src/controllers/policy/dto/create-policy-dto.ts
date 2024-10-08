
interface CreatePolicyDto  {
    _id: string;
    policyNumber: string;
    policyStartDate: Date;
    policyEndDate: Date;
    policyCategoryId: string;
    policyCompanyId: string;
    userId: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export { CreatePolicyDto }

