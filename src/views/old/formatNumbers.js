export function formatNumber(number) {
  if (number >= 1e6) {
    // Format as millions
    return (number / 1e6).toFixed(1) + "m";
  } else if (number >= 1e3) {
    // Format as thousands
    return (number / 1e3).toFixed(1) + "k";
  } else {
    return number.toString();
  }
}
