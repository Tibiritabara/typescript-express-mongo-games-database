# Games database: Stats accumulation and Trending calculation

The jobs to accumulate the statistics per period of time, as well as to calculate the relevance of a given game in a given timeframe were executed with Python, due to the extensive set of tools and capabilities to collect, transform, process, and analyze data. The microservices architecture of this project enables the combination of different technologies to accomplish its purpose.

## Stack

The project harnesses Python, `pipenv` for package and virtual environment management, `pandas` for data processing and exploration, and `scipy` for the ZScore calculation. It waits for events on `redis`, and it is in a continuous loop of execution.

## Project execution

### Running all components

The project can be easily executed on top of Docker and Docker compose. Please ensure these components are installed locally on your machine. The project includes a convenient `Makefile` to simplify the building process, so feel free to just execute:

```bash
make run
```

The job execution will be visible on the docker-compose logs. They will react with every event sent to the `gametrends` and `gamestats` channels on `redis`.

## How to add new rank calculation strategies

One of the core elements of the project, was to enable a flexible approach to the calculation of the ranks. To create a new calculation strategy, please create a new `class` inheriting from the `StrategyInterface` located in the `strategy.common` module. For example:

```python
from strategy.common import StrategyInterface

class NewStrategy(StrategyInterface):
        def __init__(self, options: dict = {}):
        self._options = options

    def calculate(self, data):
        # Calculate ranks and add it to the dataframe
        # Then return the dataframe
        return data
```

After implementing the class, please register the new strategy in the `strategy.factory` module, by adding a new registration line at the bottom:

```python
strategy_factory = StrategyFactory()
strategy_factory.register('new_strategy', NewStrategy)
```

Last but not least, you will be able to easily switch strategies by changing an environment variable that holds the strategy in execution. This environment variable is:

```bash
TREND_CALCULATION_STRATEGY=new_strategy
```

Now the project will harness the new strategy for rank calculations.

## How to enhance statistic accumulation

Everything harnesses a factory here, the `trends`, the `stats-accumulators`, and the calculation `strategies`. To add stat accumulation by new periods of time, feel free to create a new class that inherits from the interface `StatsAccumulatorInterface` located in the module `stats.common`. For example:

```python
from stats.common import StatsAccumulatorInterface

class HourlyAccumulation(StatsAccumulatorInterface):
    def execute(self,):
    # This should accumulate the delta statistics for the given period of time
    # and return the number of games affected. 
    # Please make this routine idempotent, enabling subsequent executions without
    # breaking the shape of the data
    return count
```

Afterward, we need to register the new `accumulator` in the factory located in `strategy.factory`:

```python
stats_accumulator_factory = StatsAccumulatorFactory()
stats_accumulator_factory.register('day', DailyAccumulation)
stats_accumulator_factory.register('month', MonthlyAccumulation)
stats_accumulator_factory.register('year', YearlyAccumulation)
```

The new accumulation strategy can be called easily by just sending a new message to the `gamestats` queue with the body

```json
{
    "period": "hourly"
}
```
