import abc

class CalculateTrendInterface(abc.ABC):

    @abc.abstractmethod
    def calculate(self, data):
        pass

    @abc.abstractmethod
    def preprocess(self,):
        pass

    @abc.abstractmethod
    def store(self,):
        pass
