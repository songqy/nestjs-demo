

export default class Utils {
  static getIp(reqIp: string): string {
    let ip: string = reqIp.indexOf('::ffff:') !== -1 ? reqIp.substr(7) : reqIp;
    ip = ip.indexOf('::1') !== -1 ? '127.0.0.1' : ip;
    return ip;
  };
}