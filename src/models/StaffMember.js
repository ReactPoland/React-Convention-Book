import Model from './Model';

export default class StaffMemeber extends Model {
  constructor(member) {
    super(member);

    this.type = 'Staff Member';
    this.email = member.email;
    this.position = member.position;
    this.verified = member.verified;
    this.location = member.location;
    this.firstName = member.firstName;
    this.lastName = member.lastName;
    this.imageUrl = member.imageUrl;
    this.address = member.address;
    this.startDate = new Date(member.startDate);
  }
}
