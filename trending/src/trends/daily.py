from trends.interface import CalculateTrendInterface
from strategy.interface import StrategyInterface

class DailyTrend(CalculateTrendInterface):
    def __init__(
            self,
            strategy: StrategyInterface,
        ):
        self.strategy = strategy

    def calculate(self, data):
        return data.groupby(data.index.date).mean()

    def preprocess(self, data):
        return data
    
    def store(self, data):
        return data
