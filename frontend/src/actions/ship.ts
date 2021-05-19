import { DeleteResponse, FetchPayload, Ship, ShipAction } from '../types';

const fetchShipsRequest = (data: FetchPayload): ShipAction => ({
  type: 'FETCH_SHIPS',
  payload: data
});
const fetchShipsSuccess = (data: Ship[]): ShipAction => ({
  type: 'FETCH_SHIPS_SUCCESS',
  payload: data
});

const getCountPage = (size: number): ShipAction => ({
  type: 'GET_COUNT_PAGE',
  payload: size
});
const getCountPageSuccess = (count: number): ShipAction => ({
  type: 'GET_COUNT_PAGE_SUCCESS',
  payload: count
});

const saveShipRequest = (ship: Ship): ShipAction => ({
  type: 'SAVE_SHIP',
  payload: ship
});
const saveShipSuccess = (): ShipAction => ({
  type: 'SAVE_SHIP_SUCCESS'
});

const updateShipRequest = (ship: Ship): ShipAction => ({
  type: 'UPDATE_SHIP',
  payload: ship
})
const updateShipSuccess = (id: number): ShipAction => ({
  type: 'UPDATE_SHIP_SUCCESS',
  payload: id,
})

const fetchShipRequest = (id: number): ShipAction => ({
  type: 'FETCH_SHIP',
  payload: id
});
const fetchShipSuccess = (ship: Ship): ShipAction => ({
  type: 'FETCH_SHIP_SUCCESS',
  payload: ship
});

const deleteShips = (data: DeleteResponse): ShipAction => ({
  type: 'DELETE_SHIPS',
  payload: data
});
const deleteShipsSuccess = (data: FetchPayload): ShipAction => ({
  type: 'DELETE_SHIPS_SUCCESS',
  payload: data
});


const shipFailure = (err: string): ShipAction => ({
  type: 'SHIP_FAILURE',
  payload: err
})

export {
  fetchShipsRequest,
  fetchShipsSuccess,
  getCountPage,
  getCountPageSuccess,
  saveShipRequest,
  saveShipSuccess,
  updateShipRequest,
  updateShipSuccess,
  fetchShipRequest,
  fetchShipSuccess,
  deleteShips,
  deleteShipsSuccess,
  shipFailure,
}