const handler = async (req: any, res: any) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
};
export default handler;
