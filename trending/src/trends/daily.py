from trends.common import CalculateTrendInterface
from services.logger import logger
from models.database import GameStats, Games
import pandas as pd
from datetime import datetime

DAILY_SLICE = 1


class DayTrendCalculator(CalculateTrendInterface):
    def execute(self):
        data = self.preprocess()
        data = self._strategy.calculate(data)
        count = self.store(data)
        return count

    def preprocess(self):
        data = pd.DataFrame()
        game_stats = GameStats.objects().fields(slice__stats=DAILY_SLICE)
        for gs in game_stats:
            for stat in gs.stats:
                stats_obj = {
                    'gameId': gs.game.id,
                    'date': stat.createdAt,
                    'numberOfLikes': stat.numberOfLikes,
                    'numberOfPlayers': stat.numberOfPlayers,
                }
                data = pd.concat([data, pd.DataFrame([stats_obj])], ignore_index=True)
        return data
    
    def store(self, data):
        count = 0
        for index, row in data.iterrows():
            game = Games.objects(id=row['gameId']).first()
            if game:
                game.rank = row['rank']
                game.updatedAt = datetime.now()
                game.save()
                count += 1
            else:
                logger.error(f"Game with id {row['gameId']} not found")
        return count
