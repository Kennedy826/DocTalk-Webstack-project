#!/usr/bin/env python3
""" Handles authentication routes """

from flask import Blueprint, request, jsonify, make_response
from models.user import User
from models.revoked_token import RevokedToken
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    jwt_required,
    get_jwt_identity,
    get_jwt
)

bp = Blueprint('auth', __name__, url_prefix='/auth')


@bp.route('/register/', methods=['POST'])
def register():
    """ Registers a new user """
    data = request.get_json()

    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if not username or not email or not password:
        return make_response(
            jsonify({"message": "Missing username, email or password"}),
            400)
    password = generate_password_hash(password)

    if User.get_user_by_email(email):
        return make_response(jsonify(
            {"message": f"User with email {email} already exists"}), 400)

    new_user = User.create_user(email, username, password)
    return make_response(
            jsonify({"message": "User created successfully"}),
            201)


@bp.route('/login/', methods=['POST'])
def login():
    """ Logs in an existing user """
    data = request.get_json()

    email = data.get('email')
    password = data.get('password')

    user = User.get_user_by_email(email)
    if user and user.password and check_password_hash(user.password, password):
        access_token = create_access_token(identity=user.email)
        refresh_token = create_refresh_token(identity=user.email)

        return make_response(jsonify(
            {"message": "Login successful",
             "access_token": access_token,
             "refresh_token": refresh_token}
        ), 200)

    else:
        return make_response(
            jsonify({"message": "Invalid username or password"}), 400)


@bp.route('/logout', methods=['GET'])
@jwt_required()
def logout():
    """ Logs out a user """
    jti = get_jwt()['jti']

    # Add the token JTI to the blocklist
    print(RevokedToken.add_token_to_blocklist(jti))

    return jsonify({"message": "Logged out successfully"})


@bp.route("/refresh")
@jwt_required(refresh=True)
def refresh():
    "Genereates a new access token"    
    current_user = get_jwt_identity()

    new_access_token = create_access_token(identity=current_user)

    return make_response(jsonify({"access_token": new_access_token}), 200)
