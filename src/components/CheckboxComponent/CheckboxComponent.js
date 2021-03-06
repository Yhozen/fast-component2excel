import stampit from '@stamp/it';
import BaseLayoutComponent from '../BaseLayoutComponent/BaseLayoutComponent';
import CheckboxBlock from './CheckboxBlock';

export default stampit(BaseLayoutComponent, {
  methods: {
    render(sheet) {
      const r = sheet.range(this.position.range);

      r.forEach(this.setOutsideBorder).style({fill: 'E7E6E6'});
      this.renderBlock(r);
    },
    renderBlock(range) {
      const cols = this.shape.cols - CheckboxBlock.baseLength;
      const rows = this.shape.rows - CheckboxBlock.baseWidth;
      const sheet = range.sheet();
      const shape = {cols, rows};
      const start = range.startCell().relativeCell(CheckboxBlock.baseWidth / 2, CheckboxBlock.baseLength / 2);
      const end = range.endCell().relativeCell(CheckboxBlock.baseWidth / -2, CheckboxBlock.baseLength / -2);
      const label = this.label;
      const key = this.key;
      const position = {
        range: start.rangeTo(end).address(),
        col: start.columnNumber(),
        row: start.rowNumber()
      };
      const component = {label, key, position, shape};

      CheckboxBlock({ component }).render(sheet);
    }
  }
});
