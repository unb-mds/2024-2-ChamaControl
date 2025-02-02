import PropTypes from "prop-types";

import styles from "./NewsCard.module.css";

const NewsCard = (props) => {

  const date = props.publishedAt;
  const date_br =
    date[8] +
    date[9] +
    "/" +
    date[5] +
    date[6] +
    "/" +
    date[0] +
    date[1] +
    date[2] +
    date[3];

  return (
    <a href={props.url} target="_blank" rel="noopener noreferrer" className={styles.card}>
      <p className={styles.title}>{props.title}</p>
      <div className="news-poster">
          <img
              className={styles.img}
              src={props.image}
              alt={'imagem da notícia'}
          />
      </div>
  
      <div className={styles.cardContent}>
        <p className={styles.content}>Conteúdo: {props.content}</p>
        <div className={styles.info}>
          <p className={styles.name}>Fonte: {props.name}</p>
          <p className={styles.date}>Lançamento: {date_br}</p>
        </div>
      </div>
    </a>
  );  
};

NewsCard.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string,
  content: PropTypes.string.isRequired,
  publishedAt: PropTypes.string,
  image: PropTypes.string,
  url: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default NewsCard;