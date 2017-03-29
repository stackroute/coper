var http = require("https");

var options = {
  "method": "POST",
  "hostname": "api.taiga.io",
  "port": null,
  "path": "/api/v1/auth",
  "headers": {
    "content-type": "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
    "cache-control": "no-cache",
    "postman-token": "e8800ba4-a5a7-50b2-cd0d-c40359bbf89e"
  }
};

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.write("------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"username\"\r\n\r\nlucywave16\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"password\"\r\n\r\nlucy@123\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"type\"\r\n\r\nnormal\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW--");
req.end();
