const request = require('request');

module.exports = function (options) {
  let expires_offset = options.COOKIE_EXPIRATION_OFFSET;
  const resource = options.COOKIE_SIGNER_RESOURCE;
  const signer = options.COOKIE_SIGNER_URL;
  const domain = options.COOKIE_SIGNER_DOMAIN;
  const keyId = options.COOKIE_SIGNER_KEYID;
  const user = options.COOKIE_SIGNER_USER;
  const pass = options.COOKIE_SIGNER_PASS;

  if (typeof expires_offset === 'string') {
    expires_offset = parseInt(expires_offset);
  }

  const setCookie = (cookie, domain, expires, req, res) => {
    const crumbs = cookie.split(';');
    const nibble = crumbs[0].split('=');
    const options = { httpOnly: true, path: '/', domain: domain, expires: expires };
    // console.log( nibble[0], nibble[1], options  );
    res.cookie(nibble[0], nibble[1], options);
  };

  return function (req, res, next) {
    const expires = new Date(Date.now() + expires_offset);

    const data = JSON.stringify({ resource: resource, domain: domain, keyId: keyId, expires: expires });
    const post = {
      url: signer,
      body: data,
      auth: {
        user: user,
        pass: pass
      }
    };

    if (req.cookies['CloudFront-Policy']) {
      // console.log('---this is an if -----',req.url);
      next();
    } else {
      // console.log('---this is an else -----',req.url);

      request.post(post, (error, response, body) => {
        if (error) next();
        if (!error && response.statusCode == 200) {
          const cookies = response.headers['set-cookie'];
          cookies.forEach(cookie => {
            setCookie(cookie, domain, expires, req, res);
          });
          next();
        } else {
          // console.error(response);
          next();
        }
      });
    }
  };
};
