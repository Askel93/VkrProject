package com.example.ship.service.ship;

import com.example.ship.exception.ResourceNotFoundException;
import com.example.ship.response.Filters;
import com.example.ship.service.ServiceTest;
import org.junit.jupiter.api.Test;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;


public class ShipServiceFindTest extends ShipInitServiceTest {

	@Test
	void findByIdSuccess() {
		doReturn(Optional.of(retrieveShip))
				.when(repository).findById(retrieveShip.getId());

		var res = service.findById(retrieveShip.getId());
		assertEquals(res.getId(), retrieveShip.getId());
		verify(repository, times(1)).findById(retrieveShip.getId());
	}

	@Test
	void findByIdNotFound() {
		doReturn(Optional.empty())
				.when(repository).findById(1);
		assertThrows(ResourceNotFoundException.class, () -> service.findById(1));
		verify(repository, times(1)).findById(1);
	}

	@Test
	void findPage() {
		doReturn(ServiceTest.ships)
				.when(repository).findAllWithSearch(any(), any());

		var res = service.findPage(1, 20, "id", new Filters());
		assertEquals(res.size(), ships.size());
		verify(repository, times(1)).findAllWithSearch(any(), any());
	}

	@Test
	void getCountPage() {
		doReturn((long) ships.size())
				.when(repository).getCount(any());
		var res = service.getCountPage(2, new Filters());
		assertEquals(res.intValue(), 2);
	}
}
