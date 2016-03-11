import Model from './Model';

//// true means that there's NO alergen in given item
//// for example if this.gluten === true it means that the food is gluten free
export default class Allergen extends Model {
  constructor(allergens = {}) {
    super(allergens);
    this.type = 'Allergens';

    this.vegetarian = typeof(allergens.vegetarian) !== 'undefined' ? allergens.vegetarian : true;
    this.gluten     = typeof(allergens.gluten) !== 'undefined' ?     allergens.gluten     : true;
    this.egg        = typeof(allergens.egg) !== 'undefined' ?        allergens.egg  : true;
    this.dairy      = typeof(allergens.dairy) !== 'undefined' ?      allergens.dairy  : true;
    this.nut        = typeof(allergens.nut) !== 'undefined' ?        allergens.nut  : true;
    this.soy        = typeof(allergens.soy) !== 'undefined' ?        allergens.soy  : true;
    this.fish       = typeof(allergens.fish) !== 'undefined' ?       allergens.fish  : true;
    this.showAllergens = typeof(allergens.showAllergens) !== 'undefined' ? allergens.showAllergens : true;
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
