export class Register {

  public nickname?: string;
  public email?: string;
  public password?: string;
  public confirmPassword?: string;
  public phone?: string;
  public countryId?: number;

  constructor(obj?: any ) {
    this.nickname          = obj && obj.nickname           || null;
    this.email             = obj && obj.email              || null;
    this.password          = obj && obj.password           || null;
    this.confirmPassword   = obj && obj.confirmPassword    || null;
    this.phone             = obj && obj.phone              || null;
    this.countryId         = obj && obj.countryId          || null;
  }
}
