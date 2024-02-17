type timeStr = `${number}${"m" | "h" | "d"}`;

export const genToken = (data: any[], expiresIn: timeStr) => {
  const index = expiresIn.search(/[a-zA-Z]/);
  const [value, timeUnit] = [Number(expiresIn.slice(0, index)), expiresIn.slice(index)];
  const expirationDate = Date.now() + value * 60 * 1000 * (timeUnit === "h" ? 60 : timeUnit === "d" ? 24 * 60 : 1);

  return btoa(JSON.stringify(data) + expirationDate.toString(16));
};

export const checkToken = (token: string) => {
  const decoded = atob(token);
  const [data, expirationDate] = decoded
    .split(/\](?=[^\]]*$)/)
    .map((i, ind) => (ind ? parseInt(i, 16) : JSON.parse(i + "]")));

  return { data, expired: expirationDate < Date.now() };
};
