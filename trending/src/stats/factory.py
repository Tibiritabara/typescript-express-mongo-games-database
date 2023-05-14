import os
from stats.common import StatsAccumulatorInterface
from stats.daily import DailyAccumulation
from stats.monthly import MonthlyAccumulation
from stats.yearly import YearlyAccumulation


class StatsAccumulatorFactory:
    def __init__(self):
        self._accumulator = {}
    
    def register(
            self, 
            accumulation_period: str, 
            stats_accumulator: StatsAccumulatorInterface
        ):
        self._accumulator[accumulation_period] = stats_accumulator
    
    def get_instance(
            self, 
            accumulation_period: str,
            options: dict[str, str]
        ) -> StatsAccumulatorInterface:
        stats_accumulator = self._accumulator.get(accumulation_period)
        if not stats_accumulator:
            raise Exception(f"Accumulator for period {accumulation_period} not found")
        return stats_accumulator(
            options,
        )

stats_accumulator_factory = StatsAccumulatorFactory()
stats_accumulator_factory.register('day', DailyAccumulation)
stats_accumulator_factory.register('month', MonthlyAccumulation)
stats_accumulator_factory.register('year', YearlyAccumulation)
