import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './repo/user.repository';
import { Constants } from 'src/utils/constants';

/*
Service is responsible for handle bussiness logic, database,...

UserService need have some function:
+ create a User
+ find user by Admin
+ remove user by Admin
*/


@Injectable()
export class UserService {

  constructor(private userRepository: UserRepository) {}


  create(createUserDto: CreateUserDto) {
    let user : User = new User();
    
    user.email = createUserDto.email;
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.password = createUserDto.password;
    user.role = Constants.ROLES.NORMAL_ROLE;

    return this.userRepository.saveUser(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  findUserByEmail(email : string){
    return this.userRepository.findOne({where: { email: email }});
  }
  findUserByID(id : number){
    return this.userRepository.findOneOrFail({where: {id : id}});
  }
  remove(id: number) {
    return this.userRepository.delete(id); 
  }
}
