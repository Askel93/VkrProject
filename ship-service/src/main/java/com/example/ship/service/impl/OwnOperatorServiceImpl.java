package com.example.ship.service.impl;

import com.example.ship.model.OwnOperator;
import com.example.ship.repository.OwnOperatorRepository;
import com.example.ship.service.OwnOperatorService;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OwnOperatorServiceImpl extends BaseServiceImpl<OwnOperator, String> implements OwnOperatorService {

	private final OwnOperatorRepository repository;

	public OwnOperatorServiceImpl(OwnOperatorRepository repository) {
		super(repository);
		this.repository = repository;
	}

	@Override
	public OwnOperator update(OwnOperator ownOperator) {
		return repository.update(ownOperator);
	}

	@Override
	public List<OwnOperator> findPage(int page, int size, String sort, String searchText) {
		Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, sort));
		return repository.findAllWithSearch(pageable, searchText);
	}

	@Override
	public Integer getCountPage(int size, String searchText) {
		double count = repository.getCount(searchText);
		return (int) Math.ceil(count / size);
	}

	@Override
	public void deleteAllById(List<String> listId) {
		repository.deleteAllById(listId);
	}
}
