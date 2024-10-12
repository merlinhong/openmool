const OpenAi = require("openai"); // 导入OpenAi模块
const { createJsonTranslator, createLanguageModel } = require("typechat");
const { createTypeScriptJsonValidator } = require("typechat/ts");
const fs = require("fs-extra");
const path = require("path");
const { log } = require("util");
const apiKey = "sk-REvk8QMg5OdzsOVoBJVEsjEOMP6reNQ1GaKs7KEHd2zFJ7nc"; // 替换为你的 API 密钥
const url = "https://api.chatanywhere.tech/v1/chat/completions/"; // OpenAI Chat API 端点

// // // openAi代码
// const client = new OpenAi({
//   apiKey, // 设置API密钥
//   baseURL: "https://api.chatanywhere.tech/v1", // 设置API基础URL
// });
async function formatInputToSchema(model, prompt,type) {
  console.log(prompt);
  
  const Model = createLanguageModel({
    OPENAI_MODEL: model.model,
    OPENAI_API_KEY: apiKey,
    OPENAI_ENDPOINT: url,
  });
  let schema;
  if(type==='表单'){
    schema = fs.readFileSync(path.join(__dirname, "./formSchema.ts"), "utf8");
  }else{
    schema = fs.readFileSync(path.join(__dirname, "./schema.ts"), "utf8");
  }
  const translator = createJsonTranslator(Model, {
    getSchemaText() {
      return schema;
    },
    getTypeName() {
      return "Col";
    },
    validate(json) {
      return createTypeScriptJsonValidator(schema, "Col").validate(json);
    },
  });

  try {
    const response = await translator.translate(prompt);
    
    if (response.success) {
      return response.data;
    }else{
      return response
    }
  } catch (error) {
    console.log('error:',error);
    
    throw new Error("error");
  }
}
// async function getChatResponse(foundationModel, messages) {
//   const chatCompletion = await client.chat.completions.create({
//     messages,
//     model: "gpt-3.5-turbo",
//   });

//   // if (!response.ok) {
//   //   const errorText = await response.text();
//   //   throw new Error(`Error: ${response.status} - ${errorText}`);
//   // }

//   // const data = await response.json();
//   return chatCompletion.choices[0].message.content; // 返回模型的回复
// }
module.exports = formatInputToSchema;
