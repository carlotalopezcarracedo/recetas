export type CycleAction = "increment" | "reset";

export function adjustCycleCount(current: number, action: CycleAction): number {
  if (action === "reset") return 0;
  return Math.max(0, current) + 1;
}
