import BaseComponent from '../components/BaseComponent/BaseComponent';
import BaseLayoutComponent from '../components/BaseLayoutComponent/BaseLayoutComponent';
import isObject from './isObject';
import CheckboxBlock from '../components/CheckboxComponent/CheckboxBlock';

function countColumnObjectRows(columns) {
  let columnRows = [];

  for (const column of columns) {
    columnRows.push(getRows(column.components, 0));
  }

  return Math.max(...columnRows);
}

function countTableObjectRows(rows) {
  const tableRows = [];

  for (const row of rows) {
    const rowMax = [];

    for (const cell of row) {
      if (cell.components.length > 0) {
        rowMax.push(getRows(cell.components, 0));
      } else {
        rowMax.push(0);
      }
    }
    const maxRows = Math.max(...rowMax);

    tableRows.push(maxRows);
  }

  return tableRows.reduce((a, b) => a + b, 0);
}

function checkType(comp, rows) {
  if (
    (comp.type !== 'datagrid') &
    (comp.type !== 'columns') &
    (comp.type !== 'column') &
    (comp.type !== 'table') &
    (comp.type !== 'editgrid') &
    (comp.type !== 'fieldset') &
    (comp.type !== 'panel') &
    (comp.type !== 'checkbox') &
    (comp.type !== 'selectboxes') &
    (comp.type !== 'survey')
  ) {
    rows = rows + BaseComponent.baseWidth;
  } else {
    if (comp.type === 'datagrid') {
      rows = rows + BaseLayoutComponent.marginWidth + BaseComponent.baseWidth;
    } else if (comp.type === 'editgrid') {
      rows = BaseLayoutComponent.marginWidth + getRows(comp.components, rows);
    } else if (comp.type === 'columns') {
      rows = rows + BaseLayoutComponent.marginWidth + countColumnObjectRows(comp.columns);
    } else if (comp.type === 'column') {
      rows = rows + getRows(comp.components, rows);
    } else if (comp.type === 'table') {
      rows = rows + BaseLayoutComponent.marginWidth + countTableObjectRows(comp.rows);
    } else if (comp.type === 'fieldset' | comp.type === 'panel') {
      rows = BaseLayoutComponent.marginWidth + getRows(comp.components, rows);
    } else if (comp.type === 'checkbox' | (comp.type === 'selectboxes')) {
      rows = BaseLayoutComponent.marginWidth + CheckboxBlock.baseWidth;
    } else if (comp.type === 'survey') {
      rows = BaseLayoutComponent.marginWidth + 4 * comp.questions.length - 1;
    } else {
      rows = getRows(comp.components, rows);
    }
  }

  return rows;
}

export function getRows(tree, rows = 0) {
  if (!isObject(tree)) {
    for (const comp of tree) {
      rows = checkType(comp, rows);
    }
  } else {
    rows = checkType(tree, rows);
  }

  return rows;
}
