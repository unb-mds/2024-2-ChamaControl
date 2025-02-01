import { useState, useEffect } from "react";
import axios from "axios";

import NewsCard from "../../components/NewsCard/NewsCard";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Loading from "../../components/Loading/Loading";
import Rodape from "../../components/Rodape/Rodape.jsx";

import './News.css';

const News = () => {
  const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
  
  const PAGE_SIZE = 10; // Limita o número de artigos por chamada

  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [lastPublishedAt, setLastPublishedAt] = useState(null); // Para armazenar a data da última notícia
  const [loadedNewsIds, setLoadedNewsIds] = useState(new Set()); // Para armazenar os IDs das notícias já carregadas

  useEffect(() => {
    getNews();
  }, []);

  async function getNews() {
    if (loading || news.length >= 50) return; // Evita chamadas se já atingimos o limite

    setLoading(true);

    try {
      let dateFilter = lastPublishedAt ? `&to=${lastPublishedAt}` : "";

      const response = await axios.get(
        `https://gnews.io/api/v4/search?q=queimadas AND (Amazônia OR floresta OR cerrado OR Pantanal OR Norte OR Sul OR Sudeste OR Nordeste OR Caatinga OR Pampa OR "Mata Atlântica" OR "Centro-Oeste" OR Brasil) NOT ("LA" OR "Los Angeles")&country=br&max=${PAGE_SIZE}${dateFilter}&token=${API_KEY}`
      );

      const newArticles = response.data.articles;

      if (newArticles.length === 0 || news.length + newArticles.length >= 50) {
        setHasMore(false); // Impede novas buscas
      }

      // Filtra as notícias já carregadas
      const uniqueNewArticles = newArticles.filter(article => !loadedNewsIds.has(article.url));

      if (uniqueNewArticles.length > 0) {
        setNews(prevNews => {
          const updatedNews = [...prevNews, ...uniqueNewArticles];
          return updatedNews.slice(0, 50); // Garante que nunca passa de 50
        });

        // Atualiza os IDs carregados
        setLoadedNewsIds(prevIds => {
          const newIds = new Set(prevIds);
          uniqueNewArticles.forEach(article => newIds.add(article.url));
          return newIds;
        });

        // Atualiza a última data para evitar repetições
        setLastPublishedAt(uniqueNewArticles[uniqueNewArticles.length - 1].publishedAt);
      }
    } catch (error) {
      console.error("Erro ao buscar notícias:", error);
    }

    setLoading(false);
  }

  return (
    <div className="control-panel">
      <Navbar />
      <section id="news">
        <h1 className="news-title">Notícias</h1>

        {loading && news.length === 0 ? (
          <Loading />
        ) : (
          <ul className="news-list">
            {news.map((item, index) => (
              <NewsCard
                key={index}
                id={item.source.id}
                title={item.title}
                name={item.source.name}
                content={item.content}
                publishedAt={item.publishedAt}
                image={item.image}
                url={item.url}
                movie={item}
              />
            ))}
          </ul>
        )}

        {hasMore && !loading && (
          <button onClick={getNews} className="load-more-btn">
            Carregar Mais
          </button>
        )}

        {loading && news.length > 0 && <Loading />}
      </section>

      <Rodape/>
    </div>
  );
};

export default News;