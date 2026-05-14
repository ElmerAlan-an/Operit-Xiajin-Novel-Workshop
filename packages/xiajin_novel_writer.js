/* METADATA
{
    "name": "xiajin_novel_writer",
    "description": {
        "zh": "Haruki写作引擎——模块开关与变量管理",
        "en": "Haruki Writing Engine - module toggle & variable management"
    },
    "enabledByDefault": true,
    "tools": [
        {
            "name": "xiajin_status",
            "description": { "zh": "查看模块状态、变量和提示词摘要", "en": "View module status, variables and prompt summary" },
            "parameters": []
        },
        {
            "name": "xiajin_toggle",
            "description": { "zh": "开关写作模块: nsfw_base/enhanced/soft/baimiao/dialogue_expand/thinking_chain/output_template", "en": "Toggle a writing module" },
            "parameters": [
                { "name": "module", "description": { "zh": "模块名", "en": "Module" }, "type": "string", "required": true },
                { "name": "enabled", "description": { "zh": "是否启用", "en": "Enable?" }, "type": "boolean", "required": true }
            ]
        },
        {
            "name": "xiajin_setvar",
            "description": { "zh": "设置变量: words_target/words_mode/author_note/style_preset/pov_mode/nsfw_level", "en": "Set a variable" },
            "parameters": [
                { "name": "key", "description": { "zh": "变量名", "en": "Key" }, "type": "string", "required": true },
                { "name": "value", "description": { "zh": "变量值", "en": "Value" }, "type": "string", "required": true }
            ]
        },
        {
            "name": "xiajin_getvar",
            "description": { "zh": "读取变量（留空=全部）", "en": "Get variable(s)" },
            "parameters": [
                { "name": "key", "description": { "zh": "变量名，留空返回全部", "en": "Key, empty=all" }, "type": "string", "required": false }
            ]
        }
    ]
}
*/
/// <reference path="../types/index.d.ts" />

var main = require("../main.js");

function xiajin_status(params) {
    var prompt = main.buildHarukiSystemPrompt();
    return {
        success: true,
        modules: JSON.parse(JSON.stringify(main.moduleState)),
        variables: JSON.parse(JSON.stringify(main.varStore)),
        prompt_length: prompt.length,
        prompt_preview: prompt.substring(0, 400) + "..."
    };
}

function xiajin_toggle(params) {
    var mod = params.module;
    var enabled = params.enabled;
    if (main.moduleState.hasOwnProperty(mod)) {
        main.moduleState[mod] = enabled;
        return { success: true, module: mod, enabled: enabled, state: JSON.parse(JSON.stringify(main.moduleState)) };
    }
    return { success: false, error: "Unknown module: " + mod, available: Object.keys(main.moduleState) };
}

function xiajin_setvar(params) {
    var key = params.key;
    var value = params.value;
    if (main.varStore.hasOwnProperty(key)) {
        main.varStore[key] = value;
        return { success: true, key: key, value: value, variables: JSON.parse(JSON.stringify(main.varStore)) };
    }
    return { success: false, error: "Unknown variable: " + key, available: Object.keys(main.varStore) };
}

function xiajin_getvar(params) {
    var key = params.key;
    if (key && main.varStore.hasOwnProperty(key)) return { success: true, key: key, value: main.varStore[key] };
    if (!key) return { success: true, variables: JSON.parse(JSON.stringify(main.varStore)) };
    return { success: false, error: "Unknown variable: " + key };
}

exports.xiajin_status = xiajin_status;
exports.xiajin_toggle = xiajin_toggle;
exports.xiajin_setvar = xiajin_setvar;
exports.xiajin_getvar = xiajin_getvar;