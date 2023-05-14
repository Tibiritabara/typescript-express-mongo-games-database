import abc


class StatsAccumulatorInterface(abc.ABC):
    def __init__(
            self,
            options: dict = {},
        ):
        self._options = options

    @abc.abstractmethod
    def execute(self,):
        pass
