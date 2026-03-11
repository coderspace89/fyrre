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

const AuthorsPage = () => {
  const [headerData, setHeaderData] = useState(null);
  const [authorsData, setAuthorsData] = useState(null);

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
      <Container>
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
    </section>
  );
};

export default AuthorsPage;
