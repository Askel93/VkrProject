package com.example.ship.model;

import com.example.ship.config.View;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.BatchSize;

import javax.persistence.*;

@BatchSize(size = 20)
@Entity
@Table(name = "ship")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonView(View.UI.class)
public class Ship {

    @Id
    @Column(name = "reg_num", unique = true)
    private Integer id;
    @Column(name = "name", columnDefinition = "text")
    private String name;
    @Column(name = "type", columnDefinition = "text")
    private String type;
    @Column(name = "sub_type", columnDefinition = "text")
    private String subType;
    private Integer imo;
    @Column(name = "call_sign", columnDefinition = "text")
    private String callSign;
    @Column(name = "project", columnDefinition = "text")
    private String project;
    @Column(name = "port", columnDefinition = "text")
    private String port;
    private Integer speed;
    @Column(name = "god_p")
    private Integer godP;

    @Column(name = "own_name", columnDefinition = "text")
    private String ownName;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "own_name", referencedColumnName = "name", insertable = false, updatable = false)
    @JsonView(View.REST.class)
    private OwnOperator own;

    @Column(name = "operator_name", columnDefinition = "text")
    private String operatorName;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "operator_name", referencedColumnName = "name", insertable = false, updatable = false)
    @JsonView(View.REST.class)
    private OwnOperator operator;

    @OneToOne(fetch = FetchType.LAZY, mappedBy = "ship", cascade = CascadeType.ALL, orphanRemoval = true, optional = false)
    @JsonView(View.REST.class)
    private ShipEngine shipEngine;

    @OneToOne(fetch = FetchType.LAZY, mappedBy = "ship", cascade = CascadeType.ALL, orphanRemoval = true, optional = false)
    @JsonView(View.REST.class)
    private ShipCapacity shipCapacity;

    @OneToOne(fetch = FetchType.LAZY, mappedBy = "ship", cascade = CascadeType.ALL, orphanRemoval = true, optional = false)
    @JsonView(View.REST.class)
    private ShipDimensions shipDimensions;
}
