import { useSelector } from 'react-redux';
import { noAuthRequest } from '../../actions/util';
import { jwtAuthSelector } from '../../selector';

function WithAuthFunc(func: (...otherProps: any[]) => void): [(...otherProps: any[]) => void] {
  const { isAuth } = useSelector(jwtAuthSelector);
  return[(...otherProps: any[]) => {
    if (!isAuth) {
      noAuthRequest();
    } else {
      func(...otherProps);
    }
  }]
}
export {
  WithAuthFunc,
}