const request = require("request");
class JWTAuthenticationClient {
  authEndPointAccess = (req, res, next) => {
    request.post(
      "https://piatto-auth.herokuapp.com/authme",
      { headers: { authorization: req.headers.authorization } },
      (err, response) => {
        if (err) {
          console.log(err);
          res.sendStatus(403);
        }
        response = JSON.parse(response.body);

        if (response.access) {
          console.log(response);
          next();
        } else {
          console.log(req.headers);
          res.sendStatus(403);
        }
      }
    );
  };
}

module.exports = JWTAuthenticationClient;
