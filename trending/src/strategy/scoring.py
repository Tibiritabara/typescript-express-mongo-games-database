from strategy.common import StrategyInterface

class ZScore(StrategyInterface):
    def __init__(self, options: dict = {}):
        self._options = options

    def calculate(self, data):
        for col in ['numberOfLikes', 'numberOfPlayers']:
            col_zscore = col + '_zscore'
            data[col_zscore] = (data[col] - data[col].mean())/data[col].std(ddof=0)
        data['score'] = data['numberOfLikes_zscore'] + data['numberOfPlayers_zscore']
        data = data.sort_values(by=['score'], ascending=False)
        data = data.reset_index(drop=True)
        data['rank'] = data.index
        return data
