export function isIpValid(ip: string): boolean {
  if (!ip) return false;
  
  return (
    /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/.test(ip) &&
    ip.split('.').every((octet) => {
      const num = parseInt(octet, 10);
      return num >= 0 && num <= 255 && octet === num.toString();
    })
  );
}

export function getNetworkAddress(ip: string, mask: string): string {
  const ipOctets = ip.split('.');
  const maskOctets = mask.split('.');
  const result: number[] = [];

  for (let i = 0; i < 4; i++) {
    result.push(Number(ipOctets[i]) & Number(maskOctets[i]));
  }

  return `${result[0]}.${result[1]}.${result[2]}.${result[3]}`;
}



export function getAddressesCount(mask: string): number {
  let binaryMask = '';

  for (const octet of mask.split('.')) {
    binaryMask += Number(octet).toString(2).padStart(8, '0');
  }
  
  const zeros = 32 - binaryMask.replaceAll('0', '').length;

  if (zeros === 0) return 1;
  if (zeros === 1) return 2;

  return Math.pow(2, zeros) - 2;
}