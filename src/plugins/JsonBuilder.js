import stampit from '@stamp/it';

const VARIABLES_NAME = 'INPUT_DATA_FORMIO';

const getJsDateFromExcel = excelDate => new Date((excelDate - (25567 + 1)) * 86400 * 1000);

export { VARIABLES_NAME };

export default stampit({
  init({workbook}) {
    this.workbook = workbook;
    this.checkObject = this.checkObject.bind(this);
    this.recusiveCheck = this.recusiveCheck.bind(this);
    this.dates = [];
  },
  methods: {
    checkObject(value) {
      return (typeof value === 'object');
    },
    recusiveCheck(object) {
      const { checkObject, recusiveCheck, workbook } = this;
      let data = {};

      for (let key in object) {
        if (checkObject(object[key])) {
          data[key] = recusiveCheck(object[key]);
        } else {
          if (this.dates && this.dates.includes(object[key])) {
            data[key] = getJsDateFromExcel(workbook.definedName(object[key]).startCell().value());
          } else {
            data[key] = workbook.definedName(object[key]).startCell().value();
          }
        }
      }
      return data;
    },
    buildJson(string) {
      const dataAddress = JSON.parse(string)[0];

      const data = this.recusiveCheck(dataAddress);

      return { data };
    },
    main() {
      const string = this.workbook.definedName(VARIABLES_NAME).value();

      this.dates = this.workbook.definedName(VARIABLES_NAME)
        .sheet().cell('A2').value();
      console.log(this.dates);
      return this.buildJson(string);
    }
  }
});
