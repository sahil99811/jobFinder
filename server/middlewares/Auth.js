const jwt=require('jsonwebtoken');
// This function is used as middleware to authenticate user requests
exports.auth = async (req, res, next) => {
	try {
			
        // const token=req.header("Authorization").replace("Bearer ", "");
		// If JWT is missing, return 401 Unauthorized response
		const token=req.cookies.token
		if (!token) {
			return res.status(401).json({ success: false, message: `Token Missing` });
		}
		try {
			// Verifying the JWT using the secret key stored in environment variables
			const decode = await jwt.verify(token,process.env.JWT_SECRET);
			// Storing the decoded JWT payload in the request object for further use
			req.user = decode;
		} catch (error) {
			// If JWT verification fails, return 401 Unauthorized response
			console.log(error);
			return res
				.status(401)
				.json({ success: false, message: "token is invalid" });
		}

		// If JWT is valid, move on to the next middleware or request handler
		next();
	} catch (error) {
		// If there is an error during the authentication process, return 401 Unauthorized response
		return res.status(401).json({
			success: false,
			message: `Something Went Wrong While Validating the Token`,
		});
	}
};


