import os
import json
from services.logger import logger
from services.redis import Redis
from jobs.common import JobInterface
from services.common import QueueClientInterface
from models.database import Games, GameStats, Stats
from datetime import datetime
from stats.factory import stats_accumulator_factory

class StatsAccumulator(JobInterface):
    
    def execute(self):
        logger.info("Initializing stat accumulator job")
        self._queue_client.subscribe(os.getenv("STATS_QUEUE_NAME"))
        while True:
            message = self._queue_client.get_message()
            if message is None:
                continue
            if message.get("type") == "subscribe":
                continue
            message = json.loads(message.get("data").decode("utf-8"))
            period = message.get('period', None)
            if period not in ['day', 'month', 'year']:
                logger.error("Period `{}` not supported".format(period))
                continue
            try:
                count = stats_accumulator_factory.get_instance(
                    period, 
                    self._options
                ).execute()
            except Exception as e:
                logger.error("Error while accumulating stats: {}".format(e))
                continue
            logger.info("Stats accumulated for {} games".format(count))
