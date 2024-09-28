const express = require("express");
// const generateCode = require('./src/codeGenerator');
const cors = require("cors");
const { exec } = require("node:child_process");
const mainRouter = require("./routes/mainRouter");
const errorRouter = require("./routes/errorRouter");
const config = require("./config");
const app = express();
// 中间件，用于解析 JSON 请求体
app
  .use(express.json())
  .use(cors())
  .use("/api", mainRouter)
  .use("/", errorRouter);

// 启动服务
app.listen(config.port, () => {
  console.log(`Server is running at http://localhost:${config.port}`);
  exec("npm run dev");
});