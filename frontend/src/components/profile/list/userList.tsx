import React, { useEffect, useState } from 'react';
import { Alert, Table, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import { getUsers, addAdmin } from '../../../actions/user';
import { userListSelector } from '../../../selector';
import { Input } from '../../util/form'
import { ModalItem, UserResponse } from '../../types';
import { SearchIcon } from '../../util/icon';

const UserItem: ModalItem<UserResponse> = ({
  entity,
}) => {

  const dispatch = useDispatch();

  const onAddAdmin = () => {
    dispatch(addAdmin(entity));
  }
  const { userName, email, admin } = entity;

  return (
    <tr>
      <td>{userName}</td>
      <td>{email}</td>
      <td>
        {!admin
          ? <Button
            type="button"
            data-toggle="tooltip"
            data-placement="top"
            title="Add admin"
            style={{ width: '100%', maxWidth: '200px' }}
            variant="success"
            onClick={onAddAdmin}>Сделать администратором</Button>
          : null}
      </td>
    </tr>
  )
}

const UserList = () => {

  const [searchText, setSearchText] = useState("")
  const [page, setPage] = useState(1);

  const { users, isEnd } = useSelector(userListSelector(searchText, page));

  const dispatch = useDispatch()

  useEffect(() => {
    if (users.length === 0) dispatch(getUsers());
    // eslint-disable-next-line
  }, [])

  return (
    <div className="list">
      <Table className="table-list m-0" style={{ minWidth: '650px' }}>
        <thead>
          <tr>
            <th>Никнейм</th>
            <th>Email</th>
            <th style={{ width: '200px' }}>
              <Input
                className="text-dark search-panel mb-0 mt-auto"
                style={{ width: '100%', maxWidth: '200px' }}
                value={searchText}
                onChange={setSearchText}
                prepend={<SearchIcon />}
                placeholder="Search users"
                id="usersearch"  />
            </th>
          </tr>
        </thead>
        <tbody>
          {users.length !== 0 && users.map(i => <UserItem key={i.userName} entity={i} />)}
        </tbody>
      </Table>
      {!isEnd && <Button style={{ margin: 'auto', display: 'block', width: '40%' }} onClick={() => setPage(prev => prev + 1)}>Показать еще</Button>}
      {users.length === 0 && <Alert className="list text-center" variant="secondary">Пусто</Alert>}
    </div>
  )
}

export default UserList;