"use client";

import React, { useState, useEffect } from "react";
import magazineStyles from "./MagazinePage.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import qs from "qs";
import { getStrapiMedia, formatDate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import Button from "react-bootstrap/Button";
import { usePathname } from "next/navigation";

const MagazinePage = () => {
  const [magazineHeaderData, setMagazineHeaderData] = useState(null);
  const [articlesData, setArticlesData] = useState([]);
  const pathname = usePathname();

  const headerQuery = qs.stringify(
    {
      populate: {
        magazinePageHeader: {
          populate: {
            filterableCategories: {
              fields: ["name"],
            },
            image: true,
          },
        },
      },
    },
    {
      encodeValuesOnly: true,
    },
  );

  const pageSize = 9;
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
    const fetchArticles = async () => {
      const queryOptions = {
        populate: {
          image: true,
          category: true,
          author: true,
        },
        sort: ["createdAt:asc"],
        pagination: {
          page: currentPage,
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
        arrayFormat: "brackets",
      });

      try {
        const response = await fetch(`/api/articles?${articlesQuery}`);
        if (!response.ok) {
          throw new Error(
            `HTTP error! status: ${response.status} ${response.statusText}`,
          );
        }
        const data = await response.json();
        console.log(data?.data);
        setArticlesData(data?.data || []);
        setCurrentPage(data?.meta?.pagination?.page || 1);
        setPageCount(data?.meta?.pagination?.pageCount || 1);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setArticlesData([]);
        setCurrentPage(1);
        setPageCount(1);
      }
    };
    fetchArticles();
  }, [categoryFilter, currentPage, pageSize]);

  useEffect(() => {
    const fetchMagazineHeader = async () => {
      try {
        const response = await fetch(`/api/magazine-page?${headerQuery}`);
        if (!response.ok) {
          throw new Error(
            `HTTP error! status: ${response.status} ${response.statusText}`,
          );
        }
        const data = await response.json();
        console.log(data?.data?.magazinePageHeader);
        setMagazineHeaderData(data?.data?.magazinePageHeader);
      } catch (error) {
        console.error("Error fetching magazine header:", error);
      }
    };
    fetchMagazineHeader();
  }, []);

  return (
    <section className={magazineStyles.container}>
      <Container>
        <Row className={magazineStyles.filterRow}>
          <Col>
            <div className={magazineStyles.headerImageContainer}>
              {magazineHeaderData?.image && (
                <Image
                  src={getStrapiMedia(magazineHeaderData.image.url)}
                  width={magazineHeaderData.image.width}
                  height={magazineHeaderData.image.height}
                  alt={
                    magazineHeaderData.image.alternativeText ||
                    magazineHeaderData.pageTitle
                  }
                  className={magazineStyles.headerImage}
                />
              )}
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <h6 className={magazineStyles.categoryLabel}>
                  {magazineHeaderData?.categoriesLabel}
                </h6>
              </div>
              <div className="d-flex">
                <Button
                  variant="outline-dark"
                  className={magazineStyles.filterBtn}
                  onClick={() => {
                    setCategoryFilter(null);
                    setCurrentPage(1);
                  }}
                >
                  {magazineHeaderData?.defaultCategoryFilterText}
                </Button>
                {magazineHeaderData?.filterableCategories?.map(
                  (filterCategory) => (
                    <div
                      key={filterCategory.id}
                      className={magazineStyles.filterBtnWrapper}
                    >
                      <Button
                        variant="outline-dark"
                        className={magazineStyles.filterBtn}
                        onClick={() => {
                          setCategoryFilter(filterCategory.name);
                          setCurrentPage(1);
                        }}
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
        <Row className={magazineStyles.articlesRowContainer}>
          {articlesData?.map((article) => (
            <Col
              key={article.id}
              lg={4}
              className={magazineStyles.articleCol}
            >
              <Link
                href={`${pathname}/${article.slug}`}
                className="text-decoration-none"
              >
                <div className="d-flex justify-content-between align-items-center">
                  <span className={magazineStyles.durationText}>
                    {formatDate(article.publicationDate)}
                  </span>
                  <span className={magazineStyles.categoryText}>
                    {article.category?.name}
                  </span>
                </div>
                <div className={magazineStyles.articleImageContainer}>
                  {article.image?.url && (
                    <Image
                      src={getStrapiMedia(article.image.url)}
                      width={article.image.width}
                      height={article.image.height}
                      alt={article.image.alternativeText || article.title}
                      className={magazineStyles.articleImage}
                    />
                  )}
                </div>
                <div>
                  <h3 className={magazineStyles.articleTitle}>
                    {article.title}
                  </h3>
                  <p className={magazineStyles.articleDescription}>
                    {article.description}
                  </p>
                </div>
                <div className="d-flex">
                  <div className={magazineStyles.authorInfoContainer}>
                    <span className={magazineStyles.authorLabel}>
                      Text
                    </span>
                    <span className={magazineStyles.authorText}>
                      {article.author?.fullName || article.author}
                    </span>
                  </div>
                  <div className={magazineStyles.durationContainer}>
                    <span className={magazineStyles.durationLabel}>
                      Duration
                    </span>
                    <span className={magazineStyles.durationText}>
                      {article.readTime}
                    </span>
                  </div>
                </div>
              </Link>
            </Col>
          ))}
        </Row>
        <div className="text-end">
          <Link
            href={pathname}
            onClick={() => {
              setCurrentPage((prev) => Math.min(pageCount, prev + 1));
            }}
            style={{
              pointerEvents: currentPage >= pageCount ? "none" : "auto",
              opacity: currentPage >= pageCount ? 0.5 : 1,
            }}
            className={magazineStyles.nextLink}
          >
            <span className={magazineStyles.nextLinkText}>Next</span>
            <span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.172 6.778L6.808 1.414L8.222 0L16 7.778L8.222 15.556L6.808 14.142L12.172 8.778H0V6.778H12.172Z"
                  fill="black"
                />
              </svg>
            </span>
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default MagazinePage;
