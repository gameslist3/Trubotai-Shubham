// Dummy credits system - manages virtual credit balance via localStorage

const CREDIT_BALANCE_KEY = "trubot_credits";
const DEFAULT_CREDITS = 5000;

export function getCreditBalance(): number {
  if (typeof window === "undefined") return 0;
  const stored = localStorage.getItem(CREDIT_BALANCE_KEY);
  if (stored === null) {
    localStorage.setItem(CREDIT_BALANCE_KEY, String(DEFAULT_CREDITS));
    return DEFAULT_CREDITS;
  }
  return parseInt(stored, 10) || 0;
}

export function deductCredits(amount: number): { success: boolean; newBalance: number } {
  const current = getCreditBalance();
  if (current < amount) {
    return { success: false, newBalance: current };
  }
  const newBalance = current - amount;
  localStorage.setItem(CREDIT_BALANCE_KEY, String(newBalance));
  return { success: true, newBalance };
}

export function addCredits(amount: number): number {
  const current = getCreditBalance();
  const newBalance = current + amount;
  localStorage.setItem(CREDIT_BALANCE_KEY, String(newBalance));
  return newBalance;
}

export function hasSufficientCredits(amount: number): boolean {
  return getCreditBalance() >= amount;
}

export function resetCredits(): number {
  localStorage.setItem(CREDIT_BALANCE_KEY, String(DEFAULT_CREDITS));
  return DEFAULT_CREDITS;
}

export { DEFAULT_CREDITS };
