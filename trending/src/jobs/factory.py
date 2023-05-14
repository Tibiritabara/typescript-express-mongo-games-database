from jobs.common import JobInterface
from jobs.trends import TrendCalculator
from jobs.accumulate import StatsAccumulator
from services.common import QueueClientInterface

class JobFactory:
    def __init__(self):
        self._jobs = {}
    
    def register(self, job_name: str, job: JobInterface):
        self._jobs[job_name] = job
    
    def get_instance(
            self, 
            job_name: str,
            queue_client: QueueClientInterface,
            options: dict[str, str]
        ) -> JobInterface:
        job = self._jobs.get(job_name)
        if not job:
            raise Exception(f"Job {job_name} not found")
        return job(
            queue_client,
            options,
        )
     

factory = JobFactory()
factory.register("trends", TrendCalculator)
factory.register("stats", StatsAccumulator)
