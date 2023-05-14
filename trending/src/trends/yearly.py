from trends.common import CalculateTrendInterface
from strategy.common import StrategyInterface
from services.logger import logger

class YearTrendCalculator(CalculateTrendInterface):
    def execute(self):
        raise Exception("Not implemented yet for year period")

    def preprocess(self, data):
        return data
    
    def store(self, data):
        return data
