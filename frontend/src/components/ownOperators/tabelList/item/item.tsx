import { memo, lazy, Suspense } from 'react';

import { useBtnClickDbClick } from '../../../hoc/hoc';
import { historyPush } from '../../../../actions/util';

import { OwnOperatorItem } from '../../../types';

const BtnGroup = lazy(() => import('../../../ownOperator/btnGroup'));

const TableItem: OwnOperatorItem = ({
  entity,
  onChecked,
  checked
}) => {
  const onOwnOperatorClick = () => historyPush(`/ownoperator?id=${entity.name}`, entity);
  const clickEvents = useBtnClickDbClick({ onClick: () => onChecked(entity.name), onDoubleClick: onOwnOperatorClick });

  return (
    <tr className={checked ? 'checked-item' : ''}>
      <td className="check-ship">
        <input type="checkbox" id={`checkbox${entity.name}`} alt={`checkbox${entity.name}`} onChange={() => onChecked(entity.name)} checked={checked} />
      </td>
      <td {...clickEvents}>{entity.name}</td>
      <td {...clickEvents}>{entity.address}</td>
      <td {...clickEvents}>{entity.email}</td>
      <td width="150px">
        <Suspense fallback={"..."}>
          <BtnGroup entity={entity} key={`btnowngroup${entity.name}`} />
        </Suspense>
      </td>
    </tr>
  )
}

export default memo(TableItem, (prev, next) => prev.entity === next.entity && prev.checked === next.checked);