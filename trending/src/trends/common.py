import abc
from strategy.common import StrategyInterface


class CalculateTrendInterface(abc.ABC):
    def __init__(
            self,
            strategy: StrategyInterface,
            options: dict = {},
        ):
        self._options = options
        self._strategy = strategy

    @abc.abstractmethod
    def execute(self,):
        pass

    @abc.abstractmethod
    def preprocess(self,):
        pass

    @abc.abstractmethod
    def store(self,):
        pass
