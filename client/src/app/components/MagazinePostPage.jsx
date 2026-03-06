"use client";

import React, { useState, useEffect } from "react";
import magazinePostStyles from "./MagazinePostPage.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import qs from "qs";
import { getStrapiMedia, formatDate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { usePathname } from "next/navigation";

const MagazinePostPage = ({ slug }) => {
  const postSlug = slug;

  const [articlesData, setArticlesData] = useState([]);
  const [postHeader, setPostHeader] = useState(null);
  const [latestArticlesData, setLatestArticlesData] = useState([]);

  const pathname = usePathname();
  const cleanedPath = pathname.replace(pathname, "/authors");

  const queryOptions = {
    filters: {
      slug: {
        $eq: postSlug,
      },
    },
    populate: {
      image: true,
      category: true,
      author: {
        populate: {
          socialLinks: {
            populate: ["image"],
          },
          image: true,
        },
      },
    },
  };

  const articlesQuery = qs.stringify(queryOptions, {
    encodeValuesOnly: true,
  });

  // query for fetching latest posts
  const numberOfPostsToShow = 3;
  const excludeArticleId = articlesData?.map((article) => {
    return article.id;
  });

  const currentArticleId = excludeArticleId.toString();

  const LatestPostsQuery = qs.stringify(
    {
      filters: {
        id: {
          $ne: currentArticleId,
        },
      },
      populate: {
        image: true,
        category: true,
        author: true,
      },
      sort: ["publicationDate:desc"],
      pagination: {
        pageSize: numberOfPostsToShow,
      },
    },
    {
      encodeValuesOnly: true,
      arrayFormat: "brackets",
    },
  );

  const postHeaderQuery = qs.stringify(
    {
      populate: {
        latestPostsSection: true,
      },
    },
    {
      encodeValuesOnly: true,
      arrayFormat: "brackets",
    },
  );

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await fetch(`/api/articles?${articlesQuery}`);
      const data = await response.json();
      console.log(data?.data);
      setArticlesData(data?.data || []);
    };
    fetchArticles();
  }, []);

  useEffect(() => {
    const fetchPostHeader = async () => {
      const response = await fetch(
        `/api/magazine-post-page?${postHeaderQuery}`,
      );
      const data = await response.json();
      console.log(data?.data);
      setPostHeader(data?.data);
    };
    fetchPostHeader();
  }, []);

  // latest posts fetch
  useEffect(() => {
    const fetchLatestArticles = async () => {
      const response = await fetch(`/api/articles?${LatestPostsQuery}`);
      const data = await response.json();
      console.log(data?.data);
      setLatestArticlesData(data?.data || []);
    };
    fetchLatestArticles();
  }, [currentArticleId]);

  return (
    <section className={magazinePostStyles.container}>
      <Container>
        <Row className={magazinePostStyles.postHeaderContainer}>
          <Col>
            <div className="d-flex justify-content-between align-items-center">
              <Link
                href={postHeader?.goBackLink || "/magazine"}
                className="text-decoration-none"
              >
                <span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.828 8.77797L9.192 14.142L7.778 15.556L0 7.77797L7.778 -3.05176e-05L9.192 1.41397L3.828 6.77797L16 6.77797V8.77797L3.828 8.77797Z"
                      fill="black"
                    />
                  </svg>
                </span>
                <span className={magazinePostStyles.goBackText}>
                  {postHeader?.goBackText}
                </span>
              </Link>
              <div>
                <h3 className={magazinePostStyles.pageLabelText}>
                  {postHeader?.pageLabel}
                </h3>
              </div>
            </div>
          </Col>
        </Row>
        <Row className={magazinePostStyles.featuredTextContainer}>
          {articlesData?.map((article) => (
            <Col lg={6} key={article.id}>
              <div>
                <h2 className={magazinePostStyles.mainTitle}>
                  {article?.title}
                </h2>
              </div>
            </Col>
          ))}
          {articlesData?.map((article) => (
            <Col lg={6} key={article.id}>
              <div className={magazinePostStyles.descriptionContainer}>
                <p className={magazinePostStyles.description}>
                  {article?.description}
                </p>
              </div>
            </Col>
          ))}
        </Row>
        <Row className={magazinePostStyles.articleInfoContainer}>
          {articlesData?.map((article) => (
            <Col key={article.id}>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <span className={magazinePostStyles.detailsItem}>
                    <span>Text</span>
                    {article?.author?.fullName}
                  </span>
                  <span className={magazinePostStyles.detailsItem}>
                    <span>Date</span> {formatDate(article?.publicationDate)}
                  </span>
                  <span className={magazinePostStyles.detailsItem}>
                    <span>Duration</span>
                    {article?.readTime}
                  </span>
                </div>
                <div className={magazinePostStyles.labelContainer}>
                  <span className={magazinePostStyles.labelText}>
                    {article?.category?.name}
                  </span>
                </div>
              </div>
            </Col>
          ))}
        </Row>
        <Row className={magazinePostStyles.featuredImageContainer}>
          <Col>
            {articlesData?.map((article) => (
              <div key={article.id}>
                {article?.image && (
                  <Image
                    src={getStrapiMedia(article?.image?.url)}
                    width={article?.image?.width}
                    height={article?.image?.height}
                    alt={article?.image?.name}
                    className={magazinePostStyles.featuredImage}
                  />
                )}
              </div>
            ))}
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col lg={9}>
            {articlesData?.map((article) => (
              <Row key={article.id}>
                <Col lg={4}>
                  <Link
                    href={`${cleanedPath}/${article?.author?.slug}`}
                    className="text-decoration-none"
                  >
                    <div className={magazinePostStyles.authorImageContainer}>
                      <div>
                        {article?.author?.image && (
                          <Image
                            src={getStrapiMedia(article?.author?.image?.url)}
                            width={article?.author?.image?.width}
                            height={article?.author?.image?.height}
                            alt={article?.author?.image?.name}
                            className={magazinePostStyles.authorImage}
                          />
                        )}
                      </div>
                      <div>
                        <h3 className={magazinePostStyles.authorTitle}>
                          {article?.author?.fullName}
                        </h3>
                      </div>
                    </div>
                  </Link>
                  <div>
                    <ul className="list-unstyled">
                      <li
                        className={`${magazinePostStyles.authorListItems} d-flex align-items-center justify-content-between`}
                      >
                        <span className={magazinePostStyles.authorListLabel}>
                          Date
                        </span>
                        <span className={magazinePostStyles.authorListText}>
                          {formatDate(article?.publicationDate)}
                        </span>
                      </li>
                      <li
                        className={`${magazinePostStyles.authorListItems} d-flex align-items-center justify-content-between`}
                      >
                        <span className={magazinePostStyles.authorListLabel}>
                          Read
                        </span>
                        <span className={magazinePostStyles.authorListText}>
                          {article?.readTime}
                        </span>
                      </li>
                      <li
                        className={`${magazinePostStyles.authorListItems} d-flex align-items-center justify-content-between`}
                      >
                        <span className={magazinePostStyles.authorListLabel}>
                          Share
                        </span>
                        <div
                          className={magazinePostStyles.socialLinksContainer}
                        >
                          {article?.author.socialLinks?.map((socialLink) => (
                            <Link key={socialLink.id} href={socialLink?.url}>
                              {socialLink?.image && (
                                <Image
                                  src={getStrapiMedia(socialLink?.image?.url)}
                                  width={socialLink?.image?.width}
                                  height={socialLink?.image?.height}
                                  alt={socialLink?.image?.name}
                                />
                              )}
                            </Link>
                          ))}
                        </div>
                      </li>
                    </ul>
                  </div>
                </Col>
                <Col lg={8}>
                  <div className={magazinePostStyles.markdownContainer}>
                    <ReactMarkdown>{article?.content}</ReactMarkdown>
                  </div>
                </Col>
              </Row>
            ))}
          </Col>
        </Row>
      </Container>
      <Container className={magazinePostStyles.latestArticleContainer}>
        <Row className={magazinePostStyles.sectionTitleContainer}>
          <Col lg={12}>
            <div className="d-flex align-items-center justify-content-between">
              <h2 className={magazinePostStyles.sectionTitle}>
                {postHeader?.latestPostsSection?.sectionTitle}
              </h2>
              <Link
                href={
                  postHeader?.latestPostsSection?.viewAllLink || "/magazine"
                }
                className={magazinePostStyles.viewAllLink}
              >
                {postHeader?.latestPostsSection?.viewAllText}
                <span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.172 11.0002L10.808 5.63617L12.222 4.22217L20 12.0002L12.222 19.7782L10.808 18.3642L16.172 13.0002H4V11.0002H16.172Z"
                      fill="black"
                    />
                  </svg>
                </span>
              </Link>
            </div>
          </Col>
        </Row>
        <Row className={magazinePostStyles.articlesRowContainer}>
          {latestArticlesData?.map((article) => (
            <Col
              key={article.id}
              lg={4}
              className={magazinePostStyles.articleCol}
            >
              <Link
                href={article.slug}
                className="text-decoration-none"
                target="_blank"
              >
                <div className="d-flex justify-content-between align-items-center">
                  <span className={magazinePostStyles.durationText}>
                    {formatDate(article.publicationDate)}
                  </span>
                  <span className={magazinePostStyles.categoryText}>
                    {article.category?.name}
                  </span>
                </div>
                <div className={magazinePostStyles.articleImageContainer}>
                  {article.image?.url && (
                    <Image
                      src={getStrapiMedia(article.image.url)}
                      width={article.image.width}
                      height={article.image.height}
                      alt={article.image.alternativeText || article.title}
                      className={magazinePostStyles.articleImage}
                    />
                  )}
                </div>
                <div>
                  <h3 className={magazinePostStyles.articleTitle}>
                    {article.title}
                  </h3>
                  <p className={magazinePostStyles.articleDescription}>
                    {article.description}
                  </p>
                </div>
                <div className="d-flex">
                  <div className={magazinePostStyles.authorInfoContainer}>
                    <span className={magazinePostStyles.authorLabel}>Text</span>
                    <span className={magazinePostStyles.authorText}>
                      {article.author?.fullName || article.author}
                    </span>
                  </div>
                  <div className={magazinePostStyles.durationContainer}>
                    <span className={magazinePostStyles.durationLabel}>
                      Duration
                    </span>
                    <span className={magazinePostStyles.durationText}>
                      {article.readTime}
                    </span>
                  </div>
                </div>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default MagazinePostPage;
