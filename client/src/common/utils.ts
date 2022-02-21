import { XYCoord } from "react-dnd";

export function pointerIsDeepInside(
  amount: { unit: "%"; x: number; y: number },
  rect: DOMRect,
  clientOffset: XYCoord
) {
  if (amount.unit === "%") {
    amount.x = (rect.width / 100) * amount.x;
    amount.y = (rect.height / 100) * amount.y;
  }

  if (rect.x + amount.x > clientOffset.x) return false;
  if (rect.x + rect.width - amount.x < clientOffset.x) return false;
  if (rect.y + amount.y > clientOffset.y) return false;
  if (rect.y + rect.height - amount.y < clientOffset.y) return false;

  return true;
}
