import { usePortfolio } from "../context/PortfolioContext";

export function useFirestore() {
  return usePortfolio();
}

export default useFirestore;
