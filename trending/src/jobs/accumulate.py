import os
import json
from services.logger import logger
from services.redis import Redis
from jobs.common import JobInterface
from services.common import QueueClientInterface
from models.database import Games, GameStats, Stats
from datetime import datetime

class StatsAccumulator(JobInterface):
    
    def execute(self):
        logger.info("Initializing stat accumulator job")
        self._queue_client.subscribe(self._options.get("queue_name"))
        while True:
            message = self._queue_client.get_message()
            if message is None:
                continue
            if message.get("type") == "subscribe":
                continue
            message = json.loads(message.get("data").decode("utf-8"))
            response = self.scan_and_accumulate()
            logger.info("Stats accumulated for {} games".format(response.get("message")))

    def scan_and_accumulate(self):
        games = Games.objects()
        count = 0
        for game in games:
            game_stats = GameStats.objects(game=game).first()
            if game_stats and game_stats.updatedAt.date() == datetime.now().date():
                continue
            if not game_stats:
                game_stats = GameStats(
                    game=game
                )
            stats = Stats(
                numberOfLikes=game.numberOfLikes,
                numberOfPlayers=game.numberOfPlayers,
            )
            game_stats.stats.append(stats)
            game_stats.updatedAt = datetime.now()
            game_stats.save()
            count += 1
        return { 
            "message": "Stats accumulated for {} games".format(count)
        }
        
