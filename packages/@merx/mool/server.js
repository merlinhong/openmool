const express = require('express');
const app = express();
const vm = require('vm');
const fs = require('fs').promises;
const path = require('path');

app.use(express.json());

// 保存编辑器代码的变量
let savedCode = '';

// 新增：保存编辑器代码的API
app.post('/save-code', async (req, res) => {
    const { code } = req.body;
    try {
        savedCode = code;
        // 可选：将代码保存到文件中
        await fs.writeFile(path.join(__dirname, 'savedCode.js'), code, 'utf8');
        res.json({ message: '代码保存成功' });
    } catch (error) {
        res.status(500).json({ error: '保存失败', message: error.message });
    }
});

// 新增：获取保存的代码的API
app.get('/get-saved-code', (req, res) => {
    res.json({ code: savedCode });
});

// 原有的运行脚本的API
app.post('/run-script', (req, res) => {
    const { script } = req.body;
    try {
        // 在沙箱环境中执行脚本
        const sandbox = {};
        vm.createContext(sandbox);
        vm.runInContext(script, sandbox);
        res.json({ result: '脚本执行成功', output: sandbox });
    } catch (error) {
        res.status(500).json({ error: '脚本执行失败', message: error.message });
    }
});

app.listen(3000, () => console.log('服务器运行在端口3000'));
