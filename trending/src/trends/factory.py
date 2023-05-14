import os
from trends.common import CalculateTrendInterface
from trends.daily import DayTrendCalculator
from trends.monthly import MonthTrendCalculator
from trends.yearly import YearTrendCalculator
from strategy.factory import strategy_factory

class TrendingPeriodFactory:
    def __init__(self):
        self._calculator = {}
    
    def register(
            self, 
            trend_period: str, 
            calculator: CalculateTrendInterface
        ):
        self._calculator[trend_period] = calculator
    
    def get_instance(
            self, 
            trend_period: str,
            options: dict[str, str]
        ) -> CalculateTrendInterface:
        calculator = self._calculator.get(trend_period)
        if not calculator:
            raise Exception(f"Calculator for period {trend_period} not found")
        
        return calculator(
            strategy_factory.get_instance(os.getenv("TREND_CALCULATION_STRATEGY")),    
            options,
        )

trending_period_factory = TrendingPeriodFactory()
trending_period_factory.register('day', DayTrendCalculator)
trending_period_factory.register('month', MonthTrendCalculator)
trending_period_factory.register('year', YearTrendCalculator)
