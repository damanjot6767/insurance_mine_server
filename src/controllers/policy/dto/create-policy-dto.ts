
interface CreatePolicyDto  {
    _id: string;
    policyNumber: number;
    policyStartDate: Date;
    policyEndDate: Date;
    policyCategoryId: string;
    companyCollectionId: string;
    userId: string;
}

export { CreatePolicyDto }

