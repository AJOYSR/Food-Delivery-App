const router = require("express").Router();
const admin = require("firebase-admin");
router.get("/", (req, res) => {
    res.send("In the user Router");
});

router.get("/jwtVerification", async (req, res) => {
    if (!req.headers.authorization) {
        res.status(500).send({ msg: "Token not Found" });
    }

    const token = req.headers.authorization.split(" ")[1];
    // res.status(200).send({ token: token });

    try {
        const decodedValue = await admin.auth().verifyIdToken(token);
        if (!decodedValue) {
            res.status(500).json({
                success: false,
                msg: "Unauthorized Access",
            });
        }
        res.status(200).json({ success: true, data: decodedValue });
    } catch (err) {
        res.send({
            success: false,
            msg: `Error in extracting the token : ${err} `,
        });
    }
});

module.exports = router;
