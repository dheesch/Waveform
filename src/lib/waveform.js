const SIZE = 256
const HARMONICS = [3, 5, 7, 9, 11]
const MAG_MIN = 0.1
const MAG_MAX = 10.0

export function generate(
  phaseShiftDegrees = 0,
) {
  const phaseShiftRadians = phaseShiftDegrees * Math.PI / 180

  let points = Array(SIZE).fill(0).map((n, i) =>
    120 * Math.sqrt(2) * Math.sin(2 * Math.PI * (i / SIZE) + phaseShiftRadians)
  )

  HARMONICS.forEach(harmonic =>
    points.forEach((point, i) =>
      points[i] += Math.sin(
        2 * harmonic * rand() * Math.PI * (i / SIZE) + phaseShiftRadians
      )
    )
  )

  return points
}

function rand() {
  return MAG_MIN + (Math.random() * (MAG_MAX - MAG_MIN)) * Math.sqrt(2)
}