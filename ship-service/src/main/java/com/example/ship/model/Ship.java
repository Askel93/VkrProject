package com.example.ship.model;

import com.example.ship.config.View;
import com.example.ship.response.ShipFilter;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.BatchSize;

import javax.persistence.*;

@BatchSize(size = 40)
@SqlResultSetMappings({
    @SqlResultSetMapping(
        name = "shipFilterResult",
        classes = {
            @ConstructorResult(
                targetClass = ShipFilter.class,
                columns = {
                    @ColumnResult(name = "minSpeed", type = Integer.class),
                    @ColumnResult(name = "maxSpeed", type = Integer.class),
                    @ColumnResult(name = "minGodP", type = Integer.class),
                    @ColumnResult(name = "maxGodP", type = Integer.class)
                })}),
    @SqlResultSetMapping(
        name = "stringResult",
        columns = {
            @ColumnResult(name = "val")})
})
@NamedNativeQueries({
    @NamedNativeQuery(
        name = "shipFilter",
        query = "Select min(s.speed) as minSpeed, max(s.speed) as maxSpeed, " +
            "min(s.god_p) as minGodP, max(s.god_p) as maxGodP from ship s",
        resultSetMapping = "shipFilterResult"
    ),
    @NamedNativeQuery(
        name = "typeFilter",
        query = "Select s.type as val from ship s group by s.type",
        resultSetMapping = "stringResult"
    ),
    @NamedNativeQuery(
        name = "portFilter",
        query = "select s.port as val from ship s group by s.port",
        resultSetMapping = "stringResult"
    )}
)
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
    private String name;
    private String type;
    @Column(name = "sub_type")
    private String subType;
    private Integer imo;
    @Column(name = "call_sign")
    private String callSign;
    private String project;
    private String port;
    private Integer speed;
    @Column(name = "god_p")
    private Integer godP;

    @Column(name = "own_name")
    private String ownName;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "own_name", referencedColumnName = "name", insertable = false, updatable = false)
    @JsonView(View.REST.class)
    private OwnOperator own;

    @Column(name = "operator_name")
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

    @JsonView(View.REST.class)
    public boolean isEmptyOwn() {
        return ownName == null || ownName.equals("");
    }
    @JsonView(View.REST.class)
    public boolean isEmptyOperator() {
        return operatorName == null || operatorName.equals("");
    }
}
