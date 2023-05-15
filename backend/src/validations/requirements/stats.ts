import { param } from 'express-validator';

const statsRequirements = {
    stats: {
        update: [
            param('period').exists().isString().isIn(['day', 'month', 'year']),
        ]
    }
};

export default statsRequirements;
