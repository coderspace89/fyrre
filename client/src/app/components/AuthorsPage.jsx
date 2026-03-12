"use client";

import React, { useState, useEffect } from "react";
import authorsPageStyles from "./AuthorsPage.module.css";
import qs from "qs";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Link from "next/link";
import Image from "next/image";
import { getStrapiMedia } from "@/lib/utils";
import { usePathname } from "next/navigation";

const AuthorsPage = () => {
  const [headerData, setHeaderData] = useState(null);
  const [authorsData, setAuthorsData] = useState(null);
  const pathname = usePathname();

  const headerQuery = qs.stringify(
    {
      populate: {
        authorsPageHeader: {
          populate: ["image"],
        },
      },
    },
    {
      encodeValuesOnly: true,
      arrayFormat: "brackets",
    },
  );

  const authorsQuery = qs.stringify(
    {
      populate: {
        image: true,
        socialLinks: true,
      },
      sort: ["createdAt:asc"],
      pagination: {
        page: 1,
        pageSize: 6,
      },
    },
    {
      encodeValuesOnly: true,
    },
  );

  useEffect(() => {
    const fetchSectionHeader = async () => {
      const response = await fetch(`/api/authors-page?${headerQuery}`);
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
      console.log(data?.data);
      setAuthorsData(data?.data);
    };
    fetchAuthorsData();
  }, []);

  return (
    <section className={authorsPageStyles.container}>
      <Container className={authorsPageStyles.headerContainer}>
        <Row>
          <Col>
            <div>
              {headerData?.authorsPageHeader?.image && (
                <Image
                  src={getStrapiMedia(
                    headerData?.authorsPageHeader?.image?.url,
                  )}
                  width={headerData?.authorsPageHeader?.image?.width}
                  height={headerData?.authorsPageHeader?.image?.height}
                  alt={headerData?.authorsPageHeader?.image?.name}
                  className={authorsPageStyles.headerImage}
                />
              )}
            </div>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col>
            {authorsData?.map((author) => (
              <Link
                href={`${pathname}/${author.slug}`}
                className="text-decoration-none"
                key={author.id}
              >
                <div>
                  <Row className={authorsPageStyles.authorsListRow}>
                    <Col lg={6} md={6}>
                      <div className="d-flex align-items-center justify-content-start flex-lg-row flex-md-row flex-column">
                        <div>
                          {author?.image && (
                            <Image
                              src={getStrapiMedia(author?.image?.url)}
                              width={author?.image?.width}
                              height={author?.image?.height}
                              alt={author?.image?.name}
                              className={authorsPageStyles.authorImage}
                            />
                          )}
                        </div>
                        <div>
                          <h3 className={authorsPageStyles.authorName}>
                            {author?.fullName}
                          </h3>
                        </div>
                      </div>
                    </Col>
                    <Col lg={6} md={6}>
                      <div
                        className={`${authorsPageStyles.authorInfoWrapper} d-flex flex-lg-row flex-md-row flex-column align-items-center align-items-lg-end justify-content-lg-end justify-content-md-end justify-content-center`}
                      >
                        <div className={authorsPageStyles.authorTextContainer}>
                          <span className={authorsPageStyles.authorText}>
                            Job
                          </span>
                          <span className={authorsPageStyles.authorDynamicText}>
                            {author?.jobTitle}
                          </span>
                        </div>
                        <div className={authorsPageStyles.authorTextContainer}>
                          <span className={authorsPageStyles.authorText}>
                            City
                          </span>
                          <span className={authorsPageStyles.authorDynamicText}>
                            {author?.city}
                          </span>
                        </div>
                        <div className={authorsPageStyles.authorTextContainer}>
                          <span className={authorsPageStyles.authorAboutText}>
                            {headerData?.aboutLinkText}
                          </span>
                          <span className={authorsPageStyles.authorDynamicText}>
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
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Link>
            ))}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AuthorsPage;
