import React, { CSSProperties, useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { loadingSelector } from '../../selector';

const DivStyle: CSSProperties = {
  zIndex: 1000,
  position: 'fixed',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
}

const SpinnerStyle: CSSProperties = {
  marginLeft: '50%',
  marginRight: '50%',
  marginTop: '50vh',
  marginBottom: '50vh'
}

const Loading = ({ isLoad = false }: { isLoad?: boolean }) => {
  const loading = useSelector(loadingSelector);
  const [show, setShow] = useState<boolean>(loading || isLoad);
  useEffect(() => {
    setShow(loading || isLoad);
    // eslint-disable-next-line
  }, [loading])
  const handleCancel = () => setShow(false);
  return (
    <div style={DivStyle} hidden={!show} onMouseDown={handleCancel}>
      <Spinner animation="grow" variant="primary" style={SpinnerStyle} />
    </div>
  )
}

export default Loading;