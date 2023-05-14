from trends.common import CalculateTrendInterface
from strategy.common import StrategyInterface
from services.logger import logger

class MonthTrendCalculator(CalculateTrendInterface):
    def execute(self):
        raise Exception("Not implemented yet for month period")
        return {}

    def preprocess(self, data):
        return data
    
    def store(self, data):
        return data
