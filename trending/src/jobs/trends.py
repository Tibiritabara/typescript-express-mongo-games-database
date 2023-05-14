import os
import json
from services.logger import logger
from jobs.common import JobInterface
from trends.factory import trending_period_factory

class TrendCalculator(JobInterface):
    def execute(self):
        logger.info("Initializing trends calculation job")
        self._queue_client.subscribe(os.getenv("TRENDS_QUEUE_NAME"))
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
                count = trending_period_factory.get_instance(
                    period, 
                    self._options
                ).execute()
            except Exception as e:
                logger.error("Error while calculating trends: {}".format(e))
                continue
            logger.info({
                    "message": "Trends calculation job completed",
                    "period": period,
                    "affected_games": count,
                })
