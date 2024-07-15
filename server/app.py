from datetime import datetime
from flask_restful import Resource
from flask import Flask, request, make_response, jsonify, session
from models import db, User, Pet, Adoption
import os
from config import bcrypt

from config import app, db, api
@app.route("/")
def index():
    return "<h1>Pawfect Match</h1>"


@app.route('/logout', methods=['DELETE'])
def logout():
    session.pop('user_id', None)  # Clear the user_id from session
    return jsonify({'message': 'Logged out successfully'}), 200

@app.route('/user_pets', methods=['GET'])
def user_pets():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'error': 'User not logged in'}), 401
    
    user_pets = Pet.query.filter_by(user_id=user_id).all()
    pets_list = [pet.to_dict() for pet in user_pets]
    
    return jsonify(pets_list), 200
    
class CheckSession(Resource):

    def get(self):
        user_id = session['user_id']
        print(user_id)
        if user_id:
            user=User.query.filter(User.id==user_id).first()
            return user.to_dict(),200

        return {}, 401

api.add_resource(CheckSession, '/check_session')

#Login
class Login(Resource):

  def post(self):
        data = request.get_json()
        username = data.get('username')
        #password = data.get('password')  # You should check the password as well
        
        user = User.query.filter_by(name=username).first()
        if user: #and user.check_password(password):  # Assuming you have a method to check the password
            session['user_id'] = user.id
            return jsonify(user.to_dict())
        else:
            return jsonify({'errors': ['Invalid username or password']}), 401



api.add_resource(Login, '/login')



class Users(Resource):
    
    def get(self):
        users_list = [user.to_dict() for user in User.query.all()]

        return users_list, 200

    def post(self):
        data = request.get_json()

        new_user = User(
            name=data['username'],
            email=data['email'],
        )

        # Set the password using the password_hash property
        new_user.password_hash = data['password']

        db.session.add(new_user)
        db.session.commit()

        response_dict = new_user.to_dict()
        return response_dict, 201

api.add_resource(Users, '/users')
class CurrentUser(Resource):
    def get(self):
        user_id = session.get('user_id')
        print(user_id)
        if user_id:
            user = User.query.get(user_id)
            if user:
                return user.to_dict(), 200
        return {'error': 'User not logged in'}, 401

    
api.add_resource(CurrentUser, '/current_user')

class Pets(Resource):

    def get(self):
        adopted_pet_ids = db.session.query(Adoption.pet_id).distinct()
        available_pets = Pet.query.filter(Pet.id.notin_(adopted_pet_ids)).all()

        pets_list = [pet.to_dict() for pet in available_pets]

        return pets_list, 200

    def post(self):

        data = request.get_json()

        new_pet = Pet(
            name=data['name'],
            pet_type=data['pet_type'],
            breed=data['breed'],
            age=data['age'],
            location=data['location'],
            image_url=data['image_url'],
            description=data['description'],
            user_id = session['user_id']
        )

        db.session.add(new_pet)
        db.session.commit()

        response_dict = new_pet.to_dict()

        return response_dict, 201

api.add_resource(Pets, '/pets')

class PetsByID(Resource):
    @app.route("/pets/<int:id>", methods=['GET'])
    def get_pet_by_id(id):
        # if 'user_id' not in session:
        #     return {'error': 'Unauthorized, Need to Log in'}, 401

        pet = Pet.query.filter_by(id=id).first()

        if pet:
            return pet.to_dict(), 200
        else:
            return {"error": "Pet not found"}, 404
    @app.route("/pets/<int:id>", methods=['PATCH'])
    def patch(id):

        pet = Pet.query.filter_by(id=id).first()

        if pet:

            for attr in request.get_json():
                setattr(pet, attr, request.get_json()[attr])

            db.session.add(pet)
            db.session.commit()

            response_dict = pet.to_dict()

            return response_dict, 200
        else:
            return {"error": "Pet not found"}, 404
    @app.route("/pets/<int:id>", methods=['DELETE'])
    def delete(id):

        pet = Pet.query.filter_by(id=id).first()

        if pet:
           db.session.delete(pet)
           db.session.commit()

           return {"message": "Pet successfully deleted"}, 204
        else:
            return {"error": "Pet not found"}, 404

api.add_resource(PetsByID, '/pets/<int:id>')


class Adoptions(Resource):

    def get(self):
        adoptions_list = [adoption.to_dict() for adoption in Adoption.query.all()]
        return adoptions_list, 200

    def post(self):
        data = request.get_json()
        new_adoption = Adoption(
            user_id=data['user_id'],  
            pet_id=data['pet_id'],    
            adoption_date=data.get('adoption_date', datetime.utcnow()),  
        )
        db.session.add(new_adoption)
        db.session.commit()
        response_dict = new_adoption.to_dict()
        return response_dict, 201

api.add_resource(Adoptions, '/adoptions')

class UserAdoptions(Resource):
    def get(self):
        user_id = session.get('user_id')
        if user_id:
            adoptions = Adoption.query.filter_by(user_id=user_id).all()
            adoptions_list = []
            for adoption in adoptions:
                pet = Pet.query.get(adoption.pet_id)
                if pet:
                    adoption_dict = adoption.to_dict()
                    adoption_dict['pet'] = pet.to_dict()
                    adoptions_list.append(adoption_dict)
            return adoptions_list, 200
        return {'error': 'User not logged in'}, 401

api.add_resource(UserAdoptions, '/user_adoptions')


if __name__ == "__main__":
    app.run(port=5555, debug=True)