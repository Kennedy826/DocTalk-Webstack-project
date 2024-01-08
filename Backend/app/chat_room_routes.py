#!/usr/bin/env python3
""" Chat room routes """

from flask import Blueprint, request, jsonify, make_response
from functools import wraps
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt
from datetime import datetime
from models.user import User
from models.chat_room import ChatRoom
from models.chat_message import ChatMessage
from models.revoked_token import RevokedToken

room_bp = Blueprint('chat_room_routes', __name__, url_prefix='/rooms')


# user must be logged in to access chatrooms
def logged_in(func):
    """
    Decorator function that checks if a user is logged in.
    
    Parameters:
    - func: The function to be decorated.
    
    Returns:
    - wrapper: The decorated function.
    """
    @wraps(func)
    @jwt_required()
    def wrapper(*args, **kwargs):
        current_user = get_jwt_identity()

         # Check if the token JTI is in the revoked tokens
        jti = get_jwt()['jti']
        if RevokedToken.is_token_blacklisted(jti):
            return jsonify({"error": "Token has been revoked. User is logged out"}), 401
        
        return func(current_user, *args, **kwargs)
    
    return wrapper


@room_bp.route('/create_room', methods=['POST'])
@logged_in
def create_room(current_user):
    """ Creates a new chat room """
    data = request.get_json()

    room_name = data.get('room_name')
    if not room_name:
        return make_response(
            jsonify({"message": "Missing room name"}),
            400)

    if ChatRoom.get_room_by_name(room_name):
        return make_response(
            jsonify({"message": "Room already exists"}),
            400)

    new_room = ChatRoom.create_room(room_name, current_user)
    return make_response(
        jsonify({"message": f"Room {room_name} created successfully"}),
        201)


@room_bp.route('/update_room', methods=['PUT'])
@logged_in
def update_room(current_user):
    """ Updates a chat room """
    data = request.get_json()

    room_name = data.get('room_name')
    if not room_name:
        return make_response(
            jsonify({"message": "Missing room name"}),
            400)

    room = ChatRoom.get_room_by_name(room_name)
    if not room:
        return make_response(
            jsonify({"message": "Room not found"}),
            404)

    room.updated_at = datetime.now()
    room.save()

    return make_response(
        jsonify({"message": f"Room {room_name} updated successfully"}),
        200)


@room_bp.route('/delete_room', methods=['DELETE'])
@logged_in
def delete_room(current_user):
    """ Deletes a chat room """
    data = request.get_json()

    room_name = data.get('room_name')
    if not room_name:
        return make_response(
            jsonify({"message": "Missing room name"}),
            400)

    room = ChatRoom.get_room_by_name(room_name)
    if not room:
        return make_response(
            jsonify({"message": "Room not found"}),
            404)

    room.delete()

    # Mark all messages as deleted for the current user
    messages = ChatMessage.objects(room=room_name, sender=current_user)
    for message in messages:
        message.deleted_by.append(current_user)
        message.save()

    return make_response(
        jsonify({"message": f"Room {room_name} deleted successfully"}),
        200)


@room_bp.route('/get_rooms', methods=['GET'])
def get_rooms():
    """ Gets all chat rooms """
    rooms = ChatRoom.objects
    rooms_list = [room.room_name for room in rooms]
    return make_response(jsonify(rooms_list), 200)


@room_bp.route('/add_user', methods=['POST'])
@logged_in
def add_user(current_user):
    """ add a user to a room """
    data = request.get_json()

    username = data.get('username')
    room_name = data.get('room_name')
    if not username or not room_name:
        return make_response(
            jsonify({"message": "Missing username or room name"}),
            400)

    room = ChatRoom.get_room_by_name(room_name)
    if not room:
        return make_response(
            jsonify({"message": "Room not found"}),
            404)

    # Get the User document that corresponds to the username
    user = User.objects.get(username=username)
    room.users.append(user)
    room.save()

    return make_response(
        jsonify({"message": f"User {username} added to room {room_name}"}),
        200)


@room_bp.route('/remove_user', methods=['POST'])
@logged_in
def remove_user(current_user):
    """ remove a user from a room """
    data = request.get_json()

    username = data.get('username')
    room_name = data.get('room_name')
    if not username or not room_name:
        return make_response(
            jsonify({"message": "Missing username or room name"}),
            400)

    room = ChatRoom.get_room_by_name(room_name)
    if not room:
        return make_response(
            jsonify({"message": "Room not found"}),
            404)

    # Get the User document that corresponds to the username
    user = User.objects.get(username=username)
    user.delete()
    room.save()

    return make_response(
        jsonify({"message": f"User {username} removed from room {room_name}"}),
        200)
