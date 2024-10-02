import { IUserRepository } from 'src/infrastructure/repositories/user.repository.interface';

export class GetUser {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(id: number) {
    return this.userRepository.findOne(id);
  }
}
