package com.example.ship.model;

import com.example.ship.config.View;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonView;
import com.vladmihalcea.hibernate.type.array.StringArrayType;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.BatchSize;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;
import org.hibernate.annotations.TypeDefs;

import javax.persistence.*;
import java.util.List;

@BatchSize(size = 40)
@Entity
@Table(name = "own_operator", uniqueConstraints=@UniqueConstraint(columnNames = {"name"}))
@Data
@NoArgsConstructor
@TypeDefs({ @TypeDef(name = "string-array",
    typeClass = StringArrayType.class )})
@JsonView(View.UI.class)
public class OwnOperator {

    @Id
    @Column(name = "name", unique = true)
    private String name;

    private String address;
    @Column(name = "phones", columnDefinition = "text[]")
    @Type(type = "string-array")
    @JsonFormat(with = JsonFormat.Feature.ACCEPT_SINGLE_VALUE_AS_ARRAY)
    private String[] phones;
    private String email;
    @Column(name = "fax", columnDefinition = "text[]")
    @Type(type = "string-array")
    @JsonFormat(with = JsonFormat.Feature.ACCEPT_SINGLE_VALUE_AS_ARRAY)
    private String[] fax;

    @JsonView(View.REST.class)
    @OneToMany(mappedBy = "own")
    private List<Ship> shipsOwn;
    @JsonView(View.REST.class)
    @OneToMany(mappedBy = "operator")
    private List<Ship> shipsOperator;

    @JsonView(View.REST.class)
    public String getPhonesAsString() {
        return getArrayAsString(phones);
    }

    @JsonView(View.REST.class)
    public String getFaxAsString() {
        return getArrayAsString(fax);
    }

    private String getArrayAsString(String[] arr) {
        try {
            StringBuilder res = new StringBuilder();
            res.append(arr[0]);
            for (int i = 1; i < arr.length; i++) {
                res.append(",").append(arr[i]);
            }
            return res.toString();
        } catch (Exception e) {
            return "";
        }
    }
}
