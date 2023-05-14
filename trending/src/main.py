import os
import json
from services.logger import logger
from services.redis import Redis
from jobs.factory import factory
import argparse
from mongoengine import connect


def parse_args():
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--job",
        type=str,
        required=True,
        help="Job name"
    )
    return parser.parse_args()


def main():
    logger.info("Initializing stats accumulator")
    args = parse_args()

    logger.info("Connecting to redis")  
    redis = Redis(
        host=os.getenv("REDIS_HOST"),
        port=os.getenv("REDIS_PORT"),
    )

    logger.info("Connecting to mongo")
    connect(
        db=os.getenv("MONGO_DB", 'test'),
        host=os.getenv("MONGO_HOST", 'localhost'),
        port=int(os.getenv("MONGO_PORT", '27017')),
        username=os.getenv("MONGO_USER"),
        password=os.getenv("MONGO_PASSWORD"),
        authentication_source=os.getenv("MONGO_AUTH_DB", 'admin'),
    )

    options = {}

    logger.info("Initializing job")
    job = factory.get_instance(
        args.job,
        redis,
        options,
    )

    job.execute()

    
if __name__ == "__main__":
    main()
