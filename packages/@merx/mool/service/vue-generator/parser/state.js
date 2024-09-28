const { UNWRAP_QUOTES } = require("../constant");
const { transformType } = require("./state-type");
const traverseState = (current, description) => {
  if (typeof current !== "object") return;

  if (Array.isArray(current)) {
    current.forEach((prop) => traverseState(prop, description));
  } else if (typeof current === "object") {
    Object.keys(current || {}).forEach((prop) => {
      if (Object.prototype.hasOwnProperty.call(current, prop)) {
        // 解析协议中的类型
        transformType(current, prop, description);
        traverseState(current[prop], description);
      }
    });
  }
};

const { start, end } = UNWRAP_QUOTES;

const unwrapExpression = (slotsValue) =>
  slotsValue.replace(new RegExp(`"${start}(.*?)${end}"`, "g"), (match, p1) =>
    p1.replace(/\\"/g, '"').replace(/\\r\\n|\\r|\\n/g, "")
  );

module.exports = { traverseState, unwrapExpression };
