export function asXApproachesTOutputApproachesC(
  x: number,
  t: number,
  c: number,
  slope: number,
  flip?: boolean
) {
  //https://www.desmos.com/calculator/b5lysp7oku

  let output = c * (x / t) ** slope;

  //Flip means x begin from C and approaches t
  if (flip) output = -output + c;
  return output;
}
