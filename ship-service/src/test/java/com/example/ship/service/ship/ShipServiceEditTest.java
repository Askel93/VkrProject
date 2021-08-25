package com.example.ship.service.ship;

import com.example.ship.exception.ResourceExistsException;
import com.example.ship.exception.ResourceNotFoundException;
import com.example.ship.model.Ship;
import org.junit.jupiter.api.Test;
import org.springframework.dao.EmptyResultDataAccessException;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class ShipServiceEditTest extends ShipInitServiceTest {

	@Test
	void saveShipSuccess() {
		doReturn(savedShip)
				.when(repository).save(any(Ship.class));

		var res = service.save(savedShip);
		verify(repository, times(1)).save(any(Ship.class));
		assertNotNull(res);
	}

	@Test
	void saveFailureExists() {
		doThrow(new ResourceExistsException(String.format(
				"Ship with id %s already exists", savedShip.getId())))
				.when(repository).save(savedShip);
		assertThrows(ResourceExistsException.class, () -> service.save(savedShip));
	}

	@Test
	void updateShipSuccess() {
		doReturn(updatedShip)
				.when(repository).update(updatedShip);

		var res = service.update(updatedShip);
		assertNotNull(res);
		assertEquals(res.getId(), updatedShip.getId());
		assertEquals(res.getType(), "буксир");
	}

	@Test
	void updateFailureNotExists() {
		doThrow(new ResourceNotFoundException(String.format(
				"Ship with id %s not exists", updatedShip.getId())))
				.when(repository).update(updatedShip);

		assertThrows(ResourceNotFoundException.class, () -> service.update(updatedShip));
	}

	@Test
	void deleteShipSuccess() {
		doNothing().when(repository).deleteById(deletedShip.getId());

		service.deleteById(deletedShip.getId());
	}

	@Test
	void deleteShipFailureNotExists() {
		doThrow(new EmptyResultDataAccessException(0))
				.when(repository).deleteById(deletedShip.getId());
		assertThrows(ResourceNotFoundException.class, () ->
				service.deleteById(deletedShip.getId()));
	}
}
