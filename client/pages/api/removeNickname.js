import cookie from "cookie";

export default (req,res) => {
    // req.body.token

    res.setHeader("Set-Cookie", cookie.serialize("token", req.body.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        expires: new Date(0),
        saneSite: "strict",
        path: "/"
    }));
    res.statusCode = 200;
    res.json({success: true });
}