package com.example.ship.repository.impl;

import com.example.ship.repository.BaseRepository;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.jpa.repository.support.JpaEntityInformation;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;

import javax.persistence.EntityManager;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@SuppressWarnings("NullableProblems")
public class BaseRepositoryImpl<T, ID extends Serializable>
        extends SimpleJpaRepository<T, ID> implements BaseRepository<T, ID> {

    protected final JpaEntityInformation<T, ?> entityInformation;
    protected final EntityManager em;

    public BaseRepositoryImpl(JpaEntityInformation<T, ?> entityInformation, EntityManager entityManager) {
        super(entityInformation, entityManager);
        this.em = entityManager;
        this.entityInformation = entityInformation;
    }


    @Override
    @Transactional
    public <S extends T> List<S> saveAll(Iterable<S> entities) {

        Assert.notNull(entities, "Entities must not be null!");
        List<S> result = new ArrayList<>();
        int i = 0;

        for (S entity : entities) {
            if ((i > 0 && i % 40 == 0) || !entities.iterator().hasNext()) {
                try {
                    em.flush();
                    em.clear();
                    i = 0;
                } catch (Exception ignored) {}
            }
            try {
                result.add(save(entity));
            } catch (Exception ignored) {}
            i++;
        }
        return result;
    }

    @Override
    @Transactional
    public void deleteAllById(List<ID> listId) {
        for (ID id : listId) {
            try {
                deleteById(id);
            } catch (EmptyResultDataAccessException ignored) {}
        }
    }
}
