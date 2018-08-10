/**
 * Helper
 */
export const transformLevel = (level: string): string => {
  switch (level) {
    case '1':
      return '普通會員';
    case '2':
      return '高級會員';
    case '3':
      return 'VVIP';
    default:
      return 'WHO ARE YOU';
  }
};
