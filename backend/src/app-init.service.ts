// app-init.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user/model/user.entity';
import { RoleEntity } from './user/model/role.entity';

@Injectable()
export class AppInitService {
  constructor(
    @InjectRepository(RoleEntity)
    private roleRepository: Repository<RoleEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async seedRolesAndAssignAdmin(): Promise<void> {
    // Create roles if they don't exist
    const userRole = await this.createRoleIfNotExists('user');
    const adminRole = await this.createRoleIfNotExists('admin');
    const projectManagerRole = await this.createRoleIfNotExists('projectmanager');

    // Assign the "admin" role to a user
    const userId = 1; // Replace with the desired user ID
    await this.assignRoleToUser(userId, adminRole);
  }

  private async createRoleIfNotExists(roleName: string): Promise<RoleEntity> {
    let role = await this.roleRepository.findOne({ where: { name: roleName } });

    if (!role) {
      role = this.roleRepository.create({ name: roleName });
      await this.roleRepository.save(role);
    }

    return role;
  }

  private async assignRoleToUser(userId: number, role: RoleEntity): Promise<void> {
    const user = await this.userRepository.findOne(userId, { relations: ['roles'] });

    if (user) {
      user.roles = [...user.roles, role];
      await this.userRepository.save(user);
    } else {
      // Log an error or create the user if needed
    }
  }
}
