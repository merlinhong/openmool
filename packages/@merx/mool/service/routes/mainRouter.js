const express = require("express");
const router = express.Router();
const generateApp = require("../vue-generator/generator/page.js");
const fs = require("fs-extra");
const path = require("path");
// GPT
router.post("/ai/chat", (req, res) => {
  const { foundationModel, messages } = req.body;
  // 示例调用
  require("../openai")(foundationModel, messages)
    .then((response) => {
      res.status(200).json({
        message: "Schema generated successfully",
        data: response,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error generating schema",
        error: error.message,
      });
    });
  // 定义出码接口
});

router.post("/generate-code", (req, res) => {
  // 获取请求体
  const requestBody = req.body;
  const result = generateApp.generateCode(requestBody);
  res.status(200).json({
    message: "Code generated successfully",
    data: result,
  });
});
// 定义出码接口
router.post("/save-schema", (req, res) => {
  // 获取请求体
  const requestBody = req.body;

  try {
    fs.writeFileSync(
      path.join(__dirname, "../database", "schema.json"),
      JSON.stringify(requestBody, null, 2)
    );
    console.log("文件写入成功！");
  } catch (error) {
    console.error("写入文件时出错:", error);
  }
  res.status(200).json({
    message: "Schema save successfully",
    code: 0,
  });
});
// 定义出码接口
router.get("/query-schema", (req, res) => {
  // 获取请求体
  const schemaData = fs.readFileSync(
    path.join(__dirname, "../database", "schema.json"),
    "utf-8"
  );
  res.status(200).send({
    message: "Schema save successfully",
    code: 0,
    data: schemaData,
  });
});

module.exports = router;
