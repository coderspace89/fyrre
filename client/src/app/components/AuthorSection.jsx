"use client";

import React, { useState, useEffect } from "react";
import authorStyles from "./AuthorSection.module.css";
import qs from "qs";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Link from "next/link";
import Image from "next/image";
import { getStrapiMedia } from "@/lib/utils";

const AuthorSection = () => {
  const [sectionHeaderData, setSectionHeaderData] = useState(null);
  const [authorsData, setAuthorsData] = useState(null);

  const sectionHeaderQuery = qs.stringify(
    {
      populate: {
        authorSection: true,
      },
    },
    {
      encodeValuesOnly: true,
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
      const response = await fetch(`/api/home-page?${sectionHeaderQuery}`);
      const data = await response.json();
      console.log(data?.data?.authorSection);
      setSectionHeaderData(data?.data?.authorSection);
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
    <section className={authorStyles.container}>
      <Container className={authorStyles.containerRow}>
        <Row className={authorStyles.sectionTitleContainer}>
          <Col lg={12}>
            <div className="d-flex align-items-center justify-content-between">
              <h2 className={authorStyles.sectionTitle}>
                {sectionHeaderData?.sectionTitle}
              </h2>
              <Link
                href={sectionHeaderData?.viewAllLink || "/authors"}
                className={authorStyles.viewAllLink}
              >
                {sectionHeaderData?.viewAllText}
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
        <Row>
          {authorsData?.map((author) => (
            <Col
              lg={6}
              key={author.id}
              className={authorStyles.borderContainer}
            >
              <div>
                <Link
                  href={`authors/${author?.slug}`}
                  className="text-decoration-none"
                >
                  <div className="d-flex align-items-center justify-content-start">
                    {author?.image && (
                      <Image
                        src={getStrapiMedia(author?.image?.url)}
                        width={author?.image?.width}
                        height={author?.image?.height}
                        alt={author?.image?.name}
                        className={authorStyles.authorImage}
                      />
                    )}
                    <div>
                      <div>
                        <h3 className={authorStyles.authorName}>
                          {author?.fullName}
                        </h3>
                      </div>
                      <div className="d-flex flex-lg-row flex-md-row flex-column">
                        <div className={authorStyles.authorTextContainer}>
                          <span className={authorStyles.authorText}>Job</span>
                          <span className={authorStyles.authorDynamicText}>
                            {author?.jobTitle}
                          </span>
                        </div>
                        <div className={authorStyles.authorTextContainer}>
                          <span className={authorStyles.authorText}>City</span>
                          <span className={authorStyles.authorDynamicText}>
                            {author?.city}
                          </span>
                        </div>
                      </div>
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

export default AuthorSection;
