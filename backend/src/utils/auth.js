import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  console.log("Got to auth: ", req.body);
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;
    console.log("isCustomAuth: ", isCustomAuth);

    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, "test");
      req.userId = decodedData?._id;
    } else {
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
    }
    console.log(decodedData)
    console.log(req.userId)

    next();
  } catch (error) { }
};

export default auth;
