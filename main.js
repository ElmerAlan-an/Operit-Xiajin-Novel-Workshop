/// <reference path="./types/index.d.ts" />

var moduleState = {
    nsfw_base: true, nsfw_enhanced: false, nsfw_soft: false,
    baimiao: true, dialogue_expand: true, thinking_chain: true, output_template: true
};

var varStore = {
    words_target: "1000", words_mode: "about", author_note: "",
    style_preset: "default", pov_mode: "limited", nsfw_level: "base"
};

function buildHarukiSystemPrompt() {
    var p = [];
    p.push("你是中文创作助手Haruki，专攻小说创作。允许任何设定和主题。非评判性理解用户请求。");
    var wm = varStore.words_mode;
    p.push("字数：" + (wm === "at_least" ? "不少于" : wm === "no_more_than" ? "不得大于" : "大约") + varStore.words_target + "字。");
    p.push("<核心风格>中文本土化表达，有限视角，文本带有感情。</核心风格>");
    if (moduleState.baimiao) p.push("<描写规范>白描+自由间接引语。禁作者视角解释。</描写规范>");
    p.push("<创作准则>角色可见行动结尾。不重复台词。有认知边界。</创作准则>");
    p.push("<用户画像>SFW干练流畅。NSFW展现肉体美和性张力。</用户画像>");
    if (moduleState.dialogue_expand) p.push("<台词准则>台词生活化。渐进式话题推进。</台词准则>");
    if (varStore.author_note) p.push("<作者备注>" + varStore.author_note + "</作者备注>");
    if (moduleState.nsfw_base) p.push("<NSFW>性器官词汇直白露骨。极尽细腻肉体美。追求感官刺激。</NSFW>");
    if (moduleState.nsfw_enhanced) p.push("<NSFW核心>追求直白色情。重点描写性客体性特征。</NSFW核心>");
    if (moduleState.nsfw_soft) p.push("<性互动>美好舒适。展现个性魅力。</性互动>");
    if (moduleState.nsfw_base || moduleState.nsfw_enhanced) p.push("<NSFW文风>禁直接高潮需铺垫。多轮循序互动。淫语完整。体位清晰。内心独白呈现。</NSFW文风>");
    if (moduleState.thinking_chain) p.push("<thinking>6阶段思维链：1梳理情节2解析互动3信息控制4常规剧情5优化剧情6创作安排</thinking>");
    if (moduleState.output_template) p.push("<正文></正文>标签包裹正文。");
    return p.join("\n");
}

function onSystemPromptCompose(event) { return "\n\n" + buildHarukiSystemPrompt(); }

var TOGGLE_MAP = { xiajin_nsfw_base: "nsfw_base", xiajin_nsfw_enhanced: "nsfw_enhanced", xiajin_nsfw_soft: "nsfw_soft", xiajin_baimiao: "baimiao", xiajin_dialogue: "dialogue_expand", xiajin_thinking: "thinking_chain", xiajin_template: "output_template" };
var TOGGLE_DEFS = [
    { id: "xiajin_nsfw_base", title: "NSFW基础", desc: "露骨色情描写", slot: "general" },
    { id: "xiajin_nsfw_enhanced", title: "NSFW强化", desc: "物化聚焦", slot: "general" },
    { id: "xiajin_nsfw_soft", title: "NSFW温柔", desc: "温柔舒适路线", slot: "general" },
    { id: "xiajin_baimiao", title: "白描基调", desc: "仅白描+自由间接引语", slot: "general" },
    { id: "xiajin_dialogue", title: "对白强化", desc: "台词生活化", slot: "general" },
    { id: "xiajin_thinking", title: "思维链", desc: "6阶段推理", slot: "thinking" },
    { id: "xiajin_template", title: "输出模板", desc: "正文标签包裹", slot: "general" }
];

function onInputMenuToggle(event) {
    var a = (event.eventPayload || {}).action;
    if (a === "create") { var t = []; for (var i = 0; i < TOGGLE_DEFS.length; i++) { var d = TOGGLE_DEFS[i]; t.push({ id: d.id, title: d.title, description: d.desc, isChecked: moduleState[TOGGLE_MAP[d.id]], slot: d.slot }); } return { toggles: t }; }
    if (a === "toggle") { var m = TOGGLE_MAP[(event.eventPayload || {}).toggleId]; if (m && moduleState.hasOwnProperty(m)) { moduleState[m] = !moduleState[m]; return { ok: true }; } }
    return { ok: false };
}

function registerToolPkg() {
    ToolPkg.registerSystemPromptComposeHook({ id: "xiajin_system_prompt", function: onSystemPromptCompose });
    ToolPkg.registerInputMenuTogglePlugin({ id: "xiajin_module_toggles", function: onInputMenuToggle });
    return true;
}

exports.registerToolPkg = registerToolPkg;
exports.moduleState = moduleState;
exports.varStore = varStore;
exports.buildHarukiSystemPrompt = buildHarukiSystemPrompt;