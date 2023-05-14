
from strategy.common import StrategyInterface
from strategy.scoring import ZScore

class StrategyFactory:
    def __init__(self):
        self._strategy = {}
    
    def register(
            self, 
            name: str, 
            strategy: StrategyInterface
        ):
        self._strategy[name] = strategy
    
    def get_instance(
            self, 
            name: str,
            options: dict[str, str] = {},
        ) -> StrategyInterface:
        strategy = self._strategy.get(name)
        if not strategy:
            raise Exception(f"Strategy `{name}` not found")
        return strategy(
            options,
        )

strategy_factory = StrategyFactory()
strategy_factory.register('zscore', ZScore)
