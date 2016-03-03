import Model from './Model';

//// true means that there's NO alergen in given item
//// for example if this.gluten === true it means that the food is gluten free
export default class Allergen extends Model {
  constructor(allergens = {}) {
    super(allergens);

    this.type = 'Allergens';

    this.vegetarian = allergens.vegetarian  || false;
    this.gluten     = allergens.gluten      || false;
    this.egg        = allergens.egg         || false;
    this.dairy      = allergens.dairy       || false;
    this.nut        = allergens.nut         || false;
    this.soy        = allergens.soy         || false;
    this.fish       = allergens.fish        || false;
    this.showAllergens = allergens.showAllergens || true;
  }

  formatForWire() {
    return {
      vegetarian: this.vegetarian,
      gluten: this.gluten,
      egg: this.egg,
      dairy: this.dairy,
      nut: this.nut,
      soy: this.soy,
      fish: this.fish,
      showAllergens: this.showAllergens
    };
  }
}
