package io.bwvolleyball.cookbook.domain

import javax.persistence.ElementCollection
import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.Table

@Entity
@Table(name = "cookbooks")
data class Cookbook(@Id val userId: String, @ElementCollection val recipes: List<String> = emptyList())