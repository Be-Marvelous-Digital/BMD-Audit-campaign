export const CONVERSION_UPLIFT = 0.02;

export interface LossEstimate {
  clientsPerMonth: number;
  revenuePerMonth: number;
  revenuePerYear: number;
}

export function estimateLoss(visitsPerMonth: number, averageTicket: number): LossEstimate {
  const clientsPerMonth = visitsPerMonth * CONVERSION_UPLIFT;
  const revenuePerMonth = clientsPerMonth * averageTicket;
  return { clientsPerMonth, revenuePerMonth, revenuePerYear: revenuePerMonth * 12 };
}
