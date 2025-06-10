package com.unillanos.main.controllers;

import org.springframework.web.bind.annotation.*;

import com.unillanos.main.dtos.NewsDTO;
import com.unillanos.main.services.NewsService;

import java.util.List;

@RestController
@RequestMapping("/api/news")
public class NewsController {

    private final NewsService newsService;

    public NewsController(NewsService newsService) {
        this.newsService = newsService;
    }

    @GetMapping("/environment")
    public List<NewsDTO> getEnvironmentNews() {
        return newsService.getNews();
    }
}
