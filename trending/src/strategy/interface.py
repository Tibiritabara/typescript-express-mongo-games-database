import abc

class StrategyInterfafe(abc.ABC):
    @abc.abstractmethod
    def calculate(self, data):
        pass
