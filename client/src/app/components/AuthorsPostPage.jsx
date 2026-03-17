"use client";

import React, { useState, useEffect } from "react";
import authorsPostPageStyles from "./AuthorsPostPage.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import qs from "qs";
import { getStrapiMedia, formatDate } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { usePathname } from "next/navigation";

const AuthorsPostPage = ({ slug }) => {
  const postSlug = slug;

  const [headerData, setHeaderData] = useState(null);
  const [authorsData, setAuthorsData] = useState(null);

  const pathname = usePathname();
  const cleanedPath = pathname.replace(pathname, "/magazine");

  const authorsQuery = qs.stringify(
    {
      filters: {
        slug: {
          $eq: postSlug,
        },
      },
      populate: {
        image: true,
        socialLinks: {
          populate: ["image"],
        },
        articles: {
          populate: ["image"],
        },
      },
    },
    {
      encodeValuesOnly: true,
    },
  );

  useEffect(() => {
    const fetchSectionHeader = async () => {
      const response = await fetch("/api/author-post-page");
      const data = await response.json();
      console.log(data?.data);
      setHeaderData(data?.data);
    };
    fetchSectionHeader();
  }, []);

  useEffect(() => {
    const fetchAuthorsData = async () => {
      const response = await fetch(`/api/authors?${authorsQuery}`);
      const data = await response.json();
      console.log(data?.data[0]);
      setAuthorsData(data?.data[0]);
    };
    fetchAuthorsData();
  }, []);

  return (
    <div>
      <section className={authorsPostPageStyles.container}>
        <Container>
          <Row className={authorsPostPageStyles.postHeaderContainer}>
            <Col>
              <div className="d-flex justify-content-between align-items-center">
                <Link
                  href={headerData?.goBackLink || "/authors"}
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
                  <span className={authorsPostPageStyles.goBackText}>
                    {headerData?.goBackText}
                  </span>
                </Link>
                <div>
                  <h3 className={authorsPostPageStyles.pageLabelText}>
                    {headerData?.pageLabel}
                  </h3>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col lg={10}>
              <Row>
                <Col lg={4}>
                  <div className={authorsPostPageStyles.authorImageContainer}>
                    {authorsData?.image && (
                      <Image
                        src={getStrapiMedia(authorsData?.image?.url)}
                        width={authorsData?.image?.width}
                        height={authorsData?.image?.height}
                        alt={authorsData?.image?.name}
                        className={authorsPostPageStyles.authorImage}
                      />
                    )}
                  </div>
                  <div className={authorsPostPageStyles.followLabelContainer}>
                    <span className={authorsPostPageStyles.followLabelText}>
                      {headerData?.followLabel}
                    </span>
                    <div className={authorsPostPageStyles.socialLinksContainer}>
                      {authorsData?.socialLinks?.map((socialLink) => (
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
                  </div>
                </Col>
                <Col lg={8}>
                  <div>
                    <h2 className={authorsPostPageStyles.authorTitle}>
                      {authorsData?.fullName}
                    </h2>
                  </div>
                  <div className={authorsPostPageStyles.bioContainer}>
                    <ReactMarkdown>{authorsData?.bio}</ReactMarkdown>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
      <section className={authorsPostPageStyles.articleSectionContainer}>
        <Container>
          <Row>
            <Col>
              <div
                className={authorsPostPageStyles.articleSectionTitleContainer}
              >
                <h2 className={authorsPostPageStyles.articleSectionTitle}>
                  Articles by {authorsData?.fullName}
                </h2>
              </div>
              <Row>
                {authorsData?.articles?.map((article) => (
                  <Col
                    lg={6}
                    key={article.id}
                    className={authorsPostPageStyles.articlesGrid}
                  >
                    <Link
                      href={`${cleanedPath}/${article.slug}`}
                      className="text-decoration-none"
                      target="_blank"
                    >
                      <div className="d-flex align-items-center">
                        <div>
                          {article?.image && (
                            <Image
                              src={getStrapiMedia(article?.image?.url)}
                              width={article?.image?.width}
                              height={article?.image?.height}
                              alt={article?.image?.name}
                              className={authorsPostPageStyles.articleImage}
                            />
                          )}
                        </div>
                        <div>
                          <h3 className={authorsPostPageStyles.articleTitle}>
                            {article?.title}
                          </h3>
                          <div>
                            <span
                              className={
                                authorsPostPageStyles.dateTextContainer
                              }
                            >
                              <span
                                className={
                                  authorsPostPageStyles.articleInfoLabel
                                }
                              >
                                Date
                              </span>
                              <span
                                className={
                                  authorsPostPageStyles.articleInfoText
                                }
                              >
                                {formatDate(article?.publicationDate)}
                              </span>
                            </span>
                            <span>
                              <span
                                className={
                                  authorsPostPageStyles.articleInfoLabel
                                }
                              >
                                Read
                              </span>
                              <span
                                className={
                                  authorsPostPageStyles.articleInfoText
                                }
                              >
                                {article?.readTime}
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default AuthorsPostPage;
