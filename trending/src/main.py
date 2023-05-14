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
        db=os.getenv("DB_DATABASE", 'test'),
        host=os.getenv("DB_HOST", 'localhost'),
        port=int(os.getenv("DB_PORT", '27017')),
        username=os.getenv("DB_USERNAME"),
        password=os.getenv("DB_PASSWORD"),
        authentication_source=os.getenv("DB_AUTH_SOURCE", 'admin'),
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
