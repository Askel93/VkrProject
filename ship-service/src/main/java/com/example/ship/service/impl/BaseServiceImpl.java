package com.example.ship.service.impl;

import com.example.ship.exception.ResourceNotFoundException;
import com.example.ship.repository.BaseRepository;
import com.example.ship.service.BaseService;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public class BaseServiceImpl<T, ID> implements BaseService<T, ID> {

    protected BaseRepository<T, ID> baseRepository;

    public BaseServiceImpl(BaseRepository<T, ID> baseRepository) {
        this.baseRepository = baseRepository;
    }

    @Override
    public <S extends T> S save(S entity) {
        return baseRepository.save(entity);
    }

    @Override
    public T findById(ID id) throws ResourceNotFoundException {
        return baseRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(
                String.format("Resource not found with id %s", id)));
    }

    @Override
    public <S extends T> List<S> saveAll(List<S> entities) {
        return baseRepository.saveAll(entities);
    }

    @Override
    public List<T> findAll() {
        return baseRepository.findAll();
    }

    @Override
    @Transactional
    public void deleteById(ID id) {
        try {
            baseRepository.deleteById(id);
        } catch (EmptyResultDataAccessException e) {
            throw new ResourceNotFoundException(e.getMessage());
        }
    }
}
