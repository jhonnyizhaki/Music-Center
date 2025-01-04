export const generateColorFromPhone = (phoneNumber: string = "0000000000") => {
  const cleanNumber = phoneNumber.replace(/\D/g, "");

  const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];

  const seed = Array.from(cleanNumber).reduce((acc, digit, index) => {
    return (
      acc + parseInt(digit) * primes[index % primes.length] * Math.pow(2, index)
    );
  }, 0);

  const goldenRatio = 0.618033988749895;
  const hue = Math.floor((seed * goldenRatio * 360) % 360);

  const saturation = 40 + (seed % 20);
  const lightness = 55 + (seed % 40);

  return {
    hsl: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
    hex: hslToHex(hue, saturation, lightness),
    values: { hue, saturation, lightness },
  };
};

const hslToHex = (h: number, s: number, l: number) => {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
};
