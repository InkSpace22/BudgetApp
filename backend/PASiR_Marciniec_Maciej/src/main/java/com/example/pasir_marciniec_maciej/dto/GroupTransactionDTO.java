package com.example.pasir_marciniec_maciej.dto;


import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GroupTransactionDTO {
    private Long groupId;
    private Double amount;
    private String type;
    private String title;
    private List<Long> selectedUserIds;

}
