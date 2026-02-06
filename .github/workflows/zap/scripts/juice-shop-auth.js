env:
  contexts:
    - name: juice-shop-context
      urls:
        - https://juice-shop.herokuapp.com
      includePaths:
        - https://juice-shop.herokuapp.com/.*

      authentication:
        method: script
        parameters:
          scriptName: juice-shop-auth   # ✅ THIS IS THE KEY FIX

      sessionManagement:
        method: cookie

      users:
        - name: admin-user
          credentials:
            username: admin@juice-sh.op
            password: admin123

scripts:
  - name: juice-shop-auth
    type: authentication
    engine: ECMAScript
    scriptInline: |
      function authenticate(helper, paramsValues, credentials) {

          var loginUrl = "https://juice-shop.herokuapp.com/rest/user/login";

          var body = JSON.stringify({
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

          // 🔴 FAIL HARD IF AUTH FAILS
          var cookies = msg.getResponseHeader().getHeaderValues("Set-Cookie");
          if (cookies == null || cookies.toString().indexOf("token=") === -1) {
              throw "Authentication failed: token cookie not found";
          }

          return msg;
      }

jobs:
  - type: spider
    parameters:
      context: juice-shop-context
      user: admin-user
      maxDuration: 5

  - type: activeScan
    parameters:
      context: juice-shop-context
      user: admin-user
      maxScanDurationInMins: 5

  - type: report
    parameters:
      template: traditional-html
      reportDir: .
      reportFile: report_html.html

  - type: report
    parameters:
      template: traditional-json
      reportDir: .
      reportFile: report_json.json

  - type: report
    parameters:
      template: traditional-md
      reportDir: .
      reportFile: report_md.md
