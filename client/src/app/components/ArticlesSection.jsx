"use client";

import React, { useState, useEffect } from "react";
import articlesStyles from "./ArticlesSection.module.css";
import qs from "qs";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "next/image";
import { formatDate, getStrapiMedia } from "@/lib/utils";
import Link from "next/link";
import Button from "react-bootstrap/Button";

const ArticlesSection = () => {
  const [articlesData, setArticlesData] = useState([]);
  const [sideblocksData, setSideblocksData] = useState(null);

  const sideBlocksQuery = qs.stringify(
    {
      populate: {
        magazineAd: {
          populate: {
            image: true,
          },
        },
        popularArticles: {
          populate: {
            popularPosts: true,
          },
        },
        newsletterSignup: true,
      },
    },
    {
      encodeValuesOnly: true,
    },
  );

  const articlesQuery = qs.stringify(
    {
      populate: {
        image: true,
        category: true,
      },
      sort: ["publicationDate:desc"],
      pagination: {
        page: 1,
        pageSize: 10,
      },
    },
    {
      encodeValuesOnly: true,
    },
  );

  useEffect(() => {
    const fetchSideblocks = async () => {
      const response = await fetch(`/api/home-page?${sideBlocksQuery}`);
      const data = await response.json();
      console.log(data?.data);
      setSideblocksData(data?.data);
    };
    fetchSideblocks();
  }, []);

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await fetch(`/api/articles?${articlesQuery}`);
      const data = await response.json();
      console.log(data?.data);
      setArticlesData(data?.data);
    };
    fetchArticles();
  }, []);

  const magazineAdImage = getStrapiMedia(
    sideblocksData?.magazineAd?.image?.url,
  );

  return (
    <section className={articlesStyles.container}>
      <Container>
        <Row>
          <Col lg={9}>
            {articlesData?.map((article) => (
              <div className={articlesStyles.articleRow} key={article.id}>
                <Link
                  href={`magazine/${article?.slug}`}
                  className="text-decoration-none"
                >
                  <Row>
                    <Col lg={3}>
                      {article?.image && (
                        <Image
                          src={getStrapiMedia(article?.image?.url)}
                          width={article?.image?.width}
                          height={article?.image?.height}
                          alt={article?.image?.name}
                          className={articlesStyles.articleImage}
                        />
                      )}
                    </Col>
                    <Col lg={9}>
                      <div className={articlesStyles.descriptionContainer}>
                        <h2 className={articlesStyles.articleTitle}>
                          {article?.title}
                        </h2>
                        <p className={articlesStyles.articleDescription}>
                          {article?.description}
                        </p>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <span className={articlesStyles.detailsItem}>
                            <span>Text</span>
                            {article?.author}
                          </span>
                          <span className={articlesStyles.detailsItem}>
                            <span>Date</span>{" "}
                            {formatDate(article?.publicationDate)}
                          </span>
                          <span className={articlesStyles.detailsItem}>
                            <span>Duration</span>
                            {article?.readTime}
                          </span>
                        </div>
                        <div className={articlesStyles.labelContainer}>
                          <span className={articlesStyles.labelText}>
                            {article?.category?.name}
                          </span>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Link>
              </div>
            ))}
          </Col>
          <Col lg={3}>
            <div className={articlesStyles.magazineAdContainer}>
              <div>
                <h6 className={articlesStyles.magazineTitle}>Printmagazine</h6>
                <h2 className={articlesStyles.magazineIssue}>
                  {sideblocksData?.magazineAd?.issueNumber}
                </h2>
              </div>
              <div
                style={{
                  backgroundImage: `url(${magazineAdImage})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "center center",
                  height: sideblocksData?.magazineAd?.image?.height || "100%",
                  width: "100%",
                  padding: "20px",
                  marginBottom: "16px",
                }}
              >
                <div className="d-flex flex-column justify-content-between h-100">
                  <div>
                    <h2 className={articlesStyles.magazineName}>
                      {sideblocksData?.magazineAd?.title}
                    </h2>
                    <span className={articlesStyles.magazineSubname}>
                      {sideblocksData?.magazineAd?.subtitle}
                    </span>
                  </div>
                  <div>
                    <div className={articlesStyles["exclusive-badge"]}>
                      <span className={articlesStyles["badge-label"]}>
                        {sideblocksData?.magazineAd?.calloutLabel}
                      </span>
                      <span className={articlesStyles["badge-name"]}>
                        {sideblocksData?.magazineAd?.calloutName}
                      </span>
                      <div className={articlesStyles["badge-divider"]}></div>
                      <span className={articlesStyles["badge-type"]}>
                        {sideblocksData?.magazineAd?.calloutType}
                      </span>
                    </div>
                    <div className="d-flex justify-content-between align-items-end">
                      <h2 className={`${articlesStyles.magazineSubname} mb-0`}>
                        {sideblocksData?.magazineAd?.issueNumber}
                      </h2>
                      <div>
                        <svg
                          width="47"
                          height="47"
                          viewBox="0 0 47 47"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            y="42.9294"
                            width="45.9958"
                            height="3.06639"
                            fill="white"
                          />
                          <rect
                            x="42.9292"
                            width="3.06639"
                            height="45.9958"
                            fill="white"
                          />
                          <rect
                            x="0.613281"
                            y="2.75977"
                            width="3.06639"
                            height="61.3277"
                            transform="rotate(-45 0.613281 2.75977)"
                            fill="white"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <Button variant="dark" className={articlesStyles.magazineBtn}>
                  {sideblocksData?.magazineAd?.buttonText}
                </Button>
              </div>
            </div>
            <div>
              <div>
                <h6 className={articlesStyles.popularTitle}>
                  {sideblocksData?.popularArticles?.title}
                </h6>
              </div>
              <div>
                {sideblocksData?.popularArticles?.popularPosts?.map(
                  (post, index) => (
                    <Link
                      key={post.id}
                      href={`magazine/${post?.slug}`}
                      className="text-decoration-none"
                    >
                      <div
                        className={`${articlesStyles.postsContainer} d-flex align-items-start justify-content-start`}
                      >
                        <div>
                          <h4 className={articlesStyles.popularListNumber}>
                            0{index + 1}
                          </h4>
                        </div>
                        <div>
                          <h2 className={articlesStyles.postTitle}>
                            {post?.title}
                          </h2>
                          <p className={articlesStyles.authorText}>
                            <span>Text</span> {post?.author}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ),
                )}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ArticlesSection;
