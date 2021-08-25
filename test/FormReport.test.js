/**
 * @jest-environment jsdom
 */

import { signinWithEmailAndPassword } from './functions.teste';

describe('Teste de Login Invalido', () => {
  jest.mock('../context/AuthContex',async () => {
    return {
      auth: jest.fn().mockReturnThis(),
      signInWithEmailAndPassword: jest.fn(),
    };
  });
  it('Deve Passar', async () => {
    const email = 'example@gmail.com';
    const password = '123';
    expect(signinWithEmailAndPassword(email, password)).toThrowError;
  });
});

describe('Teste de Login Correto', () => {
  jest.mock('../context/AuthContex',async () => {
    return {
      auth: jest.fn().mockReturnThis(),
      signInWithEmailAndPassword: jest.fn(),
    };
  });
  it('Deve Passar', async () => {
    const email = 'admin@bugreports.com';
    const password = 'BugReports123@';
    expect(signinWithEmailAndPassword(email, password)).toBeValid;
  });
});

