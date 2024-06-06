export const limitBulletPosition = (
  currentXPosition: number,
  maximumXPosition: number,
) => {
  if (currentXPosition < 0) return 0
  if (currentXPosition > maximumXPosition) return maximumXPosition
  return currentXPosition
}
