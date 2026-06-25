import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { db, users } from '@jmfitnessstudio/db';

jest.mock('@jmfitnessstudio/db', () => ({
  db: {
    query: {
      users: {
        findFirst: jest.fn(),
      },
    },
    update: jest.fn(),
  },
  users: {},
  eq: jest.fn((col, val) => ({ col, val })),
}));

const mockUpdate = {
  set: jest.fn().mockReturnThis(),
  where: jest.fn().mockReturnThis(),
  returning: jest.fn(),
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);

    jest.clearAllMocks();
    (db.update as jest.Mock).mockReturnValue(mockUpdate);
  });

  describe('findById', () => {
    it('should return the user when found', async () => {
      const mockUser = { id: 'user-1', email: 'test@example.com', role: 'customer' };
      (db.query.users.findFirst as jest.Mock).mockResolvedValue(mockUser);

      const result = await service.findById('user-1');

      expect(result).toEqual(mockUser);
      expect(db.query.users.findFirst).toHaveBeenCalledTimes(1);
    });

    it('should return undefined when user does not exist', async () => {
      (db.query.users.findFirst as jest.Mock).mockResolvedValue(undefined);

      const result = await service.findById('nonexistent-id');

      expect(result).toBeUndefined();
    });
  });

  describe('updateRole', () => {
    it('should return updated user when id exists', async () => {
      const mockUser = { id: 'user-1', email: 'test@example.com', role: 'student' };
      mockUpdate.returning.mockResolvedValue([mockUser]);

      const result = await service.updateRole('user-1', 'student');

      expect(result).toEqual(mockUser);
      expect(db.update).toHaveBeenCalledWith(users);
    });

    it('should throw NotFoundException when user does not exist', async () => {
      mockUpdate.returning.mockResolvedValue([]);

      await expect(service.updateRole('nonexistent-id', 'student')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
