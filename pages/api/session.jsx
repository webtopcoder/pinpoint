export default async (req, res) => {
  const user = req.session.get("user");
  res.json({ data: user });
};
