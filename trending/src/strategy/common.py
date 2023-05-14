import abc

class StrategyInterface(abc.ABC):
    @abc.abstractmethod
    def calculate(self, data):
        pass
