# 海洋牧场智慧可视化系统

2024 NKU 软件工程课程项目。

使用 React + TypeScript + Flask + MySQL 实现的海洋牧场智慧可视化系统。

GitHub 地址：[https://github.com/JuniMay/ocean-monitor](https://github.com/JuniMay/ocean-monitor)

## 运行

### 手动安装

确保安装了 Node.js 以及 MySQL。

首先在 `server/app.py` 中配置数据库连接信息。之后运行以下命令：

```bash
cd server
pip install -r requirements.txt
python app.py
```

然后在 `client` 目录下运行：

```bash
npm install
npm start
```

### 使用 Docker

```bash
docker-compose up --build
```

Docker端口映射如下：

- Flask 服务器: `localhost:11451` 映射到对应的 Docker 容器的端口 `5000`
- React 客户端: `localhost:19198` 映射到对应的 Docker 容器的端口 `3000`
- MySQL 数据库: `localhost:23306` 映射到对应的 Docker 容器的端口 `3306`
- Locust 测试: `localhost:18089` 映射到对应的 Docker 容器的端口 `8089`

请注意，进行性能测试时请在 `docker-compose.yml` 中配置服务端环境变量 `DEPLOY=production` 以启用 gunicorn 以获得最佳性能。

已经挂载容器的`/app`目录到`client`和`server`，直接更新代码可触发Flask和React的热重载功能。

## 项目运行界面

![主要信息](./screenshots/0.png)
![数据中心](./screenshots/1.png)
![水下系统](./screenshots/2.png)
