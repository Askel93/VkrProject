package com.example.ship.service;

import com.example.ship.exception.ResourceNotFoundException;

import java.util.List;

public interface BaseService<T, ID> {
    /**
     * Save entity
     * @param entity must not be {@literal null}
     * @return savedEntity
     */
    <S extends T> S save(S entity);
    <S extends T> List<S> saveAll(List<S> entities);
    /**
     * Retrieves an entity by its id.
     * @param id must not be {@literal null}
     * @throws ResourceNotFoundException if entity with given {@code id} not exists
     * @return the entity with the given id.
     */
    T findById(ID id) throws ResourceNotFoundException;
    List<T> findAll();

    /**
     * Delete entity for the given id
     * @throws ResourceNotFoundException if entity with given id not exists
     */
    void deleteById(ID id);
}
