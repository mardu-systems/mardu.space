import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest, NextResponse } from 'next/server';

// Mock dependencies
vi.mock('@/lib/newsletter', () => ({
  saveSubscriber: vi.fn(),
  createToken: vi.fn(() => 'mock-token'),
  verifyToken: vi.fn(),
}));

vi.mock('@/lib/email', () => ({
  sendEmail: vi.fn(),
  renderEmailLayout: vi.fn((title, content) => `<html>${content}</html>`),
}));

vi.mock('node:fs', () => ({
  default: {
    existsSync: vi.fn(),
    readFileSync: vi.fn(),
  },
  existsSync: vi.fn(), // Named export for some environments
  readFileSync: vi.fn(),
}));

// Import handlers after mocking
import { POST } from '@/app/api/whitepaper/request/route';
import { GET } from '@/app/api/whitepaper/download/route';
import { saveSubscriber, verifyToken } from '@/lib/newsletter';
import { sendEmail } from '@/lib/email';
import fs from 'node:fs';

describe('Whitepaper API', () => {
  
  describe('POST /api/whitepaper/request', () => {
    beforeEach(() => {
      vi.clearAllMocks();
      // Mock fetch for CleverReach
      global.fetch = vi.fn(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve({})
      } as Response));
    });

    it('should return 400 if email is missing', async () => {
      const req = new NextRequest('http://localhost:3000/api/whitepaper/request', {
        method: 'POST',
        body: JSON.stringify({ firstName: 'Test' }),
      });

      const res = await POST(req);
      const body = await res.json();

      expect(res.status).toBe(400);
      expect(body.error).toBe('Email is required');
    });

    it('should save subscriber, send email, and return success', async () => {
      const req = new NextRequest('http://localhost:3000/api/whitepaper/request', {
        method: 'POST',
        body: JSON.stringify({ email: 'test@example.com', firstName: 'Max' }),
      });

      const res = await POST(req);
      const body = await res.json();

      expect(saveSubscriber).toHaveBeenCalledWith({ email: 'test@example.com', role: 'whitepaper_requester' });
      expect(sendEmail).toHaveBeenCalled();
      expect(res.status).toBe(200);
      expect(body.success).toBe(true);
      
      // Check if fetch was called (CleverReach)
      expect(global.fetch).toHaveBeenCalled();
    });
  });

  describe('GET /api/whitepaper/download', () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    it('should return 400 if token is missing', async () => {
      const req = new NextRequest('http://localhost:3000/api/whitepaper/download', {
        method: 'GET',
      });

      const res = await GET(req);
      const body = await res.json();

      expect(res.status).toBe(400);
      expect(body.error).toBe('Missing token');
    });

    it('should return 403 if token is invalid', async () => {
      vi.mocked(verifyToken).mockReturnValue(null);
      const req = new NextRequest('http://localhost:3000/api/whitepaper/download?token=invalid', {
        method: 'GET',
      });

      const res = await GET(req);
      const body = await res.json();

      expect(res.status).toBe(403);
      expect(body.error).toBe('Invalid or expired token');
    });

    it('should return 404 if file does not exist', async () => {
      vi.mocked(verifyToken).mockReturnValue({ email: 'test@example.com', role: 'whitepaper_download' });
      // @ts-ignore
      vi.mocked(fs.existsSync).mockReturnValue(false);

      const req = new NextRequest('http://localhost:3000/api/whitepaper/download?token=valid', {
        method: 'GET',
      });

      const res = await GET(req);
      const body = await res.json();

      expect(res.status).toBe(404);
      expect(body.error).toBe('File not found on server');
    });

    it('should return file content if everything is valid', async () => {
      vi.mocked(verifyToken).mockReturnValue({ email: 'test@example.com', role: 'whitepaper_download' });
      // @ts-ignore
      vi.mocked(fs.existsSync).mockReturnValue(true);
      // @ts-ignore
      vi.mocked(fs.readFileSync).mockReturnValue(Buffer.from('pdf-content'));

      const req = new NextRequest('http://localhost:3000/api/whitepaper/download?token=valid', {
        method: 'GET',
      });

      const res = await GET(req);
      
      expect(res.status).toBe(200);
      expect(res.headers.get('Content-Type')).toBe('application/pdf');
    });
  });
});
