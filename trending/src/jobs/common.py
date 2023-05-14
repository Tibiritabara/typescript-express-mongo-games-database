import abc
from services.common import QueueClientInterface

class JobInterface(abc.ABC):
    def __init__(
            self,
            queue_client: QueueClientInterface,
            options: dict[str, str]
        ):
        self._queue_client = queue_client
        self._options = options


    @abc.abstractmethod
    def execute(self, options: dict[str, str]):
        pass
