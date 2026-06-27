# 个人学术主页

这是一个适合 GitHub Pages 免费托管的静态个人主页。网站资料集中在一个文件中，提交修改后 GitHub 会自动重新发布。

## 以后如何更新资料

1. 登录 GitHub，打开本仓库。
2. 打开 [`src/content/profile.json`](src/content/profile.json)。
3. 点击右上角铅笔图标 **Edit this file**。
4. 修改内容后点击 **Commit changes**。
5. 等待约 1–3 分钟，网站会自动更新。

JSON 编辑规则：

- 所有文字放在英文双引号 `" "` 中。
- 同一列表中的多项之间要保留英文逗号 `,`。
- 最后一项后面不要加逗号。
- `avatar` 可以填写网络图片网址，也可以把图片上传到 `public/images/` 后填写 `/images/文件名.jpg`。
- 不需要的项目或论文，可以删除对应的整段 `{ ... }`。

## 本地预览

需要 Node.js 20+ 和 pnpm 9+：

```bash
pnpm install
pnpm dev
```

打开 `http://localhost:3000`。

## 自动发布

`.github/workflows/deploy-pages.yml` 会在 `main` 分支每次更新后：

1. 安装依赖；
2. 生成静态网站；
3. 发布到 GitHub Pages。

在仓库 **Settings → Pages → Build and deployment → Source** 中选择 **GitHub Actions** 即可。
