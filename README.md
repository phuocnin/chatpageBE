cấp lại access token thông qua refresh token: lấy refresh token từ cookie -> giải mã -> user id -> user -> access token

npm install cookie-parser

cấu hình cookie-parser
-> req.cookies.refreshtoken để lấy refreshtoken từ cookie