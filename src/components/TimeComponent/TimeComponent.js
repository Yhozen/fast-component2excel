import stampit from '@stamp/it';
import NumberComponent from '../NumberComponent/NumberComponent';
import { VARIABLES_NAME } from '../../plugins/JsonBuilder';

export default stampit(NumberComponent, {
  init({component}) {
    this.format = component.format; // TO-DO transform moment.js format to excel format if possible
  },
  methods: {
    setFormat() {
      this.errorLabel = 'Not a time';
      this.inputField.value(new Date()).style('numberFormat', this.format + ';@');

      const workbook = this.inputField.workbook();
      let dates = workbook.definedName(VARIABLES_NAME)
        .sheet().cell('A2').value();

      if (dates) {
        dates = JSON.parse(dates);
        dates.push(this.key);
      } else {
        dates = [this.key];
      }
      dates = JSON.stringify(dates);

      workbook.definedName(VARIABLES_NAME).sheet().cell('A2').value(dates);
    }
  }
});
