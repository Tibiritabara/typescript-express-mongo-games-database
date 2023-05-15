import { param } from 'express-validator';

const trendsRequirements = {
    trends: {
        update: [
            param('period').exists().isString().isIn(['day', 'month', 'year']),
        ]
    }
};

export default trendsRequirements;
