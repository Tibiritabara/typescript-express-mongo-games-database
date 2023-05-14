import mongoengine
from typing import Any, List, Optional, Union
from datetime import datetime

class Games(mongoengine.Document):
    title: str = mongoengine.StringField(required=True)
    numberOfLikes: Optional[int] = mongoengine.IntField()
    numberOfPlayers: Optional[int] = mongoengine.IntField()
    rank: Optional[float] = mongoengine.FloatField()
    createdAt: Optional[datetime] = mongoengine.DateTimeField()
    updatedAt: Optional[datetime] = mongoengine.DateTimeField()
    


class Stats(mongoengine.EmbeddedDocument):
    numberOfLikes: Optional[int] = mongoengine.IntField()
    numberOfPlayers: Optional[int] = mongoengine.IntField()
    createdAt: Optional[datetime] = mongoengine.DateTimeField(default=datetime.now())

class GameStats(mongoengine.Document):
    game: Games = mongoengine.ReferenceField(Games)
    stats = mongoengine.ListField(mongoengine.EmbeddedDocumentField(Stats))
    createdAt: Optional[datetime] = mongoengine.DateTimeField(default=datetime.now())
    updatedAt: Optional[datetime] = mongoengine.DateTimeField(default=datetime.now())
