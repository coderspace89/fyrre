"use client";

import React, { useState, useEffect } from "react";
import magazineHeaderStyles from "./MagazinePageHeader.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import qs from "qs";
import { getStrapiMedia, formatDate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import Button from "react-bootstrap/Button";
import { usePathname } from "next/navigation";

const MagazinePageHeader = () => {
  const [magazineHeaderData, setMagazineHeaderData] = useState(null);
  const [articlesData, setArticlesData] = useState([]);
  const pathname = usePathname();

  const headerQuery = qs.stringify(
    {
      populate: {
        magazinePageHeader: {
          populate: {
            filterableCategories: true,
            image: true,
          },
        },
      },
    },
    {
      encodeValuesOnly: true,
    },
  );

  const page = 1;
  const pageSize = 9;
  const [categoryFilter, setCategoryFilter] = useState(null);

  const queryOptions = {
    populate: {
      image: true,
      category: true,
      author: true,
    },
    sort: ["createdAt:asc"],
    pagination: {
      page: page,
      pageSize: pageSize,
    },
  };
  if (categoryFilter) {
    queryOptions.filters = {
      category: {
        name: {
          $eq: categoryFilter,
        },
      },
    };
  }

  const articlesQuery = qs.stringify(queryOptions, {
    encodeValuesOnly: true,
  });

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await fetch(`/api/articles?${articlesQuery}`);
      const data = await response.json();
      console.log(data?.data);
      setArticlesData(data?.data);
    };
    fetchArticles();
  }, [categoryFilter]);

  useEffect(() => {
    const fetchMagazineHeader = async () => {
      const response = await fetch(`/api/magazine-page?${headerQuery}`);
      const data = await response.json();
      console.log(data?.data?.magazinePageHeader);
      setMagazineHeaderData(data?.data?.magazinePageHeader);
    };
    fetchMagazineHeader();
  }, []);

  return (
    <section className={magazineHeaderStyles.container}>
      <Container>
        <Row className={magazineHeaderStyles.filterRow}>
          <Col>
            <div className={magazineHeaderStyles.headerImageContainer}>
              {magazineHeaderData?.image && (
                <Image
                  src={getStrapiMedia(magazineHeaderData?.image?.url)}
                  width={magazineHeaderData?.image?.width}
                  height={magazineHeaderData?.image?.height}
                  alt={magazineHeaderData?.image?.name}
                  className={magazineHeaderStyles.headerImage}
                />
              )}
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <h6 className={magazineHeaderStyles.categoryLabel}>
                  {magazineHeaderData?.categoriesLabel}
                </h6>
              </div>
              <div className="d-flex">
                <Button
                  variant="outline-dark"
                  className={magazineHeaderStyles.filterBtn}
                  onClick={() => setCategoryFilter(null)}
                >
                  {magazineHeaderData?.defaultCategoryFilterText}
                </Button>
                {magazineHeaderData?.filterableCategories?.map(
                  (filterCategory) => (
                    <div
                      key={filterCategory.id}
                      className={magazineHeaderStyles.filterBtnWrapper}
                    >
                      <Button
                        variant="outline-dark"
                        className={magazineHeaderStyles.filterBtn}
                        onClick={() => setCategoryFilter(filterCategory.name)}
                      >
                        {filterCategory.name}
                      </Button>
                    </div>
                  ),
                )}
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          {articlesData?.map((article) => (
            <Col
              key={article.id}
              lg={4}
              className={magazineHeaderStyles.articleCol}
            >
              <div>
                <Link
                  href={pathname + "/" + article.slug}
                  className="text-decoration-none"
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <span className={magazineHeaderStyles.durationText}>
                      {formatDate(article.publicationDate)}
                    </span>
                    <span className={magazineHeaderStyles.categoryText}>
                      {article.category.name}
                    </span>
                  </div>
                  <div className={magazineHeaderStyles.articleImageContainer}>
                    {article?.image && (
                      <Image
                        src={getStrapiMedia(article?.image?.url)}
                        width={article?.image?.width}
                        height={article?.image?.height}
                        alt={article?.image?.name}
                        className={magazineHeaderStyles.articleImage}
                      />
                    )}
                  </div>
                  <div>
                    <h3 className={magazineHeaderStyles.articleTitle}>
                      {article?.title}
                    </h3>
                    <p className={magazineHeaderStyles.articleDescription}>
                      {article?.description}
                    </p>
                  </div>
                  <div className="d-flex">
                    <div className={magazineHeaderStyles.authorInfoContainer}>
                      <span className={magazineHeaderStyles.authorLabel}>
                        Text
                      </span>
                      <span className={magazineHeaderStyles.authorText}>
                        {article?.author?.fullName}
                      </span>
                    </div>
                    <div className={magazineHeaderStyles.durationContainer}>
                      <span className={magazineHeaderStyles.durationLabel}>
                        Duration
                      </span>
                      <span className={magazineHeaderStyles.durationText}>
                        {article?.readTime}
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default MagazinePageHeader;
