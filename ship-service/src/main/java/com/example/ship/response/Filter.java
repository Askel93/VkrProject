package com.example.ship.response;

import com.example.ship.model.Ship;
import org.springframework.data.jpa.domain.Specification;

public interface Filter {
	Specification<Ship> getSpecification();
}
