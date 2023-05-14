from stats.common import StatsAccumulatorInterface
from models.database import GameStats, Games, Stats
from datetime import datetime


DAILY_SLICE = 1


class DailyAccumulation(StatsAccumulatorInterface):
    def execute(self,):
        games = Games.objects()
        count = 0
        for game in games:
            game_stats = GameStats.objects(game=game).fields(slice__stats=DAILY_SLICE).first()
            # if game_stats and game_stats.updatedAt.date() == datetime.now().date():
            #     continue
            if not game_stats:
                game_stats = GameStats(
                    game=game
                )

            delta_number_of_likes = game.numberOfLikes
            delta_number_of_players = game.numberOfPlayers
            if game_stats.stats:
                delta_number_of_likes = game.numberOfLikes - game_stats.stats[0].numberOfLikes
                delta_number_of_players = game.numberOfPlayers - game_stats.stats[0].numberOfPlayers

            stats = Stats(
                numberOfLikes=delta_number_of_likes,
                numberOfPlayers=delta_number_of_players,
                createdAt=datetime.now()
            )
            game_stats.stats.append(stats)
            game_stats.updatedAt = datetime.now()
            game_stats.save()
            count += 1
        return count
