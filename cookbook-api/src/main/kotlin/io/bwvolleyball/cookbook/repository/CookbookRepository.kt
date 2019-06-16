package io.bwvolleyball.cookbook.repository

import io.bwvolleyball.cookbook.domain.Cookbook
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface CookbookRepository : JpaRepository<Cookbook, String>
