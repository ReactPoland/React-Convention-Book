import Model from './Model';

export default class StaffMemeber extends Model {
  constructor(member) {
    super(member);

    this.type = 'Staff Member';
    this.email = member.email;
    this.role = member.role;
    this.verified = member.verified;
    this.location = member.location;
    this.firstName = member.firstName;
    this.lastName = member.lastName;
    this.imageUrl = member.imageUrl;
    this.address = typeof(member.address) !== 'undefined' ? member.address : 'frontend default address';
    this.startDate = new Date(member.startDate);
    this.ownedByRestaurantID = member.ownedByRestaurantID;
    this.active = member.active;
    this.position = typeof(member.position) !== 'undefined' ? member.positions : 'frontend def position';
    this.phoneNumber = member.phoneNumber;
  }
}
