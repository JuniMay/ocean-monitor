from locust import HttpUser, TaskSet, task, between
import uuid

class UserBehavior(TaskSet):
    def on_start(self):
        # 生成唯一用户名
        self.username = f"user_{uuid.uuid4()}"
        self.password = "test_password"
        
        # 注册用户
        response = self.client.post("/api/register", json={
            "username": self.username,
            "password": self.password,
            "role": "user"
        })
        if response.status_code == 409:
            print(f"User {self.username} already exists.")

    @task(1)
    def login(self):
        response = self.client.post("/api/login", json={
            "username": self.username,
            "password": self.password
        })
        if response.status_code == 200:
            self.client.headers.update({
                "Authorization": f"Bearer {response.json().get('access_token')}"
            })

    @task(2)
    def get_users(self):
        self.client.get("/api/users")

    @task(3)
    def add_hydrodata(self):
        self.client.post("/api/hydrodata", json={
            "location": "test_location",
            "date": "2024-06-24",
            "water_temperature": 25.0,
            "pH": 7.0,
            "dissolved_oxygen": 8.0,
            "conductivity": 100.0,
            "turbidity": 5.0,
            "permanganate_index": 10.0,
            "ammonia_nitrogen": 0.5,
            "total_phosphorus": 0.1,
            "total_nitrogen": 0.2,
            "site_condition": "good"
        })

    @task(4)
    def get_hydrodata(self):
        self.client.get("/api/hydrodata")

class WebsiteUser(HttpUser):
    tasks = [UserBehavior]
    wait_time = between(1, 5)

# 执行这个脚本前，请确保Flask服务器已经运行
