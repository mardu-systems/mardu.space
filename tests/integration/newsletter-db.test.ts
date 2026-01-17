import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mockDeep, mockReset, DeepMockProxy } from 'vitest-mock-extended';
import { PrismaClient } from '@prisma/client';
import { saveSubscriber, removeSubscriber } from '@/lib/newsletter';
import { prisma } from '@/lib/prisma';

// Mock the prisma module
vi.mock('@/lib/prisma', () => ({
  prisma: mockDeep<PrismaClient>(),
}));

describe('Newsletter Database Integration', () => {
  const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;

  beforeEach(() => {
    mockReset(prismaMock);
  });

  it('saveSubscriber should upsert a subscriber', async () => {
    const sub = { email: 'test@example.com', role: 'user' };
    
    await saveSubscriber(sub);

    expect(prismaMock.subscriber.upsert).toHaveBeenCalledWith({
      where: { email: sub.email },
      update: { role: sub.role },
      create: { email: sub.email, role: sub.role },
    });
  });

  it('removeSubscriber should delete a subscriber', async () => {
    const email = 'test@example.com';

    await removeSubscriber(email);

    expect(prismaMock.subscriber.delete).toHaveBeenCalledWith({
      where: { email },
    });
  });
});
