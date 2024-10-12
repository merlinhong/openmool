const express = require("express");
const router = express.Router();
const generateApp = require("../vue-generator/generator/page.js");
const fs = require("fs-extra");
const path = require("path");
// GPT
router.post("/ai/chat", (req, res) => {
  const { foundationModel, messages, type } = req.body;
  // 示例调用
  require("../openai")(foundationModel, messages, type)
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
  const { id, schema } = req.body;

  if (!id || !schema) {
    return res.status(400).json({
      message: "Missing id or schema in request body",
      code: 1,
    });
  }

  const schemaFilePath = path.join(__dirname, "../pages", `${id}.json`);

  try {
    fs.writeFileSync(schemaFilePath, JSON.stringify(schema, null, 2));
    console.log(`Schema with id ${id} saved successfully!`);
    res.status(200).json({
      message: "Schema saved successfully",
      code: 0,
    });
  } catch (error) {
    console.error("Error writing schema file:", error);
    res.status(500).json({
      message: "Error saving schema",
      code: 2,
      error: error.message,
    });
  }
});
// 定义出码接口
router.get("/query-schema/:id", (req, res) => {
  const schemaId = req.params.id;
  const schemaFilePath = path.join(__dirname, "../pages", `${schemaId}.json`);

  try {
    if (fs.existsSync(schemaFilePath)) {
      const schemaData = fs.readFileSync(schemaFilePath, "utf-8");
      res.status(200).send({
        message: "Schema retrieved successfully",
        code: 0,
        data: JSON.parse(schemaData),
      });
    } else {
      res.status(404).send({
        message: "Schema not found",
        code: 1,
        data: null,
      });
    }
  } catch (error) {
    console.error("Error reading schema file:", error);
    res.status(500).send({
      message: "Error retrieving schema",
      code: 2,
      error: error.message,
    });
  }
});

// 获取所有页面
router.get("/pages", (req, res) => {
  const pagesDir = path.join(__dirname, "../pages");
  fs.readdir(pagesDir, (err, files) => {
    if (err) {
      return res.status(500).json({ message: "Error reading pages directory", error: err.message });
    }
    const pages = files
      .filter((file) => file.endsWith(".json"))
      .map((file) => {
        const id = path.basename(file, ".json");
        const content = fs.readJsonSync(path.join(pagesDir, file));
        return { id, name: content.pageInfo.name || id, schema: content.pageInfo.schema };
      });
    res.json({ pages });
  });
});

// 创建新页面
router.post("/pages", (req, res) => {
  const { id, name } = req.body;
  const newPagePath = path.join(__dirname, "../pages", `${id}.json`);
  const newPageContent = {
    pageInfo: {
      name,
      schema: {
        // 这里可以添加默认的页面结构
        ref: {},
        lifeCycles: {},
        state: {},
        methods: {},
        componentName: name,
        props: {
          style: {
            backgroundColor: "#fff",
          },
        },
        children: [],
        id,
        css: "",
      },
    },
  };
  fs.writeJson(newPagePath, newPageContent, (err) => {
    if (err) {
      return res.status(500).json({ message: "Error creating new page", error: err.message });
    }
    res.json({ message: "Page created successfully", id, name });
  });
});

// 更新页面名称
router.put("/pages/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const pagePath = path.join(__dirname, "../pages", `${id}.json`);
  fs.readJson(pagePath, (err, pageContent) => {
    if (err) {
      return res.status(500).json({ message: "Error reading page file", error: err.message });
    }
    pageContent.pageInfo.name = name;
    pageContent.pageInfo.schema.componentName = name;

    fs.writeJson(pagePath, pageContent, (err) => {
      if (err) {
        return res.status(500).json({ message: "Error updating page name", error: err.message });
      }
      res.json({ message: "Page name updated successfully", id, name });
    });
  });
});

// 删除页面
router.delete("/pages/:id", (req, res) => {
  const { id } = req.params;
  const pagePath = path.join(__dirname, "../pages", `${id}.json`);
  fs.remove(pagePath, (err) => {
    if (err) {
      return res.status(500).json({ message: "Error deleting page", error: err.message });
    }
    res.json({ message: "Page deleted successfully", id });
  });
});

module.exports = router;
