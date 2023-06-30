import { getBankAccount, InsufficientFundsError, SynchronizationFailedError, TransferFailedError } from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const testBalance = 1000;
    expect(getBankAccount(testBalance).getBalance()).toBe(testBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const testBalance = 1000;
    expect(() => getBankAccount(testBalance).withdraw(testBalance + 1)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const testBalance = 1000;
    expect(() => getBankAccount(testBalance).transfer(testBalance + 1, getBankAccount(0))).toThrow();
  });

  test('should throw error when transferring to the same account', () => {
    const testBalance = 1000;
    const testAccount = getBankAccount(testBalance);
    expect(() => testAccount.transfer(testBalance, testAccount)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const testDeposit = 100;
    expect(getBankAccount(0).deposit(testDeposit).getBalance()).toBe(testDeposit);
  });

  test('should withdraw money', () => {
    const testBalance = 1000;
    expect(getBankAccount(testBalance).withdraw(testBalance).getBalance()).toBe(0);
  });

  test('should transfer money', () => {
    const testBalance = 1000;
    const testAccount = getBankAccount(0);
    getBankAccount(testBalance).transfer(testBalance, testAccount);
    expect(testAccount.getBalance()).toBe(testBalance);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const balance = await getBankAccount(0).fetchBalance();
    if (balance !== null) expect(typeof balance).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    expect.assertions(1);
    try {
      const testBalance = 1000;
      const testAccount = getBankAccount(testBalance);
      await testAccount.synchronizeBalance();
      expect(testAccount.getBalance()).not.toBe(testBalance);
    } catch (err) {
      expect(err).toBeInstanceOf(SynchronizationFailedError);
    }
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    expect.assertions(1);
    try {
      const testBalance = 1000;
      const testAccount = getBankAccount(testBalance);
      await testAccount.synchronizeBalance();
      expect(testAccount.getBalance()).not.toBe(testBalance);
    } catch (err) {
      expect(err).toBeInstanceOf(SynchronizationFailedError);
    }
  });
});
