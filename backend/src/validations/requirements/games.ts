import { body, param } from 'express-validator';

const gamesRequirements = {
    games: {
        create: [
            body('attributes.title').exists().isString(),
            body('attributes.description').isString().optional({ nullable: true }),
            body('attributes.numberOfLikes').isNumeric().optional({ nullable: true }),
            body('attributes.numberOfPlayers').isNumeric().optional({ nullable: true }),
        ],
        findById: [
            param('id').exists().isMongoId(),
        ],
        update: [
            param('id').exists().isMongoId(),
            body('attributes.title').exists().isString(),
            body('attributes.description').isString().optional({ nullable: true }),
            body('attributes.numberOfLikes').isNumeric().optional({ nullable: true }),
            body('attributes.numberOfPlayers').isNumeric().optional({ nullable: true }),
        ],
        search: [
            param('page[number]').isNumeric().optional({ nullable: true }),
            param('page[size]').isNumeric().optional({ nullable: true }),
        ],
        patch: [
            param('id').exists().isMongoId(),
            body('*.op').exists().isString().isIn([
                'add', 
                'remove', 
                'replace', 
                'replace',
                'move',	
                'copy',
                'test',
                'inc',
            ]),
            body('*.path').exists().isSlug(),
            body('*.value').optional({ nullable: true }),
        ],
        delete: [
            param('id').exists().isMongoId(),
        ]
    }
};

export default gamesRequirements;
