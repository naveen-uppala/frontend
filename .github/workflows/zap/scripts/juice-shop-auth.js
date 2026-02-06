function authenticate(helper, paramsValues, credentials) {

    var loginUrl = "https://juice-shop.herokuapp.com/rest/user/login";

    var body =
        JSON.stringify({
            email: credentials.getParam("username"),
            password: credentials.getParam("password")
        });

    var msg = helper.prepareMessage();
    msg.setRequestHeader(
        "POST " + loginUrl + " HTTP/1.1\r\n" +
        "Content-Type: application/json\r\n"
    );
    msg.setRequestBody(body);
    msg.getRequestHeader().setContentLength(body.length);

    helper.sendAndReceive(msg);

    // 🔴 HARD FAIL if auth cookie is missing
    var cookies = msg.getResponseHeader().getHeaderValues("Set-Cookie");
    if (cookies == null || cookies.toString().indexOf("token=") === -1) {
        throw "Authentication failed: token cookie not found";
    }

    return msg;
}
