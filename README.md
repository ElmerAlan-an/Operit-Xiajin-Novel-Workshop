# 夏瑾小说工坊 (Xiajin Novel Workshop)

Operit ToolPkg 插件 —— Haruki 写作引擎，专攻中文小说创作。

## 功能

- **Prompt 注入**：SystemPromptComposeHook 自动注入 Haruki 写作系统（白描、有限视角、中文本土化表达）
- **7个输入菜单开关**：NSFW基础/强化/温柔化、白描基调、对白强化、思维链、输出模板
- **变量系统**：字数目标、字数模式、作者备注、风格预设、视角模式、NSFW等级
- **4个工具**：`status` / `toggle` / `setvar` / `getvar`

## 安装

1. 将本目录打包为 `.toolpkg` 或放入 Operit 的 `packages/` 目录
2. 在 Operit 中启用 `com.operit.xiajin_novel`
3. 启用子包 `xiajin_novel_writer`

## 使用

```
# 查看状态
xiajin_novel_writer:xiajin_status

# 开关模块
xiajin_novel_writer:xiajin_toggle module=nsfw_enhanced enabled=true

# 设置字数
xiajin_novel_writer:xiajin_setvar key=words_target value=2000
```

## 来源

从夏瑾 Pro 合并版角色卡脱胎而成的独立插件。

## 许可

MIT