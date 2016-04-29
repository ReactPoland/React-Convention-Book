import Model from './Model';

export default class Restaurant extends Model {
  constructor(restaurant) {
    super(restaurant);

    this.type = 'Restaurant';
    this.id = restaurant._id;
    this.name = restaurant.name;
    this.subdomain = restaurant.subdomain;
    this.siteName = restaurant.siteName;
    this.siteDescription = restaurant.siteDescription !== undefined ? restaurant.siteDescription : 'frontend default desc';
    this.RRAccountManager = restaurant.RRAccountManager;
    this.positions = typeof restaurant.positions !== 'string' ? [] : restaurant.positions.split(',');
    this.clientName = restaurant.clientName;
    this.clientAddress = restaurant.clientAddress;
    this.clientPhoneNumber = restaurant.clientPhoneNumber;
    this.availableFeatures = restaurant.availableFeatures;
    this.locations = [{
      id: 321654987,
      name: 'NY',
      title: '548 Wide St., 25487-4565 New York (frontend model mock)'
    }, {
      id: 3216547898,
      name: 'DC',
      title: '45 Tree Av., 13254 Washington D.C. (frontend model mock)'
    }, {
      id: 46544055,
      name: 'NM',
      title: '874 Long St., 99999 New Mexico (frontend model mock)'
    }];
  }
}
