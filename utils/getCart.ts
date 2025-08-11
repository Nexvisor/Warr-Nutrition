import axios from "axios";

export default async function getCart(userId: string) {
  const req = await axios.get(`/api/getCart?userId=${userId}`);

  return req.data.cart ?? {};
}
