import redis
from services.common import QueueClientInterface

class Redis(QueueClientInterface):
    def __init__(self, host: str, port: int):
        self._host = host
        self._port = port
        self.client = redis.Redis(
            host=self._host, 
            port=self._port
        )

    def subscribe(self, queue_name: str):
        self.pubsub = self.client.pubsub()
        self.pubsub.subscribe(queue_name)

    def get_message(self) -> str:
        return self.pubsub.get_message()
    