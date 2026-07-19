import { describe, expect, it } from "vitest";
import { adjustCycleCount } from "@/lib/repeatable-steps";

describe("contador manual de ciclos", () => {
  it("marca ciclos sin imponer un máximo", () => {
    expect(adjustCycleCount(0, "increment")).toBe(1);
    expect(adjustCycleCount(6, "increment")).toBe(7);
  });

  it("reinicia el contador", () => {
    expect(adjustCycleCount(4, "reset")).toBe(0);
  });
});
