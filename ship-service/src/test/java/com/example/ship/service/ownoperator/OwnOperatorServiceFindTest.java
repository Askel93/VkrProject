package com.example.ship.service.ownoperator;

import com.example.ship.exception.ResourceNotFoundException;
import org.junit.jupiter.api.Test;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

public class OwnOperatorServiceFindTest extends OwnOperatorInitServiceTest {

	@Test
	void findByIdSuccess() {
		doReturn(Optional.of(retrieveOwnOperator))
				.when(repository).findById(retrieveOwnOperator.getName());

		var res = service.findById(retrieveOwnOperator.getName());
		assertEquals(res.getAddress(), retrieveOwnOperator.getAddress());
		verify(repository, times(1)).findById(anyString());
	}

	@Test
	void findByIdFailureNotExists() {
		doReturn(Optional.empty())
				.when(repository).findById(anyString());

		assertThrows(ResourceNotFoundException.class, () -> service.findById(anyString()));
		verify(repository, times(1)).findById(anyString());
	}

	@Test
	void getCountPage() {
		doReturn(4L)
				.when(repository).getCount(anyString());

		var res = service.getCountPage(2, "");
		assertEquals(res.intValue(), 2);
		verify(repository, times(1)).getCount(anyString());
	}
}
