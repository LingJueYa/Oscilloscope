## 在GitHub上设置使用GitHub Actions实现React项目在代码提交后自动进行CI/CD流程，包括运行 npm install 、npm run build 并将构建结果部署到Vercel。

#### 一、在 `React` 项目根目录下创建 `.github/workflows/ci-cd.yml` 文件，这是GitHub Actions 的工作流的配置文件。

#### 二、编辑 `ci-cd.yml` 文件: 在 ci-cd.yml 文件中添加以下内容

```
name: CI/CD
on:
  push:
    branches: [main] 
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3
      - name: Install dependencies
        run: npm ci
      - name: Build production bundle
        run: npm run build --if-present
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@master
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-project-id: "你在vercel创建网站的名字"
          vercel-args: "--prod"

```

#### 三、设置环境变量 : 在GitHub仓库的“Settings”>“Secrets”中添加一个`Secret`

**`VERCEL TOKEN`: 登录Vercel，进入个人设置(https://vercel.com/account/tokens)，创建一个新Token并赋予足够的权限，将其复制并粘贴到GitHub仓库Secrets中的 VERCEL TOKEN字段。**

#### 四、将最新的代码推送到Github

#### 五、注意事项：

#### 1、如果CI/CD在运行 npm ci 命令时遇到了以下错误

```
Run npm ci
npm ERR! code EUSAGE
npm ERR! 
npm ERR! The `npm ci` command can only install with an existing package-lock.json or
npm ERR! npm-shrinkwrap.json with lockfileVersion >= 1. Run an install with npm@5 or
npm ERR! later to generate a package-lock.json file, then try again.
```

**因为`npm ci` 命令要求项目中必须存在一个有效的 `package-lock.json` 文件且该文件的 `lockfileVersion` 应>= 1。**

**如果没有package-lock.json文件，可以在本地使用 npm i 生成。**

**如果是使用 cnpm 则需要注意：使用 cnpm i 并不会生成 package-lock.json 文件，请使用 npm i**



#### 2、如果在程序目录结构中使用了../../xxx.json的方法引入json文件

**需要给react配置rollup，否则无法正确读取到json文件**

**（安装 `rollup`，并将下面的代码粘贴进 rollup.config.js）**

```
npm i @rollup/plugin-json
```

```
import json from "@rollup/plugin-json";

export default {
  // 其他配置...
  plugins: [
    json(), // 添加此行
    // 其他插件...
  ],
};

```

 