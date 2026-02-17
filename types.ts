
export interface CostData {
  chocolatePrice: number;
  chocolateWeight: number;
  fillingPrice: number;
  fillingWeight: number;
  packagingPrice: number;
  packagingQuantity: number;
  producedQuantity: number;
}

export interface PricingData {
  desiredMargin: number;
  monthlyGoal: number;
}

export interface CalculationResults {
  totalCost: number;
  unitCost: number;
  salesPrice: number;
  unitProfit: number;
  trufflesNeededForGoal: number;
  totalMonthlyRevenue: number;
  totalMonthlyProfit: number;
}
