import { IUserRepository } from 'src/infrastructure/interfaces/user.repository.interface';

export class GetUser {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(id: number) {
    return this.userRepository.findOne(id);
  }
}
