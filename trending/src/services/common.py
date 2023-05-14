
import abc

class QueueClientInterface(abc.ABC):
    @abc.abstractmethod
    def subscribe(self, queue_name: str):
        pass

    @abc.abstractmethod
    def get_message(self) -> str:
        pass
