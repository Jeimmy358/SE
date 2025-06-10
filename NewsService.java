package com.unillanos.main.services;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.unillanos.main.dtos.NewsDTO;

import java.util.*;

@Service
public class NewsService {

    private final String NEWS_API_URL = "https://newsdata.io/api/1/news?apikey=pub_846370483c59bfcff57f60eff0924d5bdaf0b&language=es&category=education,environment,health,sports,technology";
    private final RestTemplate restTemplate = new RestTemplate();

    public List<NewsDTO> getNews() {
        List<NewsDTO> newsList = new ArrayList<>();

        ResponseEntity<Map> response = restTemplate.getForEntity(NEWS_API_URL, Map.class);
        List<Map<String, Object>> results = (List<Map<String, Object>>) response.getBody().get("results");

        if (results != null) {
            int maxNews = 10;
            for (int i = 0; i < Math.min(maxNews, results.size()); i++) {
                Map<String, Object> article = results.get(i);

                NewsDTO dto = new NewsDTO();
                dto.setTitle((String) article.get("title"));
                dto.setDescription((String) article.get("description"));
                dto.setPubDate((String) article.get("pubDate"));
                dto.setLink((String) article.get("link"));
                dto.setImageUrl((String) article.get("image_url"));

                newsList.add(dto);
            }
        }

        return newsList;
    }
}
