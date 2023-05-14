import os
import json
from services.logger import logger
from services.redis import Redis
from jobs.common import JobInterface
from services.common import QueueClientInterface


class TrendCalculator(JobInterface):

    def execute(self):
        logger.info("Initializing stat accumulator job")
        while True:
            message = self._queue_client.get(self._options.get("queue_name"))
            message = json.loads(message.decode("utf-8"))
            print(message)
