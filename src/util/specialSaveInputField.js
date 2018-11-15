import stampit from '@stamp/it';
import { VARIABLES_NAME } from '../plugins/JsonBuilder';

function getRandomID() {
  const randomString = () => (Math.random().toString(36) + '00000000000000000').slice(2, 13);

  return 'ID' + randomString() + randomString();
}
export default stampit({
  methods: {
    specialSaveInputField(inputField, key) {
      const workbook = inputField.workbook();
      const ID = getRandomID();
      const JSONCell = workbook.definedName(VARIABLES_NAME);
      let previousData = JSON.parse(JSONCell.value())[0];
      const parent = previousData[key[0]];
      let toSave = {};

      workbook.definedName(ID, inputField);

      if (parent) {
        toSave = parent;
      }

      previousData[key[0]] = {...toSave, [key[1]]: ID};

      const stringData = JSON.stringify([previousData]);

      JSONCell.value(stringData);
    }
  }
});
