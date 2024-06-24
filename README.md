# 海洋牧场智慧可视化系统

2024 NKU 软件工程课程项目。

使用 React + TypeScript + Flask + MySQL 实现的海洋牧场智慧可视化系统。

GitHub 地址：[https://github.com/JuniMay/ocean-monitor](https://github.com/JuniMay/ocean-monitor)

## 运行

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

或者，使用Docker:

```bash
docker-compose up --build
```

已经挂载容器的`/app`目录到`client`和`server`，直接更新代码可触发Flask和React的热重载功能。

我们使用locust进行压力和并发测试：

```bash
pip install locust
locust -f scripts/load_test.py --host=http://127.0.0.1:11451/
```

之后访问[http://0.0.0.0:8089](http://0.0.0.0:8089)即可在locust的图形界面上进行并发测试。

## 项目运行界面

![主要信息](./screenshots/0.png)
![数据中心](./screenshots/1.png)
![水下系统](./screenshots/2.png)
