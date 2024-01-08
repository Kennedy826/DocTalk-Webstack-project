#!/usr/bin/env python3
""" The RevokedToken module"""
from mongoengine import Document, StringField, DateTimeField
from datetime import datetime


class RevokedToken(Document):
    """
    Document representing revoked JWTs.
    """
    jti = StringField(required=True, unique=True)
    created_at = DateTimeField(default=datetime.utcnow)

    meta = {
        'collection': 'revoked_tokens',
        'indexes': ['jti'],
        'ordering': ['-created_at']
    }

    @staticmethod
    def is_token_blacklisted(jti):
        """ Check if the token JTI is in the blocklist stored in MongoDB"""
        
        return RevokedToken.objects(jti=jti).first() is not None
    
    @staticmethod
    def add_token_to_blocklist(jti):
        """ Creates and saves blocked token"""
        blocked_token = RevokedToken(jti=jti)
        blocked_token.save()
        return blocked_token