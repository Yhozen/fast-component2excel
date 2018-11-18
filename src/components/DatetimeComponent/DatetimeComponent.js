import stampit from '@stamp/it';
import NumberComponent from '../NumberComponent/NumberComponent';
import { VARIABLES_NAME } from '../../plugins/JsonBuilder';

export default stampit(NumberComponent, {
  methods: {
    setFormat() {
      this.errorLabel = 'Not a date';
      this.inputField.value(new Date()).style('numberFormat', 'm/d/yy h:mm;@');
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
